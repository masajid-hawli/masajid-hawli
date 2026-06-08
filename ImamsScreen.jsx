/* Imams Management — الأئمة المتطوعون (Firebase Realtime Database) */
function ImamsScreen({ role }) {
  const { Card, Badge, Button, IconButton, Input } = window;
  const isManager = role === 'section_manager';
  
  const [imams, setImams] = React.useState([]);
  const [searchQ, setSearchQ] = React.useState('');
  const [openModal, setOpenModal] = React.useState(false);
  const [editingId, setEditingId] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  
  const DB_URL = window.FIREBASE_DB_URL;
  const API_KEY = window.FIREBASE_API_KEY;

  const [form, setForm] = React.useState({
    name: '',
    phone: '',
    experience: '',
    availability: '',
    status: 'available'
  });

  React.useEffect(() => {
    loadImams();
  }, []);

  async function loadImams() {
    try {
      setLoading(true);
      const response = await fetch(`${DB_URL}/imams.json?key=${API_KEY}`);
      if (!response.ok) throw new Error('Failed to fetch imams');
      const data = await response.json();
      const imamsArray = data ? Object.entries(data).map(([id, item]) => ({ id, ...item })) : [];
      setImams(imamsArray);
      setError('');
    } catch (err) {
      console.error('Error loading imams:', err);
      setError('فشل تحميل الأئمة');
      setImams([]);
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setForm({ name: '', phone: '', experience: '', availability: '', status: 'available' });
    setEditingId(null);
  }

  async function handleSave() {
    if (!form.name.trim()) {
      setError('بحاجة ملء الاسم');
      return;
    }

    try {
      setLoading(true);
      if (editingId) {
        const response = await fetch(`${DB_URL}/imams/${editingId}.json?key=${API_KEY}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form)
        });
        if (!response.ok) throw new Error('Update failed');
      } else {
        const response = await fetch(`${DB_URL}/imams.json?key=${API_KEY}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form)
        });
        if (!response.ok) throw new Error('Create failed');
      }
      await loadImams();
      setOpenModal(false);
      resetForm();
      setError('');
    } catch (err) {
      console.error('Error saving imam:', err);
      setError('فشل الحفظ');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm('تأكيد الحذف؟')) return;
    try {
      setLoading(true);
      const response = await fetch(`${DB_URL}/imams/${id}.json?key=${API_KEY}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Delete failed');
      await loadImams();
    } catch (err) {
      console.error('Error deleting imam:', err);
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

  const filtered = imams.filter(i =>
    i.name.toLowerCase().includes(searchQ.toLowerCase()) ||
    i.phone.toLowerCase().includes(searchQ.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 16, padding: 24 }}>
      <div>
        <h1 style={{ margin: 0, fontSize: 28, color: 'var(--text-primary)', fontFamily: 'var(--font-accent)' }}>الأئمة المتطوعون</h1>
        <p style={{ margin: '8px 0 0 0', color: 'var(--text-muted)', fontSize: 14 }}>إدارة الأئمة والمتطوعين</p>
      </div>

      {error && <div style={{ background: 'var(--red-100)', color: 'var(--red-900)', padding: 12, borderRadius: 8, fontSize: 14 }}>{error}</div>}

      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <Input placeholder="بحث..." value={searchQ} onChange={(e) => setSearchQ(e.target.value)} style={{ flex: 1 }} />
        {isManager && <Button onClick={() => { resetForm(); setOpenModal(true); }} disabled={loading}>+ إضافة إمام</Button>}
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: 32, color: 'var(--text-muted)' }}>جاري التحميل...</div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 32, color: 'var(--text-muted)' }}>لا يوجد أئمة</div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, fontFamily: 'var(--font-body)' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)', background: 'var(--bg-secondary)' }}>
                {['الاسم', 'الهاتف', 'الخبرة', 'التوفر', 'الحالة', ''].map((h, i) => (
                  <th key={i} style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 600, color: 'var(--text-secondary)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '12px 16px' }}>{item.name}</td>
                  <td style={{ padding: '12px 16px' }}>{item.phone}</td>
                  <td style={{ padding: '12px 16px' }}>{item.experience}</td>
                  <td style={{ padding: '12px 16px' }}>{item.availability}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <Badge color={item.status === 'available' ? 'green' : 'gray'}>
                      {item.status === 'available' ? 'متاح' : 'غير متاح'}
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
            <h2 style={{ margin: '0 0 16px 0', fontSize: 20 }}>{editingId ? 'تعديل إمام' : 'إضافة إمام'}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="الاسم الكامل" />
              <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="رقم الجوال" />
              <Input value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} placeholder="سنوات الخبرة" />
              <Input value={form.availability} onChange={(e) => setForm({ ...form, availability: e.target.value })} placeholder="التوفر (مثلاً: يومياً)" />
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
