/* Dashboard — KPI tiles + recent programs + category breakdown. */
function DashboardScreen({ role, onNav }) {
  const { StatTile, Card, Badge, Avatar, Button, Icon } = window;
  const recent = window.KIT_PROGRAMS.slice(0, 5);
  const cats = [
    { label: 'دروس نسائية', n: 42, pct: 33, color: 'var(--terracotta-500)' },
    { label: 'دروس رجال', n: 37, pct: 29, color: 'var(--maroon-500)' },
    { label: 'حلقات', n: 24, pct: 19, color: 'var(--amber-500)' },
    { label: 'جاليات', n: 16, pct: 12, color: 'var(--blue-500)' },
    { label: 'برامج عامة', n: 9, pct: 7, color: 'var(--green-500)' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22, maxWidth: 1180 }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 800, color: 'var(--text-strong)' }}>أهلاً، عبدالله</h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-md)', color: 'var(--text-muted)', marginTop: 4 }}>هذه نظرة عامة على برامج القسم لهذا الأسبوع.</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <Button variant="secondary" iconStart={<Icon n="printer" size={16} />}>طباعة</Button>
          <Button iconStart={<Icon n="plus" size={16} />} onClick={() => onNav('all')}>إضافة برنامج</Button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        <StatTile icon={<Icon n="book-open" size={22} />} value="128" label="إجمالي البرامج" delta={12} tone="brand" />
        <StatTile icon={<Icon n="layers" size={22} />} value="24" label="حلقات نشطة" delta={5} tone="success" />
        <StatTile icon={<Icon n="users" size={22} />} value="3,540" label="المستفيدون" tone="info" />
        <StatTile icon={<Icon n="user-check" size={22} />} value="9" label="أئمة متطوعون" delta={-3} tone="maroon" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 16 }}>
        <Card title="أحدث البرامج" padding={false} action={<Button variant="ghost" size="sm" onClick={() => onNav('all')}>عرض الكل</Button>}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-body)' }}>
            <thead>
              <tr style={{ background: 'var(--surface-sunken)' }}>
                {['البرنامج', 'القسم', 'المشرف', 'المستفيدون', 'الحالة'].map((h) => (
                  <th key={h} style={{ textAlign: 'start', padding: '10px 16px', fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--text-subtle)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recent.map((p) => (
                <tr key={p.id} style={{ borderTop: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '12px 16px', fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--text-strong)' }}>{p.name}</td>
                  <td style={{ padding: '12px 16px' }}><Badge tone={p.tone}>{p.cat}</Badge></td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                      <Avatar name={p.owner} size={26} />
                      <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-body)' }}>{p.owner}</span>
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 'var(--text-sm)', color: 'var(--text-body)', fontVariantNumeric: 'tabular-nums' }}>{p.students}</td>
                  <td style={{ padding: '12px 16px' }}><Badge tone={p.stone} dot>{p.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card title="توزيع البرامج">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {cats.map((c) => (
              <div key={c.label} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)' }}>
                  <span style={{ color: 'var(--text-body)', fontWeight: 500 }}>{c.label}</span>
                  <span style={{ color: 'var(--text-subtle)', fontVariantNumeric: 'tabular-nums' }}>{c.n}</span>
                </div>
                <div style={{ height: 8, borderRadius: 'var(--radius-pill)', background: 'var(--surface-sunken)', overflow: 'hidden' }}>
                  <div style={{ width: c.pct + '%', height: '100%', background: c.color, borderRadius: 'var(--radius-pill)' }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
window.DashboardScreen = DashboardScreen;
