import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  LogOut, 
  Users, 
  MapPin, 
  PieChart, 
  Search, 
  Download, 
  Filter,
  Lock,
  AlertCircle,
  Menu,
  X,
  ChevronRight,
  Home,
  ArrowLeft
} from 'lucide-react';
import { adminStats, adminContracts } from '../data/adminData';

const LoginView = ({ onLogin }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const authorized = [
      { user: 'Islombek', pass: 'Islombek2005' },
      { user: 'Shakhriyor', pass: 'Shakhriyor2007' }
    ];

    const user = authorized.find(u => u.user === username && u.pass === password);
    if (user) {
      navigate('/admin'); // Navigate to admin dashboard on successful login
    } else {
      setError('Ruxsat berilmagan! Login yoki parol xato.');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden font-sans">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-[var(--color-primary-accent)] opacity-20"></div>
      
      {/* Back Button */}
      <div className="absolute top-10 left-10 z-20">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 text-gray-500 hover:text-white transition-all group px-4 py-2 bg-white/5 backdrop-blur-md rounded-xl border border-white/5"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-bold text-sm tracking-tight">ORQAGA</span>
        </button>
      </div>

      <div className="relative z-10 w-full max-w-md animate-in fade-in zoom-in duration-700">
        <div className="bg-[var(--color-base-dark)] border border-gray-800 rounded-3xl p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-[var(--color-primary-accent)]/10 rounded-full blur-3xl"></div>
          
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-[var(--color-primary-accent)]/20 rounded-2xl flex items-center justify-center text-[var(--color-primary-accent)] mx-auto mb-4 border border-[var(--color-primary-accent)]/30">
              <Lock className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight">Admin Panel</h1>
            <p className="text-gray-500 mt-2">OsonUy boshqaruv tizimi</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Login</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[var(--color-base-gray)] border border-gray-800 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[var(--color-primary-accent)] transition-all"
                placeholder="Username"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Parol</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[var(--color-base-gray)] border border-gray-800 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[var(--color-primary-accent)] transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div className="flex items-center space-x-2 text-red-500 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </div>
            )}

            <button 
              type="submit"
              className="w-full py-4 bg-[var(--color-primary-accent)] hover:bg-[var(--color-primary-hover)] text-white font-black rounded-xl shadow-lg transition-all active:scale-[0.98]"
            >
              KIRISH
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = ({ onBackToSite }) => {
  const [admin, setAdmin] = useState(null);
  const [activeTab, setActiveTab] = useState('statistika');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Hammasi');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const filteredContracts = useMemo(() => {
    return adminContracts.filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === 'Hammasi' || c.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, categoryFilter]);

  if (!admin) {
    return <LoginView onLogin={setAdmin} />;
  }

  return (
    <div className="min-h-screen bg-[var(--color-base-black)] flex">
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-[var(--color-base-dark)] border-r border-gray-800 transition-all duration-300 flex flex-col z-40 fixed lg:static inset-y-0 translate-x-0`}>
        <div className="p-6 flex items-center justify-between border-b border-gray-800">
          <div className="flex items-center space-x-3 overflow-hidden">
            <div className="w-10 h-10 bg-[var(--color-primary-accent)] rounded-lg flex items-center justify-center shrink-0 shadow-lg">
              <Home className="w-6 h-6 text-white" />
            </div>
            {isSidebarOpen && (
              <div className="flex flex-col -space-y-1">
                <span className="text-white font-bold leading-none">OsonUy</span>
                <span className="text-[8px] text-gray-500 font-black uppercase tracking-widest leading-none">Admin</span>
              </div>
            )}
          </div>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-500 hover:text-white lg:hidden">
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-grow p-4 space-y-2 mt-4">
          <button 
            onClick={() => setActiveTab('statistika')}
            className={`w-full flex items-center p-3 rounded-xl transition-all ${activeTab === 'statistika' ? 'bg-[var(--color-forest-900)] text-white shadow-lg' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
          >
            <LayoutDashboard className="w-5 h-5 shrink-0" />
            {isSidebarOpen && <span className="ml-3 font-medium">Statistika</span>}
          </button>
          <button 
            onClick={() => setActiveTab('shartnomalar')}
            className={`w-full flex items-center p-3 rounded-xl transition-all ${activeTab === 'shartnomalar' ? 'bg-[var(--color-forest-900)] text-white shadow-lg' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
          >
            <FileText className="w-5 h-5 shrink-0" />
            {isSidebarOpen && <span className="ml-3 font-medium">Shartnomalar</span>}
          </button>
        </nav>

        <div className="p-4 border-t border-gray-800 space-y-2">
          <div className="flex items-center space-x-3 p-3 text-gray-400">
            <div className="w-8 h-8 bg-[var(--color-primary-accent)]/20 rounded-full flex items-center justify-center text-[var(--color-primary-accent)] shrink-0">
              {admin.charAt(0)}
            </div>
            {isSidebarOpen && <span className="text-sm font-bold truncate">{admin}</span>}
          </div>
          <button 
            onClick={() => { setAdmin(null); onBackToSite(); }}
            className={`w-full flex items-center p-3 rounded-xl text-red-500 hover:bg-red-500/10 transition-all`}
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {isSidebarOpen && <span className="ml-3 font-medium">Chiqish</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow overflow-y-auto w-full lg:pl-0 lg:ml-0 pt-0">
        <header className="sticky top-0 bg-[var(--color-base-black)]/80 backdrop-blur-md border-b border-gray-800 p-6 flex items-center justify-between z-30">
          <div className="flex items-center">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden mr-4 text-gray-400">
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-black text-white uppercase tracking-wider">
              {activeTab === 'statistika' ? 'Analitika va Statistika' : 'Shartnomalar Ombori'}
            </h2>
          </div>
          <div className="text-xs text-gray-500 font-bold hidden sm:block">
            Bugungi sana: {new Date().toLocaleDateString('uz-UZ')}
          </div>
        </header>

        <div className="p-8">
          {activeTab === 'statistika' ? (
            <div className="space-y-8 animate-in fade-in duration-500">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-[var(--color-base-dark)] border border-gray-800 p-8 rounded-3xl relative overflow-hidden group">
                  <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Users className="w-32 h-32" />
                  </div>
                  <p className="text-gray-500 text-xs font-black uppercase tracking-widest mb-2">Umumiy foydalanuvchilar</p>
                  <h3 className="text-5xl font-black text-white">{adminStats.totalUsers.toLocaleString()}</h3>
                  <div className="mt-4 flex items-center text-green-500 text-xs font-bold">
                    <ChevronRight className="w-3 h-3 rotate-[-90deg] mr-1" /> +12% o'tgan oydan
                  </div>
                </div>

                <div className="bg-[var(--color-base-dark)] border border-gray-800 p-8 rounded-3xl relative overflow-hidden group">
                  <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <PieChart className="w-32 h-32" />
                  </div>
                  <p className="text-gray-500 text-xs font-black uppercase tracking-widest mb-2">Kategoriyalar bo'yicha</p>
                  <div className="space-y-3 mt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Oila</span>
                      <span className="text-sm font-bold text-white">{adminStats.categories.family}</span>
                    </div>
                    <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-blue-500 h-full" style={{ width: '45%' }}></div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Qiz bola</span>
                      <span className="text-sm font-bold text-white">{adminStats.categories.female}</span>
                    </div>
                    <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-pink-500 h-full" style={{ width: '35%' }}></div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">O'g'il bola</span>
                      <span className="text-sm font-bold text-white">{adminStats.categories.male}</span>
                    </div>
                    <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-indigo-500 h-full" style={{ width: '20%' }}></div>
                    </div>
                  </div>
                </div>

                <div className="bg-[var(--color-base-dark)] border border-gray-800 p-8 rounded-3xl relative overflow-hidden group md:col-span-2 lg:col-span-1">
                  <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <MapPin className="w-32 h-32" />
                  </div>
                  <p className="text-gray-500 text-xs font-black uppercase tracking-widest mb-2">Top Shaharlar</p>
                  <div className="mt-4 space-y-4">
                    {adminStats.listingsByCity.map((c, i) => (
                      <div key={c.city} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="text-xs text-gray-600 mr-2 w-4">0{i+1}</span>
                          <span className="text-sm text-white font-medium">{c.city}</span>
                        </div>
                        <span className="text-sm font-black text-[var(--color-primary-accent)]">{c.count} ta</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in duration-500">
              {/* Filters & Search */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex bg-[var(--color-base-dark)] p-1.5 rounded-2xl border border-gray-800 shrink-0 overflow-x-auto no-scrollbar">
                  {['Hammasi', 'Oila', 'Qiz bola', 'O\'g\'il bola'].map(cat => (
                    <button
                      key={cat}
                      onClick={() => setCategoryFilter(cat)}
                      className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${categoryFilter === cat ? 'bg-white text-black shadow-lg scale-[1.02]' : 'text-gray-500 hover:text-white'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="relative flex-grow max-w-md">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                  <input 
                    type="text" 
                    placeholder="Foydalanuvchi ismini qidiring..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[var(--color-base-dark)] border border-gray-800 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-[var(--color-primary-accent)] transition-all"
                  />
                </div>
              </div>

              {/* Table */}
              <div className="bg-[var(--color-base-dark)] border border-gray-800 rounded-3xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-white/5 border-b border-gray-800">
                      <tr>
                        <th className="px-6 py-4 text-xs font-black text-gray-500 uppercase tracking-widest">ID</th>
                        <th className="px-6 py-4 text-xs font-black text-gray-500 uppercase tracking-widest">Foydalanuvchi</th>
                        <th className="px-6 py-4 text-xs font-black text-gray-500 uppercase tracking-widest">Kategoriya</th>
                        <th className="px-6 py-4 text-xs font-black text-gray-500 uppercase tracking-widest">Shahar</th>
                        <th className="px-6 py-4 text-xs font-black text-gray-500 uppercase tracking-widest">Sana</th>
                        <th className="px-6 py-4 text-xs font-black text-gray-500 uppercase tracking-widest text-right">Amal</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {filteredContracts.length > 0 ? filteredContracts.map(c => (
                        <tr key={c.id} className="hover:bg-white/[0.02] transition-colors group">
                          <td className="px-6 py-5 text-sm font-mono text-gray-500">{c.id}</td>
                          <td className="px-6 py-5">
                            <span className="text-white font-bold">{c.name}</span>
                          </td>
                          <td className="px-6 py-5">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                              c.category === 'Oila' ? 'bg-blue-900/30 text-blue-400 border border-blue-800' :
                              c.category === 'Qiz bola' ? 'bg-pink-900/30 text-pink-400 border border-pink-800' :
                              'bg-indigo-900/30 text-indigo-400 border border-indigo-800'
                            }`}>
                              {c.category}
                            </span>
                          </td>
                          <td className="px-6 py-5 text-sm text-gray-400">{c.city}</td>
                          <td className="px-6 py-5 text-sm text-gray-400">{c.date}</td>
                          <td className="px-6 py-5 text-right">
                            <button className="p-2.5 bg-[#013220]/20 text-[var(--color-primary-accent)] rounded-xl border border-[var(--color-primary-accent)]/20 hover:bg-[var(--color-primary-accent)] hover:text-white transition-all transform active:scale-90">
                              <Download className="w-5 h-5" />
                            </button>
                          </td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan="6" className="px-6 py-20 text-center">
                            <div className="flex flex-col items-center">
                              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-gray-600 mb-4">
                                <Search className="w-8 h-8" />
                              </div>
                              <p className="text-gray-500 font-bold">Hech qanday shartnoma topilmadi</p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
