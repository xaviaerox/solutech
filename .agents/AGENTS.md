# Workspace Rules & Customizations

This file defines project-specific rules and behavior constraints for Antigravity in this workspace.

## Environment & Credentials Synchronization
- **Master Env File:** The master `.env` file containing all global passwords, keys, and API credentials for Solutech and personal projects is located at `C:\Users\Xaviaerox\Documents\GitHub\.env`.
- **Synchronization Rule:** Whenever any password, credential, token, or API key is updated, added, or changed in any local project, you **must** immediately and automatically update the corresponding value in the master `.env` file at `C:\Users\Xaviaerox\Documents\GitHub\.env` to ensure both files are kept in sync and credentials remain updated.

## Permanent Operational Log & Backlog: TASKS.md
- **Rule:** Every project workspace must maintain a `TASKS.md` file as the permanent, living, cumulative operational task log and backlog.
- **Never Delete History:** Never remove completed, cancelled, or discarded tasks. Always update their state (`COMPLETADA`, `CANCELADA`, `DESCARTADA`, etc.) and preserve their historical entry in `# Historial de Tareas`.
- **Standardized Structure:** Must contain `# Resumen`, `# Tareas Activas`, `# Próximas Tareas`, `# Tareas Bloqueadas`, `# Deuda Técnica`, `# Bugs Conocidos`, `# Ideas / Mejoras Futuras`, and `# Historial de Tareas`.
- **Unique IDs:** Assign permanent IDs (`TASK-001`, `TASK-002`, ...). Never reuse an ID.

## Permanent Versioning & Release Governance
- **Rule:** Strict compliance with `INSTRUCCIÓN PERMANENTE — GOBERNANZA DE VERSIONADO Y RELEASE` detailed in `.agents/RELEASE_GOVERNANCE.md`.
- **Single Source of Truth (SSOT):** The project's canonical technical file (`package.json`, `hugo.toml`, etc.) is the single technical source of truth for the application version. `PROJECT_CONTEXT.md` describes the contextual state but MUST match the canonical technical file.
- **Divergence Prevention:** Never modify `PROJECT_CONTEXT.md` to mask a technical version mismatch. Always resolve the technical canonical source first.
- **Integrity Protocol:** Always run a `VERSION INTEGRITY CHECK` before completing any significant feature, refactor, bug fix, or release.

## Documentation Definition of Done (Doc-DoD) & Cross-Repository Synchronization
- **Rule:** No task or technical change can be marked as `COMPLETADA` without fulfilling the mandatory 5-step documentation checklist.
- **Mandatory 5-Step Checklist before closing any task:**
  1. **Code / Implementation:** Verified, tested, and operational.
  2. **Operational Log (`TASKS.md`):** Updated with permanent unique ID, state, date, description, and list of modified files.
  3. **Local Technical Context (`PROJECT_CONTEXT.md`):** Must be updated whenever changes affect architecture, components, security filters, endpoints, CSP, CI/CD, or configuration.
  4. **Central Knowledge Base (`solutech-knowledge-base`):**
     - If frontend, web security, or forms changed ➔ Update `05_TECHNOLOGY/WEBSITE_TECH_DOCS.md` and `05_TECHNOLOGY/N8N_TICKETING_ALERTS.md`.
     - If content generation or automations changed ➔ Update `05_TECHNOLOGY/CONTENT_SYSTEM.md`.
     - If architectural decisions were made ➔ Add ADR to `00_SYSTEM/DECISION_LOG.md` and log in `00_SYSTEM/CHANGELOG.md`.
     - If services, SLAs, or operations changed ➔ Update `03_PRODUCTS/` or `04_OPERACIONES/`.
  5. **Master Credentials Synchronization:** Immediately update `C:\Users\Xaviaerox\Documents\GitHub\.env` if any env var, token, or key was added or modified.

