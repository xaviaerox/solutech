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
