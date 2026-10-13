# IOM — Inventory and Operations Management

## Architecture

Layered .NET 10 solution + Angular 21 SPA served from the same host:

- `IOM.Api` — ASP.NET Core Web API. Controllers, request/response resources, FluentValidation validators, Mapperly mappers, JWT auth. Also hosts the Angular app (`IOM.Api/ClientApp`, built into `wwwroot`).
- `IOM.Service` — business logic. Implements the `I*Service` interfaces declared in `IOM.Core`.
- `IOM.Core` — domain models, repository/service interfaces (`IUnitOfWork`, `IRepository<T>`, etc.). No dependencies on other projects.
- `IOM.Data` — EF Core (`IOMContext`), repositories, migrations, fake/seed data (Bogus).
- `IOM.Api/ClientApp` — Angular 21 standalone-component app (no NgModules). AdminLTE-based UI.

Dependency direction is strictly `Api → Service → Data → Core` (Core has no project references). Don't introduce a reverse reference (e.g. `IOM.Core` referencing `IOM.Data`).

## Domain concepts

- **`Product`** is the catalog entry (name/price/description/barcode/one primary supplier via `SupplierProduct`). **`Item`** is a received batch of a product (its own `Quantity` and nullable `ExpirationDate` — different shipments of the same product expire at different times, so expiration lives here, not on `Product`). **`Invoice`** represents a shipping order/shipment from a supplier (created either manually or via the CSV bulk-upload endpoint, which matches/creates `Product`s and `Item`s per row).
- **`Delivery`** is the *inbound* warehouse-side schedule — stock expected from a `Supplier`. **`Order`** is the *outbound* client-side schedule — a `Client`-role user's product request to be delivered to them. These are intentionally separate models even though both are colloquially "deliveries" — `Order` has no `SupplierId` and must not be merged with `Delivery`.
- **Roles**: `Admin`, `Warehouse` (staff — full operational access), `Client` (customer — product browsing/ordering only). New users self-register as `Client` by default. Mutating staff endpoints use `[Authorize(Roles = "Admin,Warehouse")]`; anything a `Client` must never see (suppliers, items, invoices, inbound deliveries, item barcodes/expiration) needs an explicit role check — don't assume `[Authorize]` alone is enough once a `Client` role exists. `ProductsApiController`'s GET actions branch internally on `User.IsInRole("Client")` to return a reduced `ClientProductResource` (no barcode/supplier fields, `Visibility == true` only) — follow that pattern rather than adding parallel client-only routes when a staff endpoint just needs a narrower response shape.
- **Scheduling** (client `Order` slots): fixed-length delivery slots (`Scheduling:*` in `appsettings.json` — `BusinessStartHour`/`BusinessEndHour`/`SlotLengthHours`/`SlotCapacity`/`MinLeadTimeHours`/`MaxAdvanceDays`, all with hardcoded fallbacks mirroring the `Jwt:Key` pattern). Capacity is consumed by any `Order` in `{Pending, Approved}` for a slot; `Rejected`/`Cancelled` frees it. `GET /api/availability` must only ever return per-slot booleans — never expose whose order/what is occupying a slot.
- **Checkout/Payments**: a client `Order` is only created via checkout (`POST /api/orders` with a `CheckoutResource` = order + card), which charges the server-computed total through `IPaymentService` *before* saving, and stores a one-to-one `Payment` (brand/last4/transaction id only — never the full card number or CVC). `SimulatedPaymentService` is the only implementation (no real provider/credentials exist; test cards `4242…4242` approve, `4000…0002` declines) — don't wire a real gateway without asking. Rejecting/cancelling a paid order refunds it. **Pay later**: `CheckoutResource.PayLater = true` creates the order with no `Payment` (`OrderResource.PaymentStatus == "Unpaid"`); the owning client pays it via `POST /api/orders/{id}/pay` while it's Pending/Approved. Staff may accept unpaid orders. **Reschedule**: `POST /api/orders/{id}/reschedule` (`Admin,Warehouse`) moves a Pending/Approved order to another valid, non-full slot, keeps its status, and emails the client. The staff order page no longer edits the date directly, so every date change notifies the client. Receipts: `GET /api/orders/{id}/receipt`, `POST /api/orders/{id}/receipt/email` (`IReceiptService`), Angular page `shop/orders/:id/receipt` (print via `window.print()` + `@media print` in `styles.scss`).
- **Email**: `IEmailService`/`SmtpEmailService` (`IOM.Service`) reads `Email:*` config; with no `Email:SmtpHost` configured (the default in this repo — no real SMTP credentials exist), it logs the full email instead of sending, clearly prefixed `[DEV MODE — EMAIL NOT SENT]`. Don't wire in real credentials without asking.

## Backend conventions

- Controllers live in `IOM.Api/Controllers/Api`, named `<Feature>ApiController`, routed at `api/<feature>` (lowercase, plural).
- Controllers depend on an `I<Feature>Service` and a Mapperly `<Feature>Mapper` — never call `IOM.Data` repositories directly from a controller.
- Request/response DTOs are "Resources" in `IOM.Api/Resources` (`<Feature>Resource`, `Save<Feature>Resource`). Domain models never cross the API boundary directly.
- Validation is FluentValidation (`IOM.Api/Validators`), wired through `ValidationFilter`; controllers still check `ModelState.IsValid` before mutating.
- Mapping is Mapperly, not AutoMapper — do not reintroduce AutoMapper.
- `[Authorize]` at the controller level with the JWT scheme; role-restricted actions (create/update/delete) additionally set `[Authorize(Roles = "Admin,Warehouse")]` — match existing role names exactly.
- EF Core targets SQL Server (`Microsoft.EntityFrameworkCore.SqlServer`); Sqlite package is present but SQL Server is the actual target — don't switch providers without asking.
- New tables/columns go through an EF Core migration (`dotnet ef migrations add ...` from `IOM.Data`), never hand-edited against the dev DB.
- Async all the way down (`Task`/`async`) — no `.Result`/`.Wait()` blocking calls.

## Frontend conventions

- Angular 21, standalone components only — no `NgModule`s. New components use the standalone API and are added to `app.routes.ts`, not declared in a module.
- Feature folders under `src/app/pages/<feature>` with `<name>.component.ts` (+ `.html`, `.scss` when needed); shared logic in `src/app/services/*.service.ts` as `providedIn: 'root'` injectables.
- HTTP calls live in services, not components. Services define request/response interfaces (e.g. `Product`, `SaveProduct`) inline above the class.
- Route protection via `src/app/guards` (`auth.guard.ts`, `admin.guard.ts`); auth token attachment via `src/app/interceptors/auth.interceptor.ts`. Don't duplicate token-attachment logic in a component or service.
- Constructor DI (`constructor(private http: HttpClient)`), matching the existing style — don't mix in `inject()` within the same file as constructor injection.
- Dev server proxies `/api/*` to the backend per `proxy.conf.json`; don't hardcode a backend origin in a service.

## Testing

- **Backend**: xUnit + Moq, in `IOM.Tests` (added to `InventoryAndOpManagement.sln`). Unit tests mock `IUnitOfWork`/`I*Repository`. Integration tests use `WebApplicationFactory<Program>` (accessible via the one-line `IOM.Api/ProgramTestAccessor.cs` — `public partial class Program { }` — don't remove it) against a real in-memory Sqlite DB (`IOM.Tests/Integration/IomWebApplicationFactory.cs`; schema via `EnsureCreated()` with `__EFMigrationsHistory` pre-stamped so `Program.cs`'s own `Migrate()` call is a safe no-op). All integration test classes share one collection fixture — `DataSeeder`/`FakeData` mutate non-thread-safe static state, so they can't run in parallel across hosts. Run: `dotnet test IOM.Tests/IOM.Tests.csproj` (or `dotnet test` from the repo root).
  - Both test hosts replace `IEmailService` with `CapturingEmailService`; assert on sent emails with `factory.Emails.To(address)` (register clients via `AuthHelper.RegisterClientAsync` to get a unique address).
  - **SQL Server tests** (`IOM.Tests/Integration/SqlServer`): `SqlServerWebApplicationFactory` boots the host against a throwaway LocalDB database (`IOM_IntegrationTests_<guid>`, dropped afterwards) and lets `Program.cs` apply the **real migrations**, with `PendingModelChangesWarning` left as an error, so a missing or broken migration fails here. Use `[SqlServerFact]`: it skips automatically when LocalDB isn't installed. These classes also join `IntegrationCollection`.
- **Frontend**: Angular's `@angular/build:unit-test` builder with the Vitest runner (jsdom, no browser needed) — the modern path this Angular version scaffolds via `ng generate config vitest`, not Karma/Jasmine (neither is installed). Config lives in `angular.json`'s `test` target, `tsconfig.spec.json`, `vitest-base.config.ts`. Use `provideHttpClient()`/`provideHttpClientTesting()` to mock HTTP, not a real backend. Run: `npm test -- --watch=false` from `IOM.Api/ClientApp`.
- **End-to-end (browser)**: Playwright (`@playwright/test`, Chromium) in `IOM.Api/ClientApp/e2e/*.e2e.ts`, config in `playwright.config.ts`. `npm run e2e` (from `IOM.Api/ClientApp`) builds the SPA into `wwwroot`, then `e2e/start-api.mjs` drops and recreates the `IOM_E2E` LocalDB database (via `sqlcmd`) and runs the real API in the `E2E` environment on http://localhost:5020. Tests run with one worker against that shared database. Do test setup through the API helpers in `e2e/support.ts` and keep UI steps for what's being tested. Wait for the calendar's availability shading (`.fc-bg-event`) before clicking a delivery day. Failure traces/screenshots: `npm run e2e:report`.
- Coverage as of the last pass: unit + integration for Products, Suppliers, Items, Invoices (incl. CSV upload), Deliveries, Users, Auth, and orders (checkout, pay later, receipts, reschedule, order emails); SQL Server-specific tests for migrations, decimals, indexes and slot capacity; Playwright E2E for client checkout (card, decline, pay later, receipt print/email), staff reschedule/accept, and browser access control. Still thin: the basket/client-shop pages and the staff delivery calendar have no E2E coverage.
- When adding backend features, also add unit tests for new `IOM.Service` logic and (for anything with real query/validation logic worth it) an integration test — don't let new work silently widen the untested surface.

### Test-first workflow

New features and behavior changes with real logic are built **tests first**, so the tests describe what the user asked for rather than confirming whatever got implemented:

1. **Write tests only.** From the request, write the backend/frontend tests that define the behavior: golden path, edge cases, authorization, failure modes. Don't write any implementation yet. Where the request leaves a decision open (e.g. "does rejecting a paid order refund it?"), pick one, encode it in a test, and list it as an assumption.
2. **Stop for review.** Show the user the test names plus the list of assumptions, and wait for approval before implementing. This is the user's main point of control, so keep it skimmable: test names and decisions, not full test bodies.
3. **Confirm they fail for the right reason.** In C#, add only the minimal stubs needed to compile (new types, method signatures throwing `NotImplementedException`, empty resources) so failures are assertion failures, not a broken build. In Angular, the same applies: empty component/service shells.
4. **Implement until they pass**, then run both full suites (`dotnet test`, `npm test -- --watch=false`).
5. **Approved tests are locked.** Don't edit, weaken, skip or delete an approved test to make it pass. If one looks wrong during implementation, stop and raise it with the user. Adding *new* tests for cases found along the way is fine; call them out as additions in the final summary. Agents don't commit on their own; if the user wants a hard lock, they commit the approved tests before implementation starts.

Skip the test-first step (and just test afterward, or not at all) for exploratory prototypes, pure layout/styling, config, and trivial changes. For a **bug fix**, the first step is a failing regression test that reproduces the bug.

## Environments

Selected via `ASPNETCORE_ENVIRONMENT` (`launchSettings.json` has a profile per environment); each has its own `appsettings.<Environment>.json` and its own database, layered on top of the base `appsettings.json`:

- **Development** (`appsettings.Development.json`) — LocalDB database `IOM`, the actual working dev DB with real local data. Swagger, `EnableSensitiveDataLogging()`, fake-data seeding, and the `admin@admin.com`/`Admin123!` seeded login are all active. Launch profile: `ItemAndOpManagement`.
- **E2E** (`appsettings.E2E.json`) — LocalDB database `IOM_E2E`, used only by the Playwright suite and **dropped and recreated on every `npm run e2e`**; never put data you care about there. No launch profile; `e2e/start-api.mjs` sets `ASPNETCORE_ENVIRONMENT=E2E`.
- **Test** (`appsettings.Test.json`) — LocalDB database `IOM_Test`, a separate sandbox for manual QA/staging use. Same dev-friendly behavior as Development (Swagger, fake-data seeding, seeded admin login) minus `EnableSensitiveDataLogging()`. Launch profile: `ItemAndOpManagement (Test)`. Unrelated to the xUnit suite's ASP.NET Core environment, which is named `"Testing"` (see Testing section below) and never touches a real SQL Server database.
- **Production** (`appsettings.Production.json`) — `ConnectionStrings:IOM` and `Jwt:Key` are intentionally blank in the committed file; `Program.cs` throws a clear startup error if either is still unset, rather than silently falling back to a dev value. Set them via environment variables (`ConnectionStrings__IOM`, `Jwt__Key`) or a secrets manager — never commit real production secrets. Swagger, `EnableSensitiveDataLogging()`, Bogus fake-data seeding, and the hardcoded admin-password reset are all disabled/skipped here (`Program.cs` gates each on `!app.Environment.IsProduction()`) — that seeding logic would otherwise plant fake records and silently reset any `admin@admin.com` account's password on every restart. CORS is origin-list-driven via `Cors:AllowedOrigins` (empty by default in Production, since the SPA is served same-origin from `wwwroot` and needs none).
- Don't commit `appsettings.Development.json`, `.vscode/launch.json`/`tasks.json` changes, or other local-machine config unless the user explicitly asks — they carry machine-specific paths/secrets and currently show as locally modified.

## General

- The JWT signing key and connection string in `appsettings.json`/`appsettings.Development.json` are dev-only placeholders committed to the repo; `Program.cs` refuses to start in Production with either left blank or unset — see Environments above. Still flag it (don't silently "fix" it further) if it comes up in a security review.
- This repo is mid-migration (Razor/Material → AdminLTE → Angular SPA per recent commit history). When touching older-looking code, check git log/blame for whether it's still live before assuming it's dead.
