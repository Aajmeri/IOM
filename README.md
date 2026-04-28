<img width="1864" height="920" alt="image" src="https://github.com/user-attachments/assets/f4056d35-3f11-42c2-96e3-c9afce7a1ac5" />

# Royal Distributors Enterprise Management System

A full-stack enterprise web application designed to centralize and streamline operations for Royal Distributors — covering product management, supplier tracking, client management, order processing, and delivery scheduling in one unified platform.

---

## Overview

This project began as a practice initiative to explore clean architecture patterns in ASP.NET, but has grown into a solid enterprise foundation. The goal is to give Royal Distributors a single source of truth for their operations rather than managing data across disconnected systems.

---

## Current Features

- **Product Management** — Fully functioning product page with a dynamic, searchable datatable
- **Clean Architecture** — Structured MVC-style project with clear separation of concerns
- **Authentication & Authorization** — Role-based access control with multiple user roles
- **Logging & Middleware** — Configured logging pipeline and custom middleware support
- **ASP.NET 10 Ready** — Skeleton built to support the latest ASP.NET framework

---

## Planned Modules

| Module | Status |
|---|---|
| Products | ✅ In Progress |
| Suppliers | 🔲 Planned |
| Clients | 🔲 Planned |
| Orders | 🔲 Planned |
| Shipping | 🔲 Planned |
| Delivery Scheduling | 🔲 Planned |

---

## Tech Stack

- **Framework:** ASP.NET 10 (MVC)
- **Architecture:** Clean Architecture
- **Auth:** ASP.NET Identity (roles & claims)
- **Logging:** Middleware-based logging pipeline
- **Frontend:** Razor Views (migration to Razor Pages or Angular planned)

---

## Roadmap

- [ ] Complete core module scaffolding (Suppliers, Clients, Orders, Shipping)
- [ ] Migrate to Razor Pages or latest Angular framework
- [ ] Add delivery scheduling with calendar view
- [ ] Reporting and analytics dashboard
- [ ] API layer for potential mobile or third-party integrations

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/your-username/royal-distributors.git

# Navigate to the project
cd royal-distributors

# Restore dependencies
dotnet restore

# Run the application
dotnet run
```

> Make sure you have the [.NET 10 SDK](https://dotnet.microsoft.com/download) installed.

---

## Project Structure

```
RoyalDistributors/
├── src/
│   ├── Web/                  # MVC Controllers, Views, Middleware
│   ├── Application/          # Business logic, use cases
│   ├── Domain/               # Entities, interfaces
│   └── Infrastructure/       # Data access, external services
└── tests/
```

---

## Contributing

This is currently a personal practice project. Contributions, suggestions, and feedback are welcome — feel free to open an issue or pull request.

---

## License

MIT
