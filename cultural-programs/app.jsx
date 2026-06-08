/* Root state machine: login → app shell with screen routing. */
function App() {
  const { AppShell, DashboardScreen, ProgramsScreen, HalaqatScreen, LessonsWomenScreen, LessonsMenScreen, ImamsScreen, GuestsScreen, Icon } = window;
  const [role, setRole] = React.useState(null);
  const [nav, setNav] = React.useState('dashboard');

  React.useEffect(() => { window.lucide && window.lucide.createIcons(); });

  if (!role) return <LoginScreen onLogin={(r) => { setRole(r); setNav('dashboard'); }} />;

  let screen;
  if (nav === 'dashboard') screen = <DashboardScreen role={role} onNav={setNav} />;
  else if (nav === 'halaqat') screen = <HalaqatScreen role={role} />;
  else if (nav === 'women-lessons') screen = <LessonsWomenScreen role={role} />;
  else if (nav === 'men-lessons') screen = <LessonsMenScreen role={role} />;
  else if (nav === 'imams') screen = <ImamsScreen role={role} />;
  else if (nav === 'guests') screen = <GuestsScreen role={role} />;
  else if (['all', 'communities'].includes(nav)) screen = <ProgramsScreen role={role} />;
  else screen = <PlaceholderScreen nav={nav} />;

  return (
    <AppShell role={role} active={nav} onNav={setNav} onLogout={() => setRole(null)}>
      {screen}
    </AppShell>
  );
}

function PlaceholderScreen({ nav }) {
  const titles = { users: 'إدارة المستخدمين', reports: 'التقارير والإحصائيات', backup: 'نسخة احتياطية' };
  const icons = { users: 'users', reports: 'bar-chart-3', backup: 'download' };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: 14, textAlign: 'center' }}>
      <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 64, height: 64, borderRadius: 'var(--radius-xl)', background: 'var(--blue-50)', color: 'var(--blue-500)' }}>
        <i data-lucide={icons[nav] || 'folder'} style={{ width: 30, height: 30 }}></i>
      </span>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 800, color: 'var(--text-strong)' }}>{titles[nav] || 'القسم'}</h2>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-md)', color: 'var(--text-muted)', maxWidth: 360 }}>هذه الشاشة جزء من نظام مساجد حولي — متاحة للمدير فقط.</p>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
