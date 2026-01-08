# HANDOFF

## Summary
- Frontend (React + Vite + MUI) homepage implemented to mirror bandovn.vn with Material Design styling and government-agency tone.
- Backend scaffolded in .NET 8 with layered solution (Domain, Application, Infrastructure, WebApi).
- EF Core configured for PostgreSQL as primary and SQL Server as backup; snake_case mapping enforced.
- Git hooks auto-generate release notes on each commit and push to `dev`.

## Key Paths
- Frontend app: `src/`
- Backend solution: `backend/CongDuLieuDatDaiPhiaNam.sln`
- Backend Web API: `backend/CongDuLieuDatDaiPhiaNam.WebApi/`
- DbContext: `backend/CongDuLieuDatDaiPhiaNam.Infrastructure/Data/CdlddpnDbContext.cs`
- Entities + enums: `backend/CongDuLieuDatDaiPhiaNam.Domain/Entities/`, `backend/CongDuLieuDatDaiPhiaNam.Domain/Enums/Enums.cs`
- Git hooks: `.githooks/`
- Release notes: `docs/RELEASE_NOTES.md`

## Backend Notes
- DB provider switch: set `Database:Provider` in `backend/CongDuLieuDatDaiPhiaNam.WebApi/appsettings*.json` to `PostgreSQL` or `SqlServer`.
- Connection strings stored in the same appsettings files.
- Health endpoint: `/api/v1/cdlddpn/health`.

## Frontend Notes
- Entry: `src/App.tsx`.
- Theme: `src/styles/theme.ts`.
- Styles: `src/styles/global.css`.
- Content constants: `src/data/siteData.ts`.

## Known Setup Details
- .NET SDK pinned via `global.json` to 8.0.416.
- Vite build works (UTF-8 BOM removed from JSON).

## How to Run
Frontend:
```
npm install
npm run dev
```
Backend:
```
dotnet build backend/CongDuLieuDatDaiPhiaNam.sln -c Release
```

## Next Steps (suggested)
- Add EF Core migrations and create databases.
- Implement remaining API routes (auth, catalog, admin, payment, files).
- Add DTOs, validation, and service layer.
