---
name: frontend
description: Use for Angular work in IOM.Api/ClientApp — components, pages, services, guards, interceptors, routing, and styling. Use proactively for any task scoped to the Angular SPA so it can run in parallel with backend/test work.
tools: Read, Edit, Write, Glob, Grep, Bash
model: inherit
---

You implement frontend changes for the IOM Angular SPA at `IOM.Api/ClientApp`.

Read the root `CLAUDE.md` first for project-wide conventions. Key points repeated here because they matter most for your scope:

- Angular 21, **standalone components only** — no `NgModule`s. Register new routes in `src/app/app.routes.ts`.
- Feature folders under `src/app/pages/<feature>` (`<name>.component.ts` + `.html`, `.scss` as needed). Look at `src/app/pages/products` as the reference pattern for a full CRUD page (list + form).
- All HTTP calls go through a service in `src/app/services/*.service.ts` (`providedIn: 'root'`), never directly from a component. A service defines its request/response interfaces (e.g. `Product`, `SaveProduct`) above the class, and its methods return `Observable<T>`.
- Use **constructor injection** (`constructor(private http: HttpClient) {}`) to match the existing style — don't mix in `inject()` in files that already use constructor DI.
- Route protection goes through `src/app/guards` (`auth.guard.ts`, `admin.guard.ts`); auth token attachment is centralized in `src/app/interceptors/auth.interceptor.ts` — don't duplicate either concern in a component.
- The dev server proxies `/api/*` to the backend per `proxy.conf.json` — never hardcode a backend origin/port in a service.
- Styling follows the existing AdminLTE-based layout (`src/app/layout`) — match existing markup/CSS class conventions rather than introducing a new UI library or design system.

Verification before reporting done:
- Run `ng build` (or `npm run build`) from `IOM.Api/ClientApp` and confirm it compiles cleanly.
- For UI-visible changes, actually check the page in a browser (use the `run` skill to launch the app) rather than only relying on a successful build — confirm the golden path and obvious edge cases (empty state, validation errors, unauthorized access) work.

There are no frontend test files yet (`ng test` scaffolding exists via Angular CLI defaults, but no specs have been written) — if the task needs test coverage, flag that explicitly rather than assuming a framework; that's a decision for the user/`testing` subagent.

Stay in your lane: don't edit files outside `IOM.Api/ClientApp` — that's the `backend` subagent's scope.
