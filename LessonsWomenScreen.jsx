/* Lessons for Women - دروس نسائية (Firebase Realtime Database) */
function LessonsWomenScreen({ role }) {
  const { Card, Badge, Button, IconButton, Input, Icon } = window;
  const isManager = role === 'section_manager';
  
  const [lessons, setLessons] = React.useState([]);
  const [filterTab, setFilterTab] = React.useState('all');
  const [searchQ, setSearchQ] = React.useState('');
  const [openModal, setOpenModal] = React.useState(false);
  const [editingId, setEditingId] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  
  const DB_URL = window.FIREBASE_DB_URL;
  const API_KEY = window.FIREBASE_API_KEY;

  const [form, setForm] = React.useState({
    name: '',
    instructor: '',
    schedule: '',
    level: 'beginner',
    attendees: 0,
    status: 'active'
  });

  React.useEffect(() => {
    loadLessons();
  }, []);

  async function loadLessons() {
    try {
      setLoading(true);
      const response = await fetch(`${DB_URL}/lessons/women.json?key=${API_KEY}`);
      
      if (!response.ok) throw new Error('Failed to fetch lessons');

      const data = await response.json();
      const lessonsArray = data ? Object.entries(data).map(([id, item]) => ({
        id,
        ...item
      })) : [];
      
      setLessons(lessonsArray);
      setError('');
    } catch (err) {
      console.error('Error loading lessons:', err);
      setError('فشل تحميل الدروس');
      setLessons([]);
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setForm({
      name: '',
      instructor: '',
      schedule: '',
      level: 'beginner',
      attendees: 0,
      status: 'active'
    });
    setEditingId(null);
  }

  async function handleSave() {
    if (!form.name.trim() || !form.instructor.trim()) {
      setError('بحاجة ملء الاسم والمعلمة');
      return;
    }

    try {
      setLoading(true);
      
      if (editingId) {
        const response = await fetch(
          `${DB_URL}/lessons/women/${editingId}.json?key=${API_KEY}`,
          {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
          }
        );
        if (!response.ok) throw new Error('Update failed');
      } else {
        const response = await fetch(
          `${DB_URL}/lessons/women.json?key=${API_KEY}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
          }
        );
        if (!response.ok) throw new Error('Create failed');
      }

      await loadLessons();
      setOpenModal(false);
      resetForm();
      setError('');
    } catch (err) {
      console.error('Error saving lesson:', err);
      setError('فشل الحفظ');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm('تأكيد الحذف؟')) return;

    try {
      setLoading(true);
      const response = await fetch(
        `${DB_URL}/lessons/women/${id}.json?key=${API_KEY}`,
        { method: 'DELETE' }
      );
      if (!response.ok) throw new Error('Delete failed');
      await loadLessons();
    } catch (err) {
      console.error('Error deleting lesson:', err);
      setError('فشل الحذف');
    } finally {
      setLoading(false);
    }
  }

  function handleEdit(item) {
    setForm(item);
    setEditingId(item.id);
    setOpenModal(true);
  }

  const filtered = lessons.filter(l => {
    const matchesTab = filterTab === 'all' || l.status === filterTab;
    const matchesSearch = l.name.toLowerCase().includes(searchQ.toLowerCase()) ||
                         l.instructor.toLowerCase().includes(searchQ.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 16, padding: 24 }}>
      <div>
        <h1 style={{ margin: 0, fontSize: 28, color: 'var(--text-primary)', fontFamily: 'var(--font-accent)' }}>الدروس النسائية</h1>
        <p style={{ margin: '8px 0 0 0', color: 'var(--text-muted)', fontSize: 14 }}>إدارة الدروس والمحاضرات للنساء</p>
      </div>

      {error && (
        <div style={{ background: 'var(--red-100)', color: 'var(--red-900)', padding: 12, borderRadius: 8, fontSize: 14 }}>
          {error}
        </div>
      )}

      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <Input
          placeholder="بحث..."
          value={searchQ}
          onChange={(e) => setSearchQ(e.target.value)}
          style={{ flex: 1 }}
        />
        {isManager && (
          <Button
            onClick={() => {
              resetForm();
              setOpenModal(true);
            }}
            disabled={loading}
          >
            + إضافة درس
          </Button>
        )}
      </div>

      <div style={{ display: 'flex', gap: 8, borderBottom: '1px solid var(--border-color)' }}>
        {['all', 'active', 'inactive'].map(tab => (
          <button
            key={tab}
            onClick={() => setFilterTab(tab)}
            style={{
              padding: '12px 16px',
              border: 'none',
              background: filterTab === tab ? 'var(--text-primary)' : 'transparent',
              color: filterTab === tab ? 'white' : 'var(--text-secondary)',
              cursor: 'pointer',
              fontSize: 14,
              borderRadius: 0,
              borderBottom: filterTab === tab ? '3px solid var(--brand-maroon)' : 'none'
            }}
          >
            {tab === 'all' ? 'جميع' : tab === 'active' ? 'فعالة' : 'معطلة'}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: 32, color: 'var(--text-muted)' }}>جاري التحميل...</div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 32, color: 'var(--text-muted)' }}>لا توجد دروس</div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, fontFamily: 'var(--font-body)' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)', background: 'var(--bg-secondary)' }}>
                {['الاسم', 'المعلمة', 'الجدول', 'المستوى', 'الحضور', 'الحالة', ''].map((h, i) => (
                  <th key={i} style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '12px 16px' }}>{item.name}</td>
                  <td style={{ padding: '12px 16px' }}>{item.instructor}</td>
                  <td style={{ padding: '12px 16px' }}>{item.schedule}</td>
                  <td style={{ padding: '12px 16px' }}>{item.level === 'beginner' ? 'مبتدئ' : item.level === 'intermediate' ? 'متوسط' : 'متقدم'}</td>
                  <td style={{ padding: '12px 16px' }}>{item.attendees}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <Badge color={item.status === 'active' ? 'green' : 'gray'}>
                      {item.status === 'active' ? 'فعالة' : 'معطلة'}
                    </Badge>
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'left' }}>
                    {isManager && (
                      <div style={{ display: 'flex', gap: 4 }}>
                        <IconButton onClick={() => handleEdit(item)} title="تعديل" style={{ color: 'var(--blue-600)' }}>✏️</IconButton>
                        <IconButton onClick={() => handleDelete(item.id)} title="حذف" style={{ color: 'var(--red-600)' }}>🗑️</IconButton>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {openModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <Card style={{ width: 500, padding: 24 }}>
            <h2 style={{ margin: '0 0 16px 0', fontSize: 20 }}>{editingId ? 'تعديل درس' : 'إضافة درس'}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ display: 'block', marginBottom: 8, fontSize: 14, color: 'var(--text-secondary)' }}>اسم الدرس</label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="اسم الدرس" />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: 8, fontSize: 14, color: 'var(--text-secondary)' }}>المعلمة</label>
                <Input value={form.instructor} onChange={(e) => setForm({ ...form, instructor: e.target.value })} placeholder="اسم المعلمة" />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: 8, fontSize: 14, color: 'var(--text-secondary)' }}>الجدول</label>
                <Input value={form.schedule} onChange={(e) => setForm({ ...form, schedule: e.target.value })} placeholder="مثلاً: السبت 3 مساءً" />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: 8, fontSize: 14, color: 'var(--text-secondary)' }}>المستوى</label>
                <select value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })} style={{ width: '100%', padding: '12px 16px', border: '1px solid var(--border-color)', borderRadius: 8, fontSize: 14, fontFamily: 'var(--font-body)' }}>
                  <option value="beginner">مبتدئ</option>
                  <option value="intermediate">متوسط</option>
                  <option value="advanced">متقدم</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <Button onClick={handleSave} disabled={loading} style={{ flex: 1 }}>{editingId ? 'تحديث' : 'إضافة'}</Button>
                <Button onClick={() => { setOpenModal(false); resetForm(); }} disabled={loading} style={{ flex: 1, background: 'var(--gray-300)', color: 'var(--text-primary)' }}>إلغاء</Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
