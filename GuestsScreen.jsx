/* Guests Management — الضيوف (Firebase Realtime Database) */
function GuestsScreen({ role }) {
  const { Card, Badge, Button, IconButton, Input } = window;
  const isManager = role === 'section_manager';
  
  const [guests, setGuests] = React.useState([]);
  const [searchQ, setSearchQ] = React.useState('');
  const [openModal, setOpenModal] = React.useState(false);
  const [editingId, setEditingId] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  
  const DB_URL = window.FIREBASE_DB_URL;
  const API_KEY = window.FIREBASE_API_KEY;

  const [form, setForm] = React.useState({
    name: '',
    specialty: '',
    contact: '',
    visitDate: '',
    status: 'pending'
  });

  React.useEffect(() => {
    loadGuests();
  }, []);

  async function loadGuests() {
    try {
      setLoading(true);
      const response = await fetch(`${DB_URL}/guests.json?key=${API_KEY}`);
      if (!response.ok) throw new Error('Failed to fetch guests');
      const data = await response.json();
      const guestsArray = data ? Object.entries(data).map(([id, item]) => ({ id, ...item })) : [];
      setGuests(guestsArray);
      setError('');
    } catch (err) {
      console.error('Error loading guests:', err);
      setError('فشل تحميل الضيوف');
      setGuests([]);
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setForm({ name: '', specialty: '', contact: '', visitDate: '', status: 'pending' });
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
        const response = await fetch(`${DB_URL}/guests/${editingId}.json?key=${API_KEY}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form)
        });
        if (!response.ok) throw new Error('Update failed');
      } else {
        const response = await fetch(`${DB_URL}/guests.json?key=${API_KEY}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form)
        });
        if (!response.ok) throw new Error('Create failed');
      }
      await loadGuests();
      setOpenModal(false);
      resetForm();
      setError('');
    } catch (err) {
      console.error('Error saving guest:', err);
      setError('فشل الحفظ');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm('تأكيد الحذف؟')) return;
    try {
      setLoading(true);
      const response = await fetch(`${DB_URL}/guests/${id}.json?key=${API_KEY}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Delete failed');
      await loadGuests();
    } catch (err) {
      console.error('Error deleting guest:', err);
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

  const filtered = guests.filter(g =>
    g.name.toLowerCase().includes(searchQ.toLowerCase()) ||
    g.specialty.toLowerCase().includes(searchQ.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 16, padding: 24 }}>
      <div>
        <h1 style={{ margin: 0, fontSize: 28, color: 'var(--text-primary)', fontFamily: 'var(--font-accent)' }}>الضيوف</h1>
        <p style={{ margin: '8px 0 0 0', color: 'var(--text-muted)', fontSize: 14 }}>إدارة الضيوف والمحاضرين الخارجيين</p>
      </div>

      {error && <div style={{ background: 'var(--red-100)', color: 'var(--red-900)', padding: 12, borderRadius: 8, fontSize: 14 }}>{error}</div>}

      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <Input placeholder="بحث..." value={searchQ} onChange={(e) => setSearchQ(e.target.value)} style={{ flex: 1 }} />
        {isManager && <Button onClick={() => { resetForm(); setOpenModal(true); }} disabled={loading}>+ إضافة ضيف</Button>}
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: 32, color: 'var(--text-muted)' }}>جاري التحميل...</div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 32, color: 'var(--text-muted)' }}>لا يوجد ضيوف</div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, fontFamily: 'var(--font-body)' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)', background: 'var(--bg-secondary)' }}>
                {['الاسم', 'التخصص', 'البيانات', 'تاريخ الزيارة', 'الحالة', ''].map((h, i) => (
                  <th key={i} style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 600, color: 'var(--text-secondary)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '12px 16px' }}>{item.name}</td>
                  <td style={{ padding: '12px 16px' }}>{item.specialty}</td>
                  <td style={{ padding: '12px 16px' }}>{item.contact}</td>
                  <td style={{ padding: '12px 16px' }}>{item.visitDate}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <Badge color={item.status === 'confirmed' ? 'green' : item.status === 'pending' ? 'yellow' : 'gray'}>
                      {item.status === 'confirmed' ? 'مؤكد' : item.status === 'pending' ? 'قيد الانتظار' : 'ملغى'}
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
            <h2 style={{ margin: '0 0 16px 0', fontSize: 20 }}>{editingId ? 'تعديل ضيف' : 'إضافة ضيف'}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="الاسم الكامل" />
              <Input value={form.specialty} onChange={(e) => setForm({ ...form, specialty: e.target.value })} placeholder="التخصص" />
              <Input value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} placeholder="البريد/الهاتف" />
              <Input type="date" value={form.visitDate} onChange={(e) => setForm({ ...form, visitDate: e.target.value })} placeholder="تاريخ الزيارة" />
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
