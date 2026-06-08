# UI Kit — Cultural Programs (قسم البرامج الثقافية)

Interactive RTL recreation of the **Masajid Hawli** management app.

## Run
Open `index.html`. Flow: **Login** (pick role: مدير القسم / موظف) → **Dashboard** → sidebar nav → **Programs list** → **Add program** dialog. Manager role unlocks the admin section (users, reports, backup) and the row delete action.

## Files
- `index.html` — entry; loads React + Babel + Lucide + the scripts below.
- `kit-ui.jsx` — local cosmetic mirrors of the DS primitives (Button, IconButton, Card, Badge, Avatar, Input, Select, Switch, Tabs, SidebarItem, StatTile, Icon), exposed on `window`. *In production, import these from the design system instead (`window.MasajidHawmatiDesignSystem_41cc75`).*
- `data.jsx` — fake programs + nav data.
- `LoginScreen.jsx` · `AppShell.jsx` · `DashboardScreen.jsx` · `ProgramsScreen.jsx` · `app.jsx`.

## Screens
1. **Login** — split layout, maroon brand panel (logo watermark + Amiri ayah) on the inline-end, role select.
2. **Dashboard** — 4 KPI stat tiles, recent-programs table, category distribution bars.
3. **Programs** — category tabs with counts, search, table (category/mosque/area/owner/attendees/status), row actions, add dialog.

## Notes
- Why local primitives: the compiled `_ds_bundle.js` only resolves inside the Design System tab, so the kit ships standalone mirrors to stay runnable on its own. They are styled identically to `components/*`.
- Data is illustrative. No real backend — mirrors the brief's localStorage-now / Firebase-later model.
- Icons via Lucide CDN (substitution — see root readme §4).
