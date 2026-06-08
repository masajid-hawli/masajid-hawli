/* Local cosmetic mirrors of the Masajid Hawli DS primitives, exposed on window
   so the UI kit renders standalone (the compiled _ds_bundle.js only resolves
   inside the Design System tab). Styling matches components/* 1:1. */

function Icon({ n, size = 18, color, style }) {
  return <i data-lucide={n} style={{ width: size, height: size, color, ...style }}></i>;
}

function Button({ children, variant = 'primary', size = 'md', iconStart, iconEnd, disabled, full, style, ...rest }) {
  const sizes = {
    sm: { padding: '0 14px', height: 34, fontSize: 'var(--text-sm)', gap: 6 },
    md: { padding: '0 20px', height: 42, fontSize: 'var(--text-md)', gap: 8 },
    lg: { padding: '0 24px', height: 50, fontSize: 'var(--text-lg)', gap: 10 },
  };
  const variants = {
    primary: { background: 'var(--brand)', color: '#fff', border: '1px solid transparent', boxShadow: 'var(--shadow-brand)' },
    secondary: { background: 'var(--surface-card)', color: 'var(--text-brand)', border: '1px solid var(--border-default)' },
    ghost: { background: 'transparent', color: 'var(--text-body)', border: '1px solid transparent' },
    danger: { background: 'var(--red-500)', color: '#fff', border: '1px solid transparent' },
  };
  const s = sizes[size], v = variants[variant];
  return (
    <button disabled={disabled} style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: s.gap,
      height: s.height, padding: s.padding, width: full ? '100%' : undefined,
      fontFamily: 'var(--font-body)', fontSize: s.fontSize, fontWeight: 700, lineHeight: 1,
      borderRadius: 'var(--radius-md)', cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1, whiteSpace: 'nowrap', transition: 'filter .12s, transform .12s', ...v, ...style,
    }}
      onMouseEnter={(e) => { if (!disabled) e.currentTarget.style.filter = 'brightness(0.94)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.filter = 'none'; e.currentTarget.style.transform = 'none'; }}
      onMouseDown={(e) => { if (!disabled) e.currentTarget.style.transform = 'translateY(1px)'; }}
      onMouseUp={(e) => { e.currentTarget.style.transform = 'none'; }}
      {...rest}>
      {iconStart}{children}{iconEnd}
    </button>
  );
}

function IconButton({ children, label, variant = 'ghost', size = 'md', style, ...rest }) {
  const dims = { sm: 32, md: 38, lg: 44 }[size] || 38;
  const [hov, setHov] = React.useState(false);
  const variants = {
    ghost: { background: 'transparent', color: 'var(--text-muted)', border: '1px solid transparent' },
    soft: { background: 'var(--surface-sunken)', color: 'var(--text-body)', border: '1px solid transparent' },
    outline: { background: 'var(--surface-card)', color: 'var(--text-body)', border: '1px solid var(--border-default)' },
  };
  const v = variants[variant] || variants.ghost;
  return (
    <button aria-label={label} title={label} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: dims, height: dims, borderRadius: 'var(--radius-md)', cursor: 'pointer', background: hov ? 'var(--surface-sunken)' : v.background, color: v.color, border: v.border, ...style }} {...rest}>
      {children}
    </button>
  );
}

function Card({ children, title, action, padding = true, style }) {
  return (
    <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden', ...style }}>
      {title && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '16px 20px', borderBottom: '1px solid var(--border-subtle)' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--text-strong)' }}>{title}</h3>
          {action}
        </div>
      )}
      <div style={{ padding: padding ? 20 : 0 }}>{children}</div>
    </div>
  );
}

function Badge({ children, tone = 'neutral', dot, style }) {
  const tones = {
    neutral: { bg: 'var(--surface-sunken)', fg: 'var(--text-muted)' },
    brand: { bg: 'var(--blue-50)', fg: 'var(--blue-700)' },
    success: { bg: 'var(--status-success-bg)', fg: 'var(--status-success-fg)' },
    warning: { bg: 'var(--status-warning-bg)', fg: 'var(--status-warning-fg)' },
    danger: { bg: 'var(--status-danger-bg)', fg: 'var(--status-danger-fg)' },
    info: { bg: 'var(--status-info-bg)', fg: 'var(--status-info-fg)' },
  };
  const t = tones[tone];
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 10px', borderRadius: 'var(--radius-pill)', background: t.bg, color: t.fg, fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', fontWeight: 700, lineHeight: 1.4, whiteSpace: 'nowrap', ...style }}>
      {dot && <span style={{ width: 7, height: 7, borderRadius: '50%', background: t.fg }} />}{children}
    </span>
  );
}

function Avatar({ name = '', size = 40, src, style }) {
  const initials = name.trim().split(/\s+/).slice(0, 2).map((w) => w[0]).join('');
  const tints = [['var(--terracotta-100)', 'var(--terracotta-700)'], ['var(--maroon-100)', 'var(--maroon-700)'], ['var(--status-info-bg)', 'var(--blue-700)'], ['var(--status-success-bg)', 'var(--green-700)'], ['var(--amber-300)', 'var(--maroon-700)']];
  let h = 0; for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) % tints.length;
  const [bg, fg] = tints[h] || tints[0];
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: size, height: size, borderRadius: '50%', flexShrink: 0, background: src ? 'transparent' : bg, color: fg, overflow: 'hidden', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: size * 0.4, ...style }}>
      {src ? <img src={src} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : initials}
    </span>
  );
}

function Input({ label, hint, error, icon, style, ...rest }) {
  const [foc, setFoc] = React.useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: '100%', ...style }}>
      {label && <label style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--text-body)' }}>{label}</label>}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        {icon && <span style={{ position: 'absolute', insetInlineStart: 12, display: 'inline-flex', color: 'var(--text-subtle)', pointerEvents: 'none' }}>{icon}</span>}
        <input style={{
          width: '100%', height: 44, boxSizing: 'border-box', padding: icon ? '0 40px 0 14px' : '0 14px',
          fontFamily: 'var(--font-body)', fontSize: 'var(--text-md)', color: 'var(--text-strong)', background: 'var(--surface-card)',
          border: `1px solid ${error ? 'var(--red-500)' : foc ? 'var(--brand)' : 'var(--border-default)'}`,
          borderRadius: 'var(--radius-md)', outline: 'none', boxShadow: foc ? '0 0 0 3px var(--blue-100)' : 'none',
        }} onFocus={() => setFoc(true)} onBlur={() => setFoc(false)} {...rest} />
      </div>
      {(hint || error) && <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: error ? 'var(--red-700)' : 'var(--text-subtle)' }}>{error || hint}</span>}
    </div>
  );
}

function Select({ label, options = [], style, ...rest }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: '100%', ...style }}>
      {label && <label style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--text-body)' }}>{label}</label>}
      <div style={{ position: 'relative' }}>
        <select style={{ width: '100%', height: 44, boxSizing: 'border-box', padding: '0 14px 0 38px', fontFamily: 'var(--font-body)', fontSize: 'var(--text-md)', color: 'var(--text-strong)', background: 'var(--surface-card)', appearance: 'none', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)', outline: 'none', cursor: 'pointer' }} {...rest}>
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        <span style={{ position: 'absolute', insetInlineStart: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-subtle)' }}>▾</span>
      </div>
    </div>
  );
}

function Switch({ checked, onChange, label, disabled, style }) {
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 10, cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1, ...style }}>
      <span role="switch" aria-checked={checked} onClick={() => !disabled && onChange && onChange(!checked)} style={{ position: 'relative', width: 44, height: 26, flexShrink: 0, background: checked ? 'var(--brand)' : 'var(--sand-300)', borderRadius: 'var(--radius-pill)', transition: 'background .2s' }}>
        <span style={{ position: 'absolute', top: 3, insetInlineEnd: checked ? 21 : 3, width: 20, height: 20, background: '#fff', borderRadius: '50%', boxShadow: 'var(--shadow-sm)', transition: 'inset-inline-end .2s' }} />
      </span>
      {label && <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-md)', color: 'var(--text-body)' }}>{label}</span>}
    </label>
  );
}

function Tabs({ tabs = [], value, onChange, style }) {
  return (
    <div style={{ display: 'flex', gap: 8, borderBottom: '1px solid var(--border-subtle)', flexWrap: 'wrap', ...style }}>
      {tabs.map((t) => {
        const active = t.value === value;
        return (
          <button key={t.value} onClick={() => onChange(t.value)} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '12px 14px', background: 'none', cursor: 'pointer', border: 'none', borderBottom: `2px solid ${active ? 'var(--brand)' : 'transparent'}`, marginBottom: -1, fontFamily: 'var(--font-body)', fontSize: 'var(--text-md)', fontWeight: active ? 700 : 500, color: active ? 'var(--text-brand)' : 'var(--text-muted)' }}>
            {t.label}
            {t.count != null && <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, background: active ? 'var(--blue-100)' : 'var(--surface-sunken)', color: active ? 'var(--blue-700)' : 'var(--text-subtle)', borderRadius: 'var(--radius-pill)', padding: '1px 8px' }}>{t.count}</span>}
          </button>
        );
      })}
    </div>
  );
}

function SidebarItem({ icon, children, active, count, onClick }) {
  const [hov, setHov] = React.useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 12, width: '100%', padding: '11px 14px', cursor: 'pointer', textAlign: 'start', background: active ? 'var(--blue-50)' : hov ? 'var(--surface-sunken)' : 'transparent', border: 'none', borderRadius: 'var(--radius-md)', fontFamily: 'var(--font-body)', fontSize: 'var(--text-md)', fontWeight: active ? 700 : 500, color: active ? 'var(--blue-700)' : 'var(--text-muted)' }}>
      {active && <span style={{ position: 'absolute', insetInlineStart: 0, top: 8, bottom: 8, width: 3, borderRadius: 'var(--radius-pill)', background: 'var(--brand)' }} />}
      <span style={{ display: 'inline-flex', flexShrink: 0, color: active ? 'var(--brand)' : 'var(--text-subtle)' }}>{icon}</span>
      <span style={{ flex: 1 }}>{children}</span>
      {count != null && <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, background: active ? 'var(--blue-100)' : 'var(--surface-sunken)', color: active ? 'var(--blue-700)' : 'var(--text-subtle)', borderRadius: 'var(--radius-pill)', padding: '1px 8px' }}>{count}</span>}
    </button>
  );
}

function StatTile({ icon, value, label, delta, tone = 'brand', style }) {
  const tones = { brand: { bg: 'var(--blue-50)', fg: 'var(--blue-600)' }, info: { bg: 'var(--status-info-bg)', fg: 'var(--blue-500)' }, success: { bg: 'var(--status-success-bg)', fg: 'var(--green-500)' }, maroon: { bg: 'var(--maroon-50)', fg: 'var(--maroon-500)' } };
  const t = tones[tone]; const up = delta != null && delta >= 0;
  return (
    <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', padding: 20, display: 'flex', flexDirection: 'column', gap: 12, ...style }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 42, height: 42, borderRadius: 'var(--radius-md)', background: t.bg, color: t.fg }}>{icon}</span>
        {delta != null && <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', fontWeight: 700, color: up ? 'var(--green-700)' : 'var(--red-700)', background: up ? 'var(--green-50)' : 'var(--red-50)', borderRadius: 'var(--radius-pill)', padding: '2px 9px' }}>{up ? '▲' : '▼'} {Math.abs(delta)}%</span>}
      </div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-4xl)', fontWeight: 800, color: 'var(--text-strong)', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{value}</div>
      <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>{label}</div>
    </div>
  );
}

Object.assign(window, { Icon, Button, IconButton, Card, Badge, Avatar, Input, Select, Switch, Tabs, SidebarItem, StatTile });
