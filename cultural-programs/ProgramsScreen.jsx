/* Programs list — Firebase Realtime Database */
function ProgramsScreen({ role }) {
  const { Card, Badge, Button, IconButton, Input } = window;
  const isManager = role === 'section_manager';
  
  const [programs, setPrograms] = React.useState([]);
  const [searchQ, setSearchQ] = React.useState('');
  const [openModal, setOpenModal] = React.useState(false);
  const [editingId, setEditingId] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  
  const DB_URL = window.FIREBASE_DB_URL;
  const API_KEY = window.FIREBASE_API_KEY;

  const [form, setForm] = React.useState({
    name: '',
    category: 'quran',
    mosque: 'مسجد حولي',
    sheikhName: '',
    beneficiaries: 0,
    status: 'active'
  });

  React.useEffect(() => {
    loadPrograms();
  }, []);

  async function loadPrograms() {
    try {
      setLoading(true);
      const response = await fetch(`${DB_URL}/programs.json?key=${API_KEY}`);
      
      if (!response.ok) throw new Error('Failed to fetch programs');

      const data = await response.json();
      const programsArray = data ? Object.entries(data).map(([id, item]) => ({
        id,
        ...item
      })) : [];
      
      setPrograms(programsArray);
      setError('');
    } catch (err) {
      console.error('Error loading programs:', err);
      setError('فشل تحميل البرامج');
      setPrograms([]);
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setForm({
      name: '',
      category: 'quran',
      mosque: 'مسجد حولي',
      sheikhName: '',
      beneficiaries: 0,
      status: 'active'
    });
    setEditingId(null);
  }

  async function handleSave() {
    if (!form.name.trim() || !form.sheikhName.trim()) {
      setError('بحاجة ملء الاسم واسم الشيخ');
      return;
    }

    try {
      setLoading(true);
      
      if (editingId) {
        const response = await fetch(
          `${DB_URL}/programs/${editingId}.json?key=${API_KEY}`,
          {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
          }
        );
        if (!response.ok) throw new Error('Update failed');
      } else {
        const response = await fetch(
          `${DB_URL}/programs.json?key=${API_KEY}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
          }
        );
        if (!response.ok) throw new Error('Create failed');
      }

      await loadPrograms();
      setOpenModal(false);
      resetForm();
      setError('');
    } catch (err) {
      console.error('Error saving program:', err);
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
        `${DB_URL}/programs/${id}.json?key=${API_KEY}`,
        { method: 'DELETE' }
      );
      if (!response.ok) throw new Error('Delete failed');
      await loadPrograms();
    } catch (err) {
      console.error('Error deleting program:', err);
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

  const filtered = programs.filter(p =>
    p.name.toLowerCase().includes(searchQ.toLowerCase()) ||
    p.sheikhName.toLowerCase().includes(searchQ.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 16, padding: 24 }}>
      <div>
        <h1 style={{ margin: 0, fontSize: 28, color: 'var(--text-primary)', fontFamily: 'var(--font-accent)' }}>البرامج</h1>
        <p style={{ margin: '8px 0 0 0', color: 'var(--text-muted)', fontSize: 14 }}>إدارة برامج المسجد</p>
      </div>

      {error && (
        <div style={{ background: 'var(--red-100)', color: 'var(--red-900)', padding: 12, borderRadius: 8, fontSize: 14 }}>
          {error}
        </div>
      )}

      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <Input placeholder="بحث..." value={searchQ} onChange={(e) => setSearchQ(e.target.value)} style={{ flex: 1 }} />
        {isManager && (
          <Button onClick={() => { resetForm(); setOpenModal(true); }} disabled={loading}>
            + إضافة برنامج
          </Button>
        )}
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: 32, color: 'var(--text-muted)' }}>جاري التحميل...</div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 32, color: 'var(--text-muted)' }}>لا توجد برامج</div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, fontFamily: 'var(--font-body)' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)', background: 'var(--bg-secondary)' }}>
                {['البرنامج', 'القسم', 'المسجد', 'مساجد حولي', 'المستفيدون', 'الحالة', ''].map((h, i) => (
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
                  <td style={{ padding: '12px 16px' }}>{item.category === 'quran' ? 'قرآن' : item.category === 'hadith' ? 'حديث' : 'فقه'}</td>
                  <td style={{ padding: '12px 16px' }}>{item.mosque}</td>
                  <td style={{ padding: '12px 16px' }}>{item.sheikhName}</td>
                  <td style={{ padding: '12px 16px' }}>{item.beneficiaries}</td>
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
            <h2 style={{ margin: '0 0 16px 0', fontSize: 20 }}>{editingId ? 'تعديل برنامج' : 'إضافة برنامج'}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ display: 'block', marginBottom: 8, fontSize: 14, color: 'var(--text-secondary)' }}>اسم البرنامج</label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="اسم البرنامج" />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: 8, fontSize: 14, color: 'var(--text-secondary)' }}>القسم</label>
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} style={{ width: '100%', padding: '12px 16px', border: '1px solid var(--border-color)', borderRadius: 8, fontSize: 14, fontFamily: 'var(--font-body)' }}>
                  <option value="quran">قرآن</option>
                  <option value="hadith">حديث</option>
                  <option value="fiqh">فقه</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: 8, fontSize: 14, color: 'var(--text-secondary)' }}>اسم الشيخ</label>
                <Input value={form.sheikhName} onChange={(e) => setForm({ ...form, sheikhName: e.target.value })} placeholder="اسم الشيخ" />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: 8, fontSize: 14, color: 'var(--text-secondary)' }}>عدد المستفيدين</label>
                <Input type="number" value={form.beneficiaries} onChange={(e) => setForm({ ...form, beneficiaries: parseInt(e.target.value) || 0 })} placeholder="0" />
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
