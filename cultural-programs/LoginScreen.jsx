/* Login screen — RTL, brand maroon side panel + blue right panel */
function LoginScreen({ onLogin }) {
  const [email, setEmail] = React.useState('admin@masajid-hawli.com');
  const [password, setPassword] = React.useState('Admin@123456');
  const [role, setRole] = React.useState('section_manager');
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const API_KEY = window.FIREBASE_API_KEY;

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            password,
            returnSecureToken: true
          })
        }
      );

      if (!response.ok) {
        throw new Error('فشل تسجيل الدخول. تحقق من البيانات.');
      }

      const user = await response.json();
      
      localStorage.setItem('userRole', role);
      localStorage.setItem('currentUser', JSON.stringify({
        uid: user.localId,
        email: user.email,
        displayName: user.email.split('@')[0]
      }));
      localStorage.setItem('authToken', user.idToken);
      
      onLogin(role);
    } catch (err) {
      setError(err.message || 'فشل تسجيل الدخول');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'var(--font-body)' }}>
      {/* Left Panel - Brand (Blue) */}
      <div style={{ 
        flex: 1, 
        background: 'var(--blue-600)', 
        color: 'white', 
        padding: 60, 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-between',
        direction: 'rtl'
      }}>
        <div>
          <div style={{ 
            fontSize: 48, 
            fontWeight: 'bold', 
            marginBottom: 8, 
            fontFamily: 'var(--font-accent)',
            textAlign: 'right'
          }}>
            مساجد حولي
          </div>
          <p style={{ 
            fontFamily: 'var(--font-body)', 
            fontSize: 'var(--text-lg)', 
            color: 'rgba(255,255,255,0.9)', 
            marginTop: 10, 
            maxWidth: 360,
            lineHeight: 1.6
          }}>
            منصّة إدارة الدروس والحلقات والجاليات في مساجد حولي.
          </p>
        </div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', textAlign: 'right' }}>
          © 2024 Masajid Hawli. جميع الحقوق محفوظة.
        </div>
      </div>

      {/* Center Panel - Login Form (White) */}
      <div style={{ 
        flex: 1.2, 
        padding: 60, 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        background: 'white',
        direction: 'rtl'
      }}>
        <form onSubmit={handleLogin} style={{ maxWidth: 400, marginLeft: 'auto' }}>
          <h2 style={{ 
            fontSize: 28, 
            margin: '0 0 32px 0',
            color: 'var(--text-primary)',
            textAlign: 'right'
          }}>
            تسجيل الدخول
          </h2>

          {error && (
            <div style={{ 
              background: '#fee', 
              color: '#c33', 
              padding: 12, 
              borderRadius: 8, 
              marginBottom: 16, 
              fontSize: 14,
              textAlign: 'right'
            }}>
              {error}
            </div>
          )}

          <div style={{ marginBottom: 16 }}>
            <label style={{ 
              display: 'block', 
              marginBottom: 8, 
              fontSize: 14, 
              color: 'var(--text-secondary)',
              textAlign: 'right'
            }}>
              البريد الإلكتروني
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #ddd',
                borderRadius: 8,
                fontSize: 14,
                boxSizing: 'border-box',
                fontFamily: 'var(--font-body)',
                direction: 'ltr',
                textAlign: 'left'
              }}
            />
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ 
              display: 'block', 
              marginBottom: 8, 
              fontSize: 14, 
              color: 'var(--text-secondary)',
              textAlign: 'right'
            }}>
              كلمة المرور
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #ddd',
                borderRadius: 8,
                fontSize: 14,
                boxSizing: 'border-box',
                fontFamily: 'var(--font-body)',
                direction: 'ltr',
                textAlign: 'left'
              }}
            />
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ 
              display: 'block', 
              marginBottom: 8, 
              fontSize: 14, 
              color: 'var(--text-secondary)',
              textAlign: 'right'
            }}>
              الصلاحيات
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #ddd',
                borderRadius: 8,
                fontSize: 14,
                boxSizing: 'border-box',
                fontFamily: 'var(--font-body)',
                direction: 'rtl',
                textAlign: 'right'
              }}
            >
              <option value="section_manager">مدير القسم</option>
              <option value="employee">موظف</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '12px 16px',
              background: isLoading ? '#ccc' : 'var(--maroon-700)',
              color: 'white',
              border: 'none',
              borderRadius: 8,
              fontSize: 16,
              fontWeight: 600,
              cursor: isLoading ? 'not-allowed' : 'pointer',
              fontFamily: 'var(--font-body)',
              marginBottom: 12
            }}
          >
            {isLoading ? 'جاري الدخول...' : 'دخول'}
          </button>
        </form>
      </div>

      {/* Right Panel - Blue (Info) */}
      <div style={{ 
        flex: 1, 
        background: 'var(--blue-50)',
        padding: 60, 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center',
        direction: 'rtl'
      }}>
        <div style={{ maxWidth: 280 }}>
          <h3 style={{ 
            fontSize: 18, 
            fontWeight: 'bold',
            margin: '0 0 24px 0',
            color: 'var(--text-primary)',
            textAlign: 'right'
          }}>
            حسابات التجربة
          </h3>

          <div style={{ marginBottom: 20 }}>
            <p style={{ 
              fontSize: 12, 
              color: 'var(--text-secondary)',
              margin: '0 0 8px 0',
              textAlign: 'right'
            }}>
              البريد الإلكتروني:
            </p>
            <p style={{ 
              fontSize: 14, 
              color: 'var(--blue-600)',
              margin: 0,
              textAlign: 'right',
              fontFamily: 'monospace'
            }}>
              admin@masajid-hawli.com
            </p>
          </div>

          <div>
            <p style={{ 
              fontSize: 12, 
              color: 'var(--text-secondary)',
              margin: '0 0 8px 0',
              textAlign: 'right'
            }}>
              كلمة المرور:
            </p>
            <p style={{ 
              fontSize: 14, 
              color: 'var(--blue-600)',
              margin: 0,
              textAlign: 'right',
              fontFamily: 'monospace'
            }}>
              Admin@123456
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
