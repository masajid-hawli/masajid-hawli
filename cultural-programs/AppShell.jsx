/* App shell — fixed RTL sidebar (right) + topbar. */
function AppShell({ role, active, onNav, onLogout, children }) {
  const { SidebarItem, Avatar, Icon } = window;
  const isManager = role === 'مدير القسم';

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--surface-app)' }}>
      {/* Sidebar */}
      <aside style={{ width: 264, flexShrink: 0, background: 'var(--surface-card)', borderInlineStart: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', position: 'sticky', top: 0, height: '100vh' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '18px 20px', borderBottom: '1px solid var(--border-subtle)' }}>
          <img src="../../assets/logo.png" alt="مساجد حولي" style={{ height: 40 }} />
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-md)', fontWeight: 800, color: 'var(--maroon-700)' }}>مساجد حولي</div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-2xs)', color: 'var(--text-subtle)' }}>البرامج الثقافية</div>
          </div>
        </div>

        <nav style={{ flex: 1, overflowY: 'auto', padding: '12px 12px', display: 'flex', flexDirection: 'column', gap: 3 }}>
          {window.KIT_NAV.map((n) => (
            <SidebarItem key={n.id} icon={<Icon n={n.icon} />} active={active === n.id} count={n.count} onClick={() => onNav(n.id)}>{n.label}</SidebarItem>
          ))}
          {isManager && (
            <>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-2xs)', fontWeight: 700, color: 'var(--text-subtle)', padding: '14px 14px 6px', letterSpacing: '.02em' }}>أدوات الإدارة</div>
              {window.KIT_ADMIN.map((n) => (
                <SidebarItem key={n.id} icon={<Icon n={n.icon} />} active={active === n.id} onClick={() => onNav(n.id)}>{n.label}</SidebarItem>
              ))}
            </>
          )}
        </nav>

        <div style={{ padding: 12, borderTop: '1px solid var(--border-subtle)' }}>
          <button onClick={onLogout} style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%', padding: '11px 14px', background: 'transparent', border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 'var(--text-md)', fontWeight: 500, color: 'var(--text-muted)' }}>
            <Icon n="log-out" /><span>تسجيل الخروج</span>
          </button>
        </div>
      </aside>

      {/* Main column */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <header style={{ height: 64, flexShrink: 0, background: 'var(--surface-card)', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 28px', position: 'sticky', top: 0, zIndex: 5 }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', width: 320, maxWidth: '40vw' }}>
            <span style={{ position: 'absolute', insetInlineStart: 12, color: 'var(--text-subtle)', display: 'inline-flex' }}><Icon n="search" size={16} /></span>
            <input placeholder="ابحث عن برنامج أو مسجد…" style={{ width: '100%', height: 40, boxSizing: 'border-box', padding: '0 38px', background: 'var(--surface-sunken)', border: '1px solid transparent', borderRadius: 'var(--radius-md)', fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--text-strong)', outline: 'none' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button style={{ position: 'relative', width: 40, height: 40, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer', color: 'var(--text-muted)' }}>
              <Icon n="bell" size={20} />
              <span style={{ position: 'absolute', top: 7, insetInlineEnd: 8, width: 8, height: 8, background: 'var(--brand)', borderRadius: '50%', border: '2px solid var(--surface-card)' }} />
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Avatar name="عبدالله الأحمد" size={38} />
              <div style={{ lineHeight: 1.3 }}>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--text-strong)' }}>عبدالله الأحمد</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-2xs)', color: 'var(--text-subtle)' }}>{role}</div>
              </div>
            </div>
          </div>
        </header>

        <main style={{ flex: 1, padding: 28, overflowY: 'auto' }}>{children}</main>
      </div>
    </div>
  );
}
window.AppShell = AppShell;
