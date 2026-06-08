/* Sample data for the Masajid Hawli UI kit (fake, RTL). */
const KIT_PROGRAMS = [
  { id: 1, name: 'حلقة تحفيظ الفجر', cat: 'حلقات', tone: 'brand', mosque: 'جامع الراجحي', area: 'حي النسيم', owner: 'عبدالله الأحمد', students: 38, status: 'نشط', stone: 'success' },
  { id: 2, name: 'دروس التفسير للنساء', cat: 'دروس نسائية', tone: 'brand', mosque: 'مسجد قباء', area: 'حي الملقا', owner: 'نورة سالم', students: 64, status: 'نشط', stone: 'success' },
  { id: 3, name: 'برنامج تعليم الجالية البنغالية', cat: 'جاليات', tone: 'info', mosque: 'مسجد الفلاح', area: 'حي العزيزية', owner: 'محمد العتيبي', students: 27, status: 'قيد المراجعة', stone: 'warning' },
  { id: 4, name: 'دورة أحكام التجويد', cat: 'دروس رجال', tone: 'brand', mosque: 'جامع الأميرة', area: 'حي الياسمين', owner: 'سعد القحطاني', students: 45, status: 'نشط', stone: 'success' },
  { id: 5, name: 'ملتقى ضيوف الحرمين', cat: 'ضيوف من الخارج', tone: 'neutral', mosque: 'مسجد السلام', area: 'حي الصحافة', owner: 'خالد المطيري', students: 12, status: 'متوقف', stone: 'danger' },
  { id: 6, name: 'حلقة النساء المسائية', cat: 'دروس نسائية', tone: 'brand', mosque: 'مسجد قباء', area: 'حي الملقا', owner: 'هند الزهراني', students: 51, status: 'نشط', stone: 'success' },
  { id: 7, name: 'محاضرة السيرة النبوية', cat: 'برامج عامة', tone: 'neutral', mosque: 'جامع الراجحي', area: 'حي النسيم', owner: 'عبدالله الأحمد', students: 120, status: 'نشط', stone: 'success' },
  { id: 8, name: 'إمامة التراويح التطوعية', cat: 'إمام متطوع', tone: 'warning', mosque: 'مسجد النور', area: 'حي الورود', owner: 'فهد الدوسري', students: 0, status: 'قيد المراجعة', stone: 'warning' },
];

const KIT_NAV = [
  { id: 'dashboard', label: 'الرئيسية', icon: 'layout-dashboard' },
  { id: 'all', label: 'جميع البرامج', icon: 'layout-grid', count: 128 },
  { id: 'women-lessons', label: 'دروس نسائية', icon: 'book-open', count: 42 },
  { id: 'men-lessons', label: 'دروس رجال', icon: 'book-open', count: 37 },
  { id: 'halaqat', label: 'نظام الحلقات', icon: 'book-open', count: 24 },
  { id: 'communities', label: 'الجاليات', icon: 'globe', count: 16 },
  { id: 'imams', label: 'أئمة متطوعون', icon: 'user-check', count: 9 },
  { id: 'guests', label: 'ضيوف من الخارج', icon: 'plane', count: 6 },
];
const KIT_ADMIN = [
  { id: 'users', label: 'إدارة المستخدمين', icon: 'users' },
  { id: 'reports', label: 'التقارير والإحصائيات', icon: 'bar-chart-3' },
  { id: 'backup', label: 'نسخة احتياطية', icon: 'download' },
];

Object.assign(window, { KIT_PROGRAMS, KIT_NAV, KIT_ADMIN });
