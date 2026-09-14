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
- **Frontend**: Angular's `@angular/build:unit-test` builder with the Vitest runner (jsdom, no browser needed) — the modern path this Angular version scaffolds via `ng generate config vitest`, not Karma/Jasmine (neither is installed). Config lives in `angular.json`'s `test` target, `tsconfig.spec.json`, `vitest-base.config.ts`. Use `provideHttpClient()`/`provideHttpClientTesting()` to mock HTTP, not a real backend. Run: `npm test -- --watch=false` from `IOM.Api/ClientApp`.
- Coverage as of the last pass: Products, Suppliers, Items, Invoices (incl. CSV upload), Deliveries, Users, Auth. The `Order`/`Availability`/basket/client-shop/order-approval feature has no test coverage yet — add it as its own pass rather than assuming it's covered.
- When adding backend features, also add unit tests for new `IOM.Service` logic and (for anything with real query/validation logic worth it) an integration test — don't let new work silently widen the untested surface.

## General

- Don't commit `appsettings.Development.json`, `.vscode/launch.json`/`tasks.json` changes, or other local-machine config unless the user explicitly asks — they carry machine-specific paths/secrets and currently show as locally modified.
- The JWT signing key in `appsettings.json` is a placeholder committed to the repo — treat it as dev-only; flag it (don't silently "fix" it) if it comes up in a security review.
- This repo is mid-migration (Razor/Material → AdminLTE → Angular SPA per recent commit history). When touching older-looking code, check git log/blame for whether it's still live before assuming it's dead.
