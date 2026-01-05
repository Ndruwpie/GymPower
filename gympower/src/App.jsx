import React, { useState, useEffect } from 'react';
import {
    Users, Calendar, ShoppingCart, BarChart3, Bell, Target, LogOut,
    Plus, Trash2, CreditCard, CheckCircle, TrendingUp, TrendingDown,
    Search, Filter, Clock, ShieldCheck, ChevronRight, Menu, X,
    Activity, Zap, Award, Heart, Package, UserCheck, DollarSign, Info, MoreVertical,
    Edit, Save, XCircle
} from 'lucide-react';

// --- DATA INITIAL (DATABASE MOCK) ---
const INITIAL_CLASSES = [
    { id: 1, name: "Zumba Party", coach: "Santi", time: "08:00", date: "2025-12-28", quota: 20, booked: 15, room: "Studio A", price: 50000 },
    { id: 2, name: "Power Lifting", coach: "Budi", time: "17:00", date: "2025-12-29", quota: 10, booked: 9, room: "Weight Area", price: 75000 },
    { id: 3, name: "Hatha Yoga", coach: "Melati", time: "10:00", date: "2025-12-28", quota: 15, booked: 5, room: "Studio B", price: 60000 },
];

const INITIAL_PTS = [
    { id: 1, name: "Coach Budi", spec: "Bulking", rate: 250000, rating: 4.9, sessions: 120 },
    { id: 2, name: "Coach Melati", spec: "Yoga/Cardio", rate: 200000, rating: 4.8, sessions: 95 },
];

const INITIAL_PRODUCTS = [
    { id: 1, name: "Whey Protein 2kg", cat: "Suplemen", price: 950000, stock: 15, img: "💊" },
    { id: 2, name: "Isotonic Drink", cat: "Minuman", price: 15000, stock: 50, img: "💧" },
];

// --- MAIN COMPONENT ---
export default function CoreGymUltimate() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('gym_user')) || null);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [searchTerm, setSearchTerm] = useState("");
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    // Data States
    const [classes, setClasses] = useState(() => {
        const saved = localStorage.getItem('gym_classes');
        return saved ? JSON.parse(saved) : INITIAL_CLASSES;
    });

    const [leads, setLeads] = useState(() => {
        const saved = localStorage.getItem('gym_leads');
        return saved ? JSON.parse(saved) : [{ id: 1, name: 'Andi Prospek', status: 'Hot', source: 'Web', date: '2025-12-28' }];
    });

    const [cart, setCart] = useState(() => {
        const saved = localStorage.getItem('gym_cart');
        return saved ? JSON.parse(saved) : [];
    });

    const [notifications, setNotifications] = useState(() => {
        const saved = localStorage.getItem('gym_notifications');
        return saved ? JSON.parse(saved) : [
            { id: 1, type: 'alert', text: 'Membership Budi akan habis dlm 3 hari', date: 'Just now', read: false },
            { id: 2, type: 'info', text: 'Booking Kelas Zumba Baru', date: '1h ago', read: false }
        ];
    });

    const [products, setProducts] = useState(() => {
        const saved = localStorage.getItem('gym_products');
        return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    });

    const [pts, setPts] = useState(() => {
        const saved = localStorage.getItem('gym_pts');
        return saved ? JSON.parse(saved) : INITIAL_PTS;
    });

    // Save to localStorage on changes
    useEffect(() => {
        localStorage.setItem('gym_classes', JSON.stringify(classes));
    }, [classes]);

    useEffect(() => {
        localStorage.setItem('gym_leads', JSON.stringify(leads));
    }, [leads]);

    useEffect(() => {
        localStorage.setItem('gym_cart', JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        localStorage.setItem('gym_notifications', JSON.stringify(notifications));
    }, [notifications]);

    useEffect(() => {
        localStorage.setItem('gym_products', JSON.stringify(products));
    }, [products]);

    useEffect(() => {
        localStorage.setItem('gym_pts', JSON.stringify(pts));
    }, [pts]);

    const handleLogin = (role) => {
        const data = {
            name: role === 'admin' ? 'Super Admin' : 'Alex Johnson',
            role, id: role === 'admin' ? 'ADM-01' : 'MBR-772',
            tier: 'Titanium', expiry: '2026-12-30', balance: 1500000
        };
        setUser(data);
        localStorage.setItem('gym_user', JSON.stringify(data));

        // Add login notification
        const newNotif = {
            id: Date.now(),
            type: 'info',
            text: `Login berhasil sebagai ${role === 'admin' ? 'Administrator' : 'Member'}`,
            date: 'Baru saja',
            read: false
        };
        setNotifications(prev => [newNotif, ...prev]);
    };

    const handleSearch = (value) => {
        setSearchTerm(value);

        // Add search history notification for admin
        if (user?.role === 'admin' && value.trim()) {
            const searchNotif = {
                id: Date.now(),
                type: 'info',
                text: `Mencari: "${value}"`,
                date: 'Baru saja',
                read: false
            };
            setNotifications(prev => [searchNotif, ...prev.slice(0, 9)]); // Keep last 10
        }
    };

    const markNotificationAsRead = (id) => {
        setNotifications(prev =>
            prev.map(notif =>
                notif.id === id ? { ...notif, read: true } : notif
            )
        );
    };

    const markAllNotificationsAsRead = () => {
        setNotifications(prev =>
            prev.map(notif => ({ ...notif, read: true }))
        );
    };

    if (!user) return <LoginPage onLogin={handleLogin} />;

    return (
        <div className="flex h-screen w-full bg-[#F8FAFC] overflow-hidden">
            {/* SIDEBAR */}
            <aside className={`fixed lg:relative z-50 w-72 h-full bg-white border-r border-slate-200 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
                <div className="flex flex-col h-full">
                    <div className="p-8 flex items-center gap-3 shrink-0">
                        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">G</div>
                        <h1 className="text-xl font-black text-slate-800 tracking-tighter uppercase">CORE<span className="text-indigo-600">GYM</span></h1>
                    </div>

                    <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
                        <p className="px-4 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Menu Utama</p>
                        {user.role === 'admin' ? (
                            <>
                                <SidebarItem active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} icon={<BarChart3 size={20} />} label="Dashboard Laporan" />
                                <SidebarItem active={activeTab === 'jadwal'} onClick={() => setActiveTab('jadwal')} icon={<Calendar size={20} />} label="Kelas & Jadwal" />
                                <SidebarItem active={activeTab === 'pt'} onClick={() => setActiveTab('pt')} icon={<UserCheck size={20} />} label="Pelatih Pribadi" />
                                <SidebarItem active={activeTab === 'pos'} onClick={() => setActiveTab('pos')} icon={<ShoppingCart size={20} />} label="POS & Inventaris" />
                                <SidebarItem active={activeTab === 'crm'} onClick={() => setActiveTab('crm')} icon={<Target size={20} />} label="Manajemen CRM" />
                            </>
                        ) : (
                            <>
                                <SidebarItem active={activeTab === 'portal'} onClick={() => setActiveTab('portal')} icon={<ShieldCheck size={20} />} label="Portal Member" />
                                <SidebarItem active={activeTab === 'jadwal_member'} onClick={() => setActiveTab('jadwal_member')} icon={<Calendar size={20} />} label="Booking Kelas" />
                                <SidebarItem active={activeTab === 'pt_booking'} onClick={() => setActiveTab('pt_booking')} icon={<UserCheck size={20} />} label="Cari Pelatih" />
                                <SidebarItem active={activeTab === 'notifications'} onClick={() => setActiveTab('notifications')} icon={<Bell size={20} />} label="Notifikasi" badge={notifications.filter(n => !n.read).length} />
                            </>
                        )}
                    </nav>

                    <div className="p-6 border-t">
                        <button onClick={() => {
                            localStorage.clear();
                            window.location.reload();
                        }} className="w-full flex items-center gap-3 p-3 text-slate-400 hover:text-red-500 font-bold transition-all">
                            <LogOut size={20} /> Keluar Aplikasi
                        </button>
                    </div>
                </div>
            </aside>

            {/* MAIN AREA */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <header className="h-20 bg-white border-b flex items-center justify-between px-6 lg:px-10 shrink-0 z-40">
                    <div className="flex items-center gap-4 flex-1">
                        <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 bg-slate-50 rounded-lg"><Menu size={20} /></button>
                        <div className="relative w-full max-w-md hidden md:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                            <input
                                value={searchTerm}
                                onChange={(e) => handleSearch(e.target.value)}
                                placeholder="Cari jadwal, produk, atau prospek..."
                                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-none rounded-2xl text-sm outline-none focus:ring-2 focus:ring-indigo-100"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                        {/* Notifications Dropdown */}
                        <div className="relative group">
                            <button className="relative">
                                <Bell size={20} className="text-slate-400 hover:text-indigo-600" />
                                {notifications.filter(n => !n.read).length > 0 && (
                                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[8px] flex items-center justify-center rounded-full border-2 border-white font-bold">
                                        {notifications.filter(n => !n.read).length}
                                    </span>
                                )}
                            </button>

                            {/* Notifications Panel */}
                            <div className="absolute right-0 top-full mt-2 w-96 bg-white rounded-2xl shadow-2xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                <div className="p-4 border-b flex justify-between items-center">
                                    <h4 className="font-black text-slate-800">Notifikasi</h4>
                                    {notifications.filter(n => !n.read).length > 0 && (
                                        <button
                                            onClick={markAllNotificationsAsRead}
                                            className="text-xs text-indigo-600 font-bold hover:text-indigo-800"
                                        >
                                            Tandai semua terbaca
                                        </button>
                                    )}
                                </div>
                                <div className="max-h-96 overflow-y-auto custom-scrollbar">
                                    {notifications.length > 0 ? (
                                        notifications.slice(0, 10).map(notif => (
                                            <div
                                                key={notif.id}
                                                className={`p-4 border-b hover:bg-slate-50 cursor-pointer ${!notif.read ? 'bg-indigo-50' : ''}`}
                                                onClick={() => markNotificationAsRead(notif.id)}
                                            >
                                                <div className="flex items-start gap-3">
                                                    <div className={`p-2 rounded-lg ${notif.type === 'alert' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                                                        <Bell size={16} />
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="text-sm font-bold text-slate-800">{notif.text}</p>
                                                        <p className="text-[10px] text-slate-400 mt-1">{notif.date}</p>
                                                    </div>
                                                    {!notif.read && (
                                                        <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                                                    )}
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="p-8 text-center text-slate-400">
                                            <Bell size={32} className="mx-auto mb-2 opacity-20" />
                                            <p className="text-sm">Tidak ada notifikasi</p>
                                        </div>
                                    )}
                                </div>
                                <div className="p-4 border-t text-center">
                                    <button
                                        onClick={() => setActiveTab('notifications')}
                                        className="text-xs text-indigo-600 font-bold hover:text-indigo-800"
                                    >
                                        Lihat semua notifikasi
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/*<div className="flex items-center gap-3 border-l pl-6">*/}
                        {/*    <div className="text-right hidden sm:block">*/}
                        {/*        <p className="text-sm font-black text-slate-800 leading-none mb-1">{user.name}</p>*/}
                        {/*        <p className="text-[10px] text-indigo-600 font-black uppercase tracking-tighter">{user.id} • {user.role}</p>*/}
                        {/*    </div>*/}
                        {/*    <img src={`https://ui-avatars.com/api/?name=${user.name}&background=6366f1&color=fff&bold=true`} className="w-10 h-10 rounded-full border-2 border-white shadow-sm" alt="pfp" />*/}
                        {/*</div>*/}
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-4 lg:p-10 custom-scrollbar bg-[#F8FAFC]">
                    <div className="max-w-7xl mx-auto space-y-8">
                        {activeTab === 'dashboard' && <DashboardModule classes={classes} leads={leads} />}
                        {(activeTab === 'jadwal' || activeTab === 'jadwal_member') &&
                            <ScheduleModule
                                classes={classes}
                                setClasses={setClasses}
                                searchTerm={searchTerm}
                                isMember={activeTab === 'jadwal_member'}
                                user={user}
                            />
                        }
                        {activeTab === 'pos' && <POSModule cart={cart} setCart={setCart} products={products} setProducts={setProducts} searchTerm={searchTerm} />}
                        {activeTab === 'crm' && <CRMModule leads={leads} setLeads={setLeads} searchTerm={searchTerm} />}
                        {activeTab === 'portal' && <MemberPortal user={user} />}
                        {activeTab === 'pt' && <PTManagement pts={pts} setPts={setPts} isMember={false} />}
                        {activeTab === 'pt_booking' && <PTManagement pts={pts} setPts={setPts} isMember={true} user={user} />}
                        {activeTab === 'notifications' && <NotificationsModule notifications={notifications} setNotifications={setNotifications} />}
                    </div>
                </main>
            </div>
        </div>
    );
}

// --- MODULES ---

function DashboardModule({ classes, leads }) {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard label="Total Pendapatan" val="Rp 142.8M" trend="+12%" isUp={true} icon={<DollarSign size={18} />} />
                <StatCard label="Member Baru" val={leads.length + 80} trend="+5%" isUp={true} icon={<Users size={18} />} />
                <StatCard label="Kelas Hari Ini" val={classes.filter(c => c.date === new Date().toISOString().split('T')[0]).length} trend="Aktif" isUp={true} icon={<Calendar size={18} />} />
                <StatCard label="Retensi Member" val="94%" trend="+1%" isUp={true} icon={<Activity size={18} />} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-8 rounded-[32px] border shadow-sm h-96 flex flex-col">
                    <h3 className="font-black text-slate-800 mb-6">Analisis Retensi & Pertumbuhan</h3>
                    <div className="flex-1 flex items-end gap-3 px-2">
                        {[40, 60, 45, 90, 65, 80, 100, 55, 75, 95, 110, 85].map((h, i) => (
                            <div key={i} className="flex-1 bg-indigo-50 hover:bg-indigo-600 rounded-t-xl transition-all group relative" style={{ height: `${h}%` }}>
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all">Rp {h}jt</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-white p-8 rounded-[32px] border shadow-sm">
                    <h3 className="font-black text-slate-800 mb-6">Okupansi Kelas</h3>
                    <div className="space-y-6">
                        {classes.slice(0, 3).map(c => (
                            <ProgressItem
                                key={c.id}
                                label={c.name}
                                val={Math.round((c.booked / c.quota) * 100)}
                                color={Math.round((c.booked / c.quota) * 100) > 80 ? "bg-emerald-500" : Math.round((c.booked / c.quota) * 100) > 50 ? "bg-orange-500" : "bg-indigo-600"}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

// MODUL JADWAL DENGAN KALENDER & TAMBAH JADWAL
function ScheduleModule({ classes, setClasses, searchTerm, isMember, user }) {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingClass, setEditingClass] = useState(null);
    const [newClass, setNewClass] = useState({
        name: '',
        coach: '',
        time: '08:00',
        date: selectedDate,
        quota: 20,
        room: 'Studio A',
        price: 50000
    });

    const handleAddClass = (e) => {
        e.preventDefault();
        const classData = {
            ...newClass,
            id: editingClass ? editingClass.id : Date.now(),
            booked: editingClass ? editingClass.booked : 0
        };

        if (editingClass) {
            setClasses(classes.map(c => c.id === editingClass.id ? classData : c));
        } else {
            setClasses([...classes, classData]);
        }

        setIsModalOpen(false);
        setEditingClass(null);
        setNewClass({
            name: '',
            coach: '',
            time: '08:00',
            date: selectedDate,
            quota: 20,
            room: 'Studio A',
            price: 50000
        });
    };

    const handleEditClass = (classItem) => {
        setEditingClass(classItem);
        setNewClass(classItem);
        setIsModalOpen(true);
    };

    const handleDeleteClass = (id) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus kelas ini?')) {
            setClasses(classes.filter(c => c.id !== id));
        }
    };

    const handleBookClass = (classItem) => {
        if (classItem.booked >= classItem.quota) {
            alert('Kelas sudah penuh!');
            return;
        }

        const updatedClasses = classes.map(c =>
            c.id === classItem.id ? { ...c, booked: c.booked + 1 } : c
        );
        setClasses(updatedClasses);

        alert(`Berhasil booking kelas ${classItem.name}!`);
    };

    const filteredClasses = classes.filter(c =>
        c.date === selectedDate &&
        (c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.coach.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-black text-slate-800 tracking-tight italic uppercase">
                        {isMember ? 'Booking Kelas' : 'Manajemen Jadwal'}
                    </h2>
                    <p className="text-slate-400 text-sm font-medium">Data kelas pada tanggal: <span className="text-indigo-600 font-bold">{selectedDate}</span></p>
                </div>
                {!isMember && (
                    <button onClick={() => setIsModalOpen(true)} className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-black text-xs tracking-widest flex items-center gap-2 shadow-lg hover:bg-indigo-700 transition-all active:scale-95">
                        <Plus size={18} /> TAMBAH JADWAL BARU
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-4">
                    <div className="bg-white p-6 rounded-[32px] border shadow-sm sticky top-4">
                        <CalendarWidget selectedDate={selectedDate} setSelectedDate={setSelectedDate} classes={classes} />
                        <div className="mt-6 p-4 bg-indigo-50 rounded-2xl border border-indigo-100 flex gap-3 items-start">
                            <Info size={18} className="text-indigo-600 shrink-0 mt-0.5" />
                            <p className="text-[11px] text-indigo-700 leading-relaxed font-bold">Titik indikator biru menunjukkan adanya jadwal kelas yang tersedia di tanggal tersebut.</p>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-8 space-y-6">
                    {filteredClasses.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {filteredClasses.map(c => (
                                <ClassCard
                                    key={c.id}
                                    c={c}
                                    isMember={isMember}
                                    onEdit={handleEditClass}
                                    onDelete={handleDeleteClass}
                                    onBook={handleBookClass}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="h-64 flex flex-col items-center justify-center bg-white rounded-[40px] border-2 border-dashed border-slate-200 text-slate-300">
                            <Calendar size={48} className="mb-4 opacity-10" />
                            <p className="font-black uppercase tracking-widest text-xs">Tidak ada jadwal ditemukan</p>
                        </div>
                    )}
                </div>
            </div>

            {/* MODAL TAMBAH/EDIT JADWAL */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-lg rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="p-8 border-b flex justify-between items-center bg-slate-50">
                            <h3 className="text-xl font-black text-slate-800">
                                {editingClass ? 'Edit Jadwal' : 'Buat Jadwal Baru'}
                            </h3>
                            <button onClick={() => {
                                setIsModalOpen(false);
                                setEditingClass(null);
                                setNewClass({
                                    name: '',
                                    coach: '',
                                    time: '08:00',
                                    date: selectedDate,
                                    quota: 20,
                                    room: 'Studio A',
                                    price: 50000
                                });
                            }} className="p-2 hover:bg-white rounded-full transition-colors"><X /></button>
                        </div>
                        <form onSubmit={handleAddClass} className="p-8 space-y-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Nama Kelas</label>
                                <input
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-100"
                                    placeholder="Contoh: Yoga Flow"
                                    value={newClass.name}
                                    onChange={e => setNewClass({ ...newClass, name: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Instruktur</label>
                                    <input
                                        required
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none text-sm font-bold"
                                        placeholder="Nama PT"
                                        value={newClass.coach}
                                        onChange={e => setNewClass({ ...newClass, coach: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Ruangan</label>
                                    <input
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none text-sm font-bold"
                                        value={newClass.room}
                                        onChange={e => setNewClass({ ...newClass, room: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Tanggal</label>
                                    <input
                                        type="date"
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none text-sm font-bold"
                                        value={newClass.date}
                                        onChange={e => setNewClass({ ...newClass, date: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Jam</label>
                                    <input
                                        type="time"
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none text-sm font-bold"
                                        value={newClass.time}
                                        onChange={e => setNewClass({ ...newClass, time: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Kuota</label>
                                    <input
                                        type="number"
                                        min="1"
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none text-sm font-bold"
                                        value={newClass.quota}
                                        onChange={e => setNewClass({ ...newClass, quota: parseInt(e.target.value) })}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Harga (Rp)</label>
                                    <input
                                        type="number"
                                        min="0"
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none text-sm font-bold"
                                        value={newClass.price}
                                        onChange={e => setNewClass({ ...newClass, price: parseInt(e.target.value) })}
                                    />
                                </div>
                            </div>
                            <button type="submit" className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black mt-4 shadow-lg hover:bg-indigo-700 transition-all uppercase text-xs tracking-widest">
                                {editingClass ? 'UPDATE JADWAL' : 'PUBLIKASIKAN JADWAL'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

// --- SUB-COMPONENTS & WIDGETS ---

function CalendarWidget({ selectedDate, setSelectedDate, classes }) {
    const [viewDate, setViewDate] = useState(new Date(selectedDate));
    const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate();
    const firstDay = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1).getDay();
    const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

    const days = [];
    for (let i = 0; i < (firstDay === 0 ? 6 : firstDay - 1); i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);

    const hasClass = (day) => {
        if (!day) return false;
        const d = `${viewDate.getFullYear()}-${String(viewDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        return classes.some(c => c.date === d);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h4 className="font-black text-slate-800">{monthNames[viewDate.getMonth()]} {viewDate.getFullYear()}</h4>
                <div className="flex gap-2">
                    <button onClick={() => setViewDate(new Date(viewDate.setMonth(viewDate.getMonth() - 1)))} className="p-1.5 hover:bg-slate-100 rounded-lg"><ChevronRight className="rotate-180" size={16} /></button>
                    <button onClick={() => setViewDate(new Date(viewDate.setMonth(viewDate.getMonth() + 1)))} className="p-1.5 hover:bg-slate-100 rounded-lg"><ChevronRight size={16} /></button>
                </div>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center mb-2">
                {['S', 'S', 'R', 'K', 'J', 'S', 'M'].map(d => <span key={d} className="text-[10px] font-black text-slate-300 uppercase">{d}</span>)}
            </div>
            <div className="grid grid-cols-7 gap-1">
                {days.map((d, i) => {
                    const dStr = d ? `${viewDate.getFullYear()}-${String(viewDate.getMonth() + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}` : null;
                    const active = selectedDate === dStr;
                    return (
                        <div
                            key={i}
                            onClick={() => d && setSelectedDate(dStr)}
                            className={`h-10 flex flex-col items-center justify-center rounded-xl text-xs font-bold cursor-pointer transition-all relative ${!d ? 'invisible' : active ? 'bg-indigo-600 text-white shadow-md' : 'hover:bg-indigo-50 text-slate-600'}`}
                        >
                            {d}
                            {hasClass(d) && !active && <span className="absolute bottom-1 w-1 h-1 bg-indigo-500 rounded-full"></span>}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function ClassCard({ c, isMember, onEdit, onDelete, onBook }) {
    const occupancy = Math.round((c.booked / c.quota) * 100);

    return (
        <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm hover:border-indigo-600 transition-all group overflow-hidden relative">
            {!isMember && (
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => onEdit(c)} className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200">
                        <Edit size={14} />
                    </button>
                    <button onClick={() => onDelete(c.id)} className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200">
                        <Trash2 size={14} />
                    </button>
                </div>
            )}

            <div className="flex justify-between items-start mb-4">
                <span className="bg-indigo-50 text-indigo-600 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter">{c.room}</span>
                <span className="text-slate-400 font-bold text-xs flex items-center gap-1"><Clock size={14} /> {c.time}</span>
            </div>
            <h4 className="text-lg font-black text-slate-800 mb-1">{c.name}</h4>
            <p className="text-xs text-slate-400 font-bold mb-6 italic">Coach: {c.coach}</p>
            <div className="space-y-2 mb-6">
                <div className="flex justify-between text-[10px] font-black uppercase">
                    <span className="text-slate-400 tracking-widest">Okupansi</span>
                    <span className="text-slate-800">{c.booked}/{c.quota} Member ({occupancy}%)</span>
                </div>
                <div className="h-1.5 bg-slate-50 rounded-full overflow-hidden">
                    <div
                        className={`h-full transition-all duration-1000 ${occupancy > 80 ? 'bg-emerald-500' :
                                occupancy > 50 ? 'bg-orange-500' :
                                    'bg-indigo-600'
                            }`}
                        style={{ width: `${occupancy}%` }}
                    ></div>
                </div>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-sm font-black text-indigo-600">Rp {c.price.toLocaleString()}</span>
                <button
                    onClick={() => isMember ? onBook(c) : onEdit(c)}
                    className={`py-3 px-6 rounded-2xl font-black text-[10px] tracking-[0.2em] transition-all active:scale-95 shadow-lg uppercase ${isMember
                            ? 'bg-slate-900 text-white hover:bg-indigo-600'
                            : 'bg-indigo-600 text-white hover:bg-indigo-700'
                        }`}
                >
                    {isMember ? 'BOOKING KELAS' : 'EDIT SESI'}
                </button>
            </div>
        </div>
    );
}

function POSModule({ cart, setCart, products, setProducts, searchTerm }) {
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [newProduct, setNewProduct] = useState({
        name: '',
        cat: 'Suplemen',
        price: 0,
        stock: 1,
        img: '💊'
    });

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.cat.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const total = cart.reduce((acc, curr) => acc + curr.price, 0);

    const handleAddToCart = (product) => {
        if (product.stock <= 0) {
            alert('Stok habis!');
            return;
        }

        const cartItem = {
            ...product,
            cartId: Date.now(),
            quantity: 1
        };
        setCart([...cart, cartItem]);

        // Update product stock
        setProducts(products.map(p =>
            p.id === product.id ? { ...p, stock: p.stock - 1 } : p
        ));
    };

    const handleRemoveFromCart = (cartId, productId, quantity) => {
        setCart(cart.filter(item => item.cartId !== cartId));

        // Restore product stock
        setProducts(products.map(p =>
            p.id === productId ? { ...p, stock: p.stock + quantity } : p
        ));
    };

    const handleCheckout = () => {
        if (cart.length === 0) {
            alert('Keranjang kosong!');
            return;
        }

        // Clear cart
        setCart([]);

        // Generate receipt
        const receipt = `
            CORE GYM - TRANSACTION RECEIPT
            ================================
            Tanggal: ${new Date().toLocaleString()}
            
            Items:
            ${cart.map(item => `  - ${item.name} x1: Rp ${item.price.toLocaleString()}`).join('\n')}
            
            Total: Rp ${total.toLocaleString()}
            ================================
            Terima kasih atas pembelian Anda!
        `;

        alert(`Transaksi Berhasil!\n\n${receipt}`);
    };

    const handleProductSubmit = (e) => {
        e.preventDefault();

        const productData = {
            ...newProduct,
            id: editingProduct ? editingProduct.id : Date.now(),
            price: parseInt(newProduct.price),
            stock: parseInt(newProduct.stock)
        };

        if (editingProduct) {
            setProducts(products.map(p => p.id === editingProduct.id ? productData : p));
        } else {
            setProducts([...products, productData]);
        }

        setIsProductModalOpen(false);
        setEditingProduct(null);
        setNewProduct({
            name: '',
            cat: 'Suplemen',
            price: 0,
            stock: 1,
            img: '💊'
        });
    };

    const handleEditProduct = (product) => {
        setEditingProduct(product);
        setNewProduct(product);
        setIsProductModalOpen(true);
    };

    const handleDeleteProduct = (id) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
            setProducts(products.filter(p => p.id !== id));
        }
    };

    return (
        <div className="flex flex-col lg:flex-row gap-10 animate-in fade-in duration-500">
            <div className="flex-[2]">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-black text-slate-800 italic uppercase tracking-tight">POS System</h2>
                    <button
                        onClick={() => setIsProductModalOpen(true)}
                        className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2 text-xs"
                    >
                        <Plus size={18} /> TAMBAH PRODUK
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredProducts.map(p => (
                        <div key={p.id} className="bg-white p-6 rounded-[32px] border shadow-sm hover:border-indigo-600 transition-all group relative">
                            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => handleEditProduct(p)} className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200">
                                    <Edit size={14} />
                                </button>
                                <button onClick={() => handleDeleteProduct(p.id)} className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200">
                                    <Trash2 size={14} />
                                </button>
                            </div>

                            <div onClick={() => handleAddToCart(p)} className="cursor-pointer text-center">
                                <div className="text-5xl mb-4">{p.img}</div>
                                <h4 className="font-black text-slate-800">{p.name}</h4>
                                <p className="text-lg font-black text-indigo-600 mt-1">Rp {p.price.toLocaleString()}</p>
                                <p className="text-[10px] text-slate-400 font-bold uppercase mt-4">Kategori: {p.cat}</p>
                                <p className={`text-[10px] font-bold uppercase mt-2 ${p.stock > 10 ? 'text-emerald-600' : p.stock > 0 ? 'text-orange-600' : 'text-red-600'}`}>
                                    Stok: {p.stock}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="lg:w-96 bg-white p-8 rounded-[40px] border shadow-2xl flex flex-col h-fit sticky top-10">
                <h3 className="font-black text-xl mb-6 flex justify-between">Keranjang <ShoppingCart size={20} /></h3>
                <div className="space-y-4 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                    {cart.length > 0 ? (
                        cart.map(item => (
                            <div key={item.cartId} className="flex justify-between items-center bg-slate-50 p-3 rounded-2xl">
                                <div className="flex items-center gap-3">
                                    <span className="text-xl">{item.img}</span>
                                    <div>
                                        <p className="text-xs font-bold">{item.name}</p>
                                        <p className="text-[10px] text-slate-400">Rp {item.price.toLocaleString()}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleRemoveFromCart(item.cartId, item.id, item.quantity)}
                                    className="text-slate-300 hover:text-red-500"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-8 text-slate-400">
                            <ShoppingCart size={32} className="mx-auto mb-2 opacity-20" />
                            <p className="text-sm">Keranjang kosong</p>
                        </div>
                    )}
                </div>
                <div className="mt-8 pt-6 border-t space-y-4">
                    <div className="flex justify-between items-center font-black">
                        <span className="text-slate-400 text-xs">TOTAL</span>
                        <span className="text-2xl text-slate-900 tracking-tighter">Rp {total.toLocaleString()}</span>
                    </div>
                    <button
                        onClick={handleCheckout}
                        className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black shadow-lg uppercase text-xs tracking-widest hover:bg-indigo-700 transition-all"
                    >
                        BAYAR SEKARANG
                    </button>
                </div>
            </div>

            {/* Modal Tambah/Edit Produk */}
            {isProductModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-md rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="p-8 border-b flex justify-between items-center bg-slate-50">
                            <h3 className="text-xl font-black text-slate-800">
                                {editingProduct ? 'Edit Produk' : 'Tambah Produk Baru'}
                            </h3>
                            <button onClick={() => {
                                setIsProductModalOpen(false);
                                setEditingProduct(null);
                                setNewProduct({
                                    name: '',
                                    cat: 'Suplemen',
                                    price: 0,
                                    stock: 1,
                                    img: '💊'
                                });
                            }} className="p-2 hover:bg-white rounded-full transition-colors"><X /></button>
                        </div>
                        <form onSubmit={handleProductSubmit} className="p-8 space-y-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Nama Produk</label>
                                <input
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-100"
                                    placeholder="Contoh: Whey Protein"
                                    value={newProduct.name}
                                    onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Kategori</label>
                                    <select
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-100"
                                        value={newProduct.cat}
                                        onChange={e => setNewProduct({ ...newProduct, cat: e.target.value })}
                                    >
                                        <option value="Suplemen">Suplemen</option>
                                        <option value="Minuman">Minuman</option>
                                        <option value="Pakaian">Pakaian</option>
                                        <option value="Equipment">Equipment</option>
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Icon</label>
                                    <select
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-100"
                                        value={newProduct.img}
                                        onChange={e => setNewProduct({ ...newProduct, img: e.target.value })}
                                    >
                                        <option value="💊">💊 Suplemen</option>
                                        <option value="💧">💧 Minuman</option>
                                        <option value="👕">👕 Pakaian</option>
                                        <option value="🏋️">🏋️ Equipment</option>
                                        <option value="🥤">🥤 Botol</option>
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Harga (Rp)</label>
                                    <input
                                        type="number"
                                        min="0"
                                        required
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none text-sm font-bold"
                                        value={newProduct.price}
                                        onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Stok</label>
                                    <input
                                        type="number"
                                        min="0"
                                        required
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none text-sm font-bold"
                                        value={newProduct.stock}
                                        onChange={e => setNewProduct({ ...newProduct, stock: e.target.value })}
                                    />
                                </div>
                            </div>
                            <button type="submit" className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black mt-4 shadow-lg hover:bg-indigo-700 transition-all uppercase text-xs tracking-widest">
                                {editingProduct ? 'UPDATE PRODUK' : 'TAMBAH PRODUK'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

function CRMModule({ leads, setLeads, searchTerm }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingLead, setEditingLead] = useState(null);
    const [newLead, setNewLead] = useState({
        name: '',
        status: 'Hot',
        source: 'Web',
        date: new Date().toISOString().split('T')[0],
        phone: '',
        email: '',
        notes: ''
    });

    const filtered = leads.filter(l =>
        l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.source.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddLead = (e) => {
        e.preventDefault();

        const leadData = {
            ...newLead,
            id: editingLead ? editingLead.id : Date.now()
        };

        if (editingLead) {
            setLeads(leads.map(l => l.id === editingLead.id ? leadData : l));
        } else {
            setLeads([...leads, leadData]);
        }

        setIsModalOpen(false);
        setEditingLead(null);
        setNewLead({
            name: '',
            status: 'Hot',
            source: 'Web',
            date: new Date().toISOString().split('T')[0],
            phone: '',
            email: '',
            notes: ''
        });
    };

    const handleEditLead = (lead) => {
        setEditingLead(lead);
        setNewLead(lead);
        setIsModalOpen(true);
    };

    const handleDeleteLead = (id) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus lead ini?')) {
            setLeads(leads.filter(l => l.id !== id));
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Hot': return 'bg-red-50 text-red-600';
            case 'Warm': return 'bg-orange-50 text-orange-600';
            case 'Cold': return 'bg-blue-50 text-blue-600';
            case 'Converted': return 'bg-emerald-50 text-emerald-600';
            default: return 'bg-slate-50 text-slate-600';
        }
    };

    return (
        <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-black text-slate-800 italic uppercase tracking-tight">Lead Manajemen</h2>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2 text-xs hover:bg-indigo-700 transition-all"
                >
                    <Plus size={18} /> TAMBAH PROSPEK
                </button>
            </div>

            <div className="bg-white rounded-[32px] border overflow-hidden shadow-sm">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        <tr>
                            <th className="px-8 py-5">Nama Prospek</th>
                            <th className="px-8 py-5">Kontak</th>
                            <th className="px-8 py-5">Status</th>
                            <th className="px-8 py-5">Sumber</th>
                            <th className="px-8 py-5 text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-bold">
                        {filtered.map(l => (
                            <tr key={l.id} className="hover:bg-slate-50 transition-all text-sm">
                                <td className="px-8 py-5">
                                    <div>
                                        <p className="font-bold text-slate-800">{l.name}</p>
                                        <p className="text-[10px] text-slate-400">{l.date}</p>
                                    </div>
                                </td>
                                <td className="px-8 py-5">
                                    <div className="text-xs">
                                        {l.phone && <p className="text-slate-600">{l.phone}</p>}
                                        {l.email && <p className="text-slate-400">{l.email}</p>}
                                    </div>
                                </td>
                                <td className="px-8 py-5">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${getStatusColor(l.status)}`}>
                                        {l.status}
                                    </span>
                                </td>
                                <td className="px-8 py-5 text-xs text-slate-400">{l.source}</td>
                                <td className="px-8 py-5 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => handleEditLead(l)}
                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteLead(l.id)}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal Tambah/Edit Lead */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-lg rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="p-8 border-b flex justify-between items-center bg-slate-50">
                            <h3 className="text-xl font-black text-slate-800">
                                {editingLead ? 'Edit Lead' : 'Tambah Lead Baru'}
                            </h3>
                            <button onClick={() => {
                                setIsModalOpen(false);
                                setEditingLead(null);
                                setNewLead({
                                    name: '',
                                    status: 'Hot',
                                    source: 'Web',
                                    date: new Date().toISOString().split('T')[0],
                                    phone: '',
                                    email: '',
                                    notes: ''
                                });
                            }} className="p-2 hover:bg-white rounded-full transition-colors"><X /></button>
                        </div>
                        <form onSubmit={handleAddLead} className="p-8 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Nama Prospek</label>
                                    <input
                                        required
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-100"
                                        placeholder="Nama lengkap"
                                        value={newLead.name}
                                        onChange={e => setNewLead({ ...newLead, name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Status</label>
                                    <select
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-100"
                                        value={newLead.status}
                                        onChange={e => setNewLead({ ...newLead, status: e.target.value })}
                                    >
                                        <option value="Hot">Hot</option>
                                        <option value="Warm">Warm</option>
                                        <option value="Cold">Cold</option>
                                        <option value="Converted">Converted</option>
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Telepon</label>
                                    <input
                                        type="tel"
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none text-sm font-bold"
                                        placeholder="0812..."
                                        value={newLead.phone}
                                        onChange={e => setNewLead({ ...newLead, phone: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Email</label>
                                    <input
                                        type="email"
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none text-sm font-bold"
                                        placeholder="email@domain.com"
                                        value={newLead.email}
                                        onChange={e => setNewLead({ ...newLead, email: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Sumber</label>
                                    <select
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-100"
                                        value={newLead.source}
                                        onChange={e => setNewLead({ ...newLead, source: e.target.value })}
                                    >
                                        <option value="Web">Website</option>
                                        <option value="Instagram">Instagram</option>
                                        <option value="Referral">Referral</option>
                                        <option value="Walk-in">Walk-in</option>
                                        <option value="Manual">Manual</option>
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Tanggal</label>
                                    <input
                                        type="date"
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none text-sm font-bold"
                                        value={newLead.date}
                                        onChange={e => setNewLead({ ...newLead, date: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Catatan</label>
                                <textarea
                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-100 resize-none"
                                    placeholder="Catatan tambahan..."
                                    rows="3"
                                    value={newLead.notes}
                                    onChange={e => setNewLead({ ...newLead, notes: e.target.value })}
                                />
                            </div>
                            <button type="submit" className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black mt-4 shadow-lg hover:bg-indigo-700 transition-all uppercase text-xs tracking-widest">
                                {editingLead ? 'UPDATE LEAD' : 'SIMPAN LEAD'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

function MemberPortal({ user }) {
    const [balance, setBalance] = useState(user.balance);
    const [topUpAmount, setTopUpAmount] = useState(100000);

    const handleTopUp = () => {
        const newBalance = balance + topUpAmount;
        setBalance(newBalance);

        // Update user in localStorage
        const updatedUser = { ...user, balance: newBalance };
        localStorage.setItem('gym_user', JSON.stringify(updatedUser));

        alert(`Top up berhasil! Saldo baru: Rp ${newBalance.toLocaleString()}`);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 animate-in fade-in duration-700">
            <div className="lg:col-span-2 space-y-8">
                <div className="bg-slate-900 rounded-[48px] p-10 text-white relative overflow-hidden shadow-2xl group">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/30 rounded-full blur-[100px] -mr-40 -mt-40"></div>
                    <div className="relative z-10 flex flex-col h-full justify-between">
                        <div className="flex justify-between items-start mb-20">
                            <div>
                                <p className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em] mb-2">Member Tier</p>
                                <h2 className="text-5xl font-black italic tracking-tighter uppercase">{user.tier} ELITE</h2>
                            </div>
                            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center font-black">G</div>
                        </div>
                        <div className="flex justify-between items-end">
                            <div><p className="text-slate-400 text-[10px] font-bold uppercase">Member</p><p className="text-2xl font-black tracking-tight">{user.name}</p></div>
                            <div className="text-right"><p className="text-slate-400 text-[10px] font-bold uppercase">Berlaku Hingga</p><p className="text-lg font-bold italic">{user.expiry}</p></div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                    <MetricItem icon={<Zap className="text-orange-500" />} label="Kalori" val="12.4k" />
                    <MetricItem icon={<Award className="text-indigo-500" />} label="Poin" val="850" />
                    <MetricItem icon={<Clock className="text-blue-500" />} label="Jam Latihan" val="45h" />
                    <MetricItem icon={<Heart className="text-red-500" />} label="Avg BPM" val="124" />
                </div>
            </div>
            <div className="space-y-6">
                <div className="bg-white p-8 rounded-[40px] border shadow-sm">
                    <h3 className="font-black text-slate-800 mb-6 border-b pb-4">Menu Cepat</h3>
                    <div className="space-y-4">
                        <div className="space-y-3">
                            <div className="flex gap-2">
                                <input
                                    type="number"
                                    min="10000"
                                    step="10000"
                                    value={topUpAmount}
                                    onChange={e => setTopUpAmount(parseInt(e.target.value) || 0)}
                                    className="flex-1 px-4 py-2 rounded-xl bg-slate-50 border-none text-sm font-bold"
                                    placeholder="Jumlah top up"
                                />
                                <button
                                    onClick={handleTopUp}
                                    className="bg-indigo-600 text-white px-4 rounded-xl font-bold text-xs hover:bg-indigo-700 transition-all"
                                >
                                    Top Up
                                </button>
                            </div>
                            <QuickAction icon={<CreditCard size={18} />} label="History Top Up" color="bg-indigo-600" />
                            <QuickAction icon={<Calendar size={18} />} label="History Absensi" color="bg-slate-800" />
                        </div>
                    </div>
                </div>
                <div className="bg-indigo-600 p-8 rounded-[40px] text-white shadow-xl shadow-indigo-100">
                    <h4 className="font-bold mb-1 opacity-80 text-xs uppercase tracking-widest">Saldo Dompet</h4>
                    <p className="text-3xl font-black">Rp {balance.toLocaleString()}</p>
                </div>
            </div>
        </div>
    );
}

function PTManagement({ pts, setPts, isMember, user }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPt, setEditingPt] = useState(null);
    const [newPt, setNewPt] = useState({
        name: '',
        spec: 'Bulking',
        rate: 250000,
        rating: 4.5,
        sessions: 0
    });

    const handleBookSession = (pt) => {
        if (!user) {
            alert('Silakan login terlebih dahulu!');
            return;
        }

        if (window.confirm(`Booking sesi dengan ${pt.name}? Biaya: Rp ${pt.rate.toLocaleString()}`)) {
            alert(`Booking berhasil! Sesi dengan ${pt.name} telah dipesan.`);
        }
    };

    const handlePtSubmit = (e) => {
        e.preventDefault();

        const ptData = {
            ...newPt,
            id: editingPt ? editingPt.id : Date.now(),
            rate: parseInt(newPt.rate),
            rating: parseFloat(newPt.rating),
            sessions: parseInt(newPt.sessions)
        };

        if (editingPt) {
            setPts(pts.map(p => p.id === editingPt.id ? ptData : p));
        } else {
            setPts([...pts, ptData]);
        }

        setIsModalOpen(false);
        setEditingPt(null);
        setNewPt({
            name: '',
            spec: 'Bulking',
            rate: 250000,
            rating: 4.5,
            sessions: 0
        });
    };

    const handleEditPt = (pt) => {
        setEditingPt(pt);
        setNewPt(pt);
        setIsModalOpen(true);
    };

    const handleDeletePt = (id) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus pelatih ini?')) {
            setPts(pts.filter(p => p.id !== id));
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-black text-slate-800 italic uppercase tracking-tight">
                    {isMember ? 'Pelatih Pribadi' : 'Manajemen Pelatih'}
                </h2>
                {!isMember && (
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2 text-xs hover:bg-indigo-700 transition-all"
                    >
                        <Plus size={18} /> TAMBAH PELATIH
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {pts.map(p => (
                    <div key={p.id} className="bg-white p-8 rounded-[40px] border shadow-sm hover:border-indigo-600 transition-all group relative">
                        {!isMember && (
                            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => handleEditPt(p)} className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200">
                                    <Edit size={14} />
                                </button>
                                <button onClick={() => handleDeletePt(p.id)} className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200">
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        )}

                        <div className="w-20 h-20 rounded-2xl bg-indigo-50 flex items-center justify-center mx-auto mb-6">
                            <Users className="text-indigo-600" />
                        </div>
                        <h4 className="text-xl font-black text-slate-800 mb-1 text-center">{p.name}</h4>
                        <p className="text-xs text-indigo-600 font-bold mb-4 text-center uppercase tracking-widest">{p.spec}</p>

                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-400">Rating:</span>
                                <span className="font-bold">{p.rating} ⭐</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-400">Sesi:</span>
                                <span className="font-bold">{p.sessions}</span>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-dashed space-y-4">
                            <p className="text-lg font-black text-slate-900 text-center">Rp {p.rate.toLocaleString()} <span className="text-[10px] text-slate-400">/ Sesi</span></p>
                            <button
                                onClick={() => isMember ? handleBookSession(p) : handleEditPt(p)}
                                className={`w-full py-4 rounded-2xl font-black text-[10px] tracking-widest uppercase transition-all ${isMember
                                        ? 'bg-slate-900 text-white hover:bg-indigo-600'
                                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                                    }`}
                            >
                                {isMember ? 'BOOKING SESI' : 'EDIT PROFIL'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal Tambah/Edit Pelatih */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-md rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="p-8 border-b flex justify-between items-center bg-slate-50">
                            <h3 className="text-xl font-black text-slate-800">
                                {editingPt ? 'Edit Pelatih' : 'Tambah Pelatih Baru'}
                            </h3>
                            <button onClick={() => {
                                setIsModalOpen(false);
                                setEditingPt(null);
                                setNewPt({
                                    name: '',
                                    spec: 'Bulking',
                                    rate: 250000,
                                    rating: 4.5,
                                    sessions: 0
                                });
                            }} className="p-2 hover:bg-white rounded-full transition-colors"><X /></button>
                        </div>
                        <form onSubmit={handlePtSubmit} className="p-8 space-y-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Nama Pelatih</label>
                                <input
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-100"
                                    placeholder="Nama lengkap"
                                    value={newPt.name}
                                    onChange={e => setNewPt({ ...newPt, name: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Spesialisasi</label>
                                    <select
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-100"
                                        value={newPt.spec}
                                        onChange={e => setNewPt({ ...newPt, spec: e.target.value })}
                                    >
                                        <option value="Bulking">Bulking</option>
                                        <option value="Yoga/Cardio">Yoga/Cardio</option>
                                        <option value="Strength">Strength</option>
                                        <option value="HIIT">HIIT</option>
                                        <option value="Rehab">Rehab</option>
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Rating</label>
                                    <input
                                        type="number"
                                        min="0"
                                        max="5"
                                        step="0.1"
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none text-sm font-bold"
                                        value={newPt.rating}
                                        onChange={e => setNewPt({ ...newPt, rating: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Tarif (Rp)</label>
                                    <input
                                        type="number"
                                        min="0"
                                        required
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none text-sm font-bold"
                                        value={newPt.rate}
                                        onChange={e => setNewPt({ ...newPt, rate: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Total Sesi</label>
                                    <input
                                        type="number"
                                        min="0"
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none text-sm font-bold"
                                        value={newPt.sessions}
                                        onChange={e => setNewPt({ ...newPt, sessions: e.target.value })}
                                    />
                                </div>
                            </div>
                            <button type="submit" className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black mt-4 shadow-lg hover:bg-indigo-700 transition-all uppercase text-xs tracking-widest">
                                {editingPt ? 'UPDATE PELATIH' : 'TAMBAH PELATIH'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

function NotificationsModule({ notifications, setNotifications }) {
    const unreadCount = notifications.filter(n => !n.read).length;

    const markAsRead = (id) => {
        setNotifications(notifications.map(n =>
            n.id === id ? { ...n, read: true } : n
        ));
    };

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    const clearAll = () => {
        if (window.confirm('Apakah Anda yakin ingin menghapus semua notifikasi?')) {
            setNotifications([]);
        }
    };

    const deleteNotification = (id) => {
        setNotifications(notifications.filter(n => n.id !== id));
    };

    return (
        <div className="animate-in fade-in duration-500">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-black text-slate-800 italic uppercase tracking-tight">Notifikasi</h2>
                    <p className="text-slate-400 text-sm font-medium">
                        {unreadCount > 0 ? `${unreadCount} notifikasi belum dibaca` : 'Semua notifikasi telah dibaca'}
                    </p>
                </div>
                <div className="flex gap-2">
                    {unreadCount > 0 && (
                        <button
                            onClick={markAllAsRead}
                            className="bg-indigo-600 text-white px-4 py-2 rounded-xl font-bold text-xs hover:bg-indigo-700 transition-all"
                        >
                            Tandai semua terbaca
                        </button>
                    )}
                    <button
                        onClick={clearAll}
                        className="bg-slate-100 text-slate-600 px-4 py-2 rounded-xl font-bold text-xs hover:bg-slate-200 transition-all"
                    >
                        Hapus semua
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-[32px] border shadow-sm overflow-hidden">
                {notifications.length > 0 ? (
                    <div className="divide-y divide-slate-100">
                        {notifications.map(notif => (
                            <div
                                key={notif.id}
                                className={`p-6 hover:bg-slate-50 transition-all ${!notif.read ? 'bg-indigo-50' : ''}`}
                            >
                                <div className="flex items-start gap-4">
                                    <div className={`p-3 rounded-xl ${notif.type === 'alert' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                                        <Bell size={20} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-bold text-slate-800">{notif.text}</p>
                                        <p className="text-[10px] text-slate-400 mt-1">{notif.date}</p>
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                        {!notif.read && (
                                            <button
                                                onClick={() => markAsRead(notif.id)}
                                                className="text-xs text-indigo-600 font-bold hover:text-indigo-800"
                                            >
                                                Tandai baca
                                            </button>
                                        )}
                                        <button
                                            onClick={() => deleteNotification(notif.id)}
                                            className="p-1 text-slate-300 hover:text-red-500"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="p-16 text-center">
                        <Bell size={64} className="mx-auto mb-4 text-slate-200" />
                        <h3 className="text-lg font-black text-slate-400 mb-2">Tidak ada notifikasi</h3>
                        <p className="text-slate-400 text-sm">Semua notifikasi akan muncul di sini</p>
                    </div>
                )}
            </div>
        </div>
    );
}

// --- SHARED UI ---

function SidebarItem({ icon, label, active, onClick, badge }) {
    return (
        <button onClick={onClick} className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 group relative ${active ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}>
            <span className={active ? 'text-white' : 'text-slate-400 group-hover:text-indigo-600'}>{icon}</span>
            <span className="text-sm font-bold tracking-tight">{label}</span>
            {badge && badge > 0 && (
                <span className="absolute right-4 w-5 h-5 bg-red-500 text-white text-[8px] flex items-center justify-center rounded-full font-bold">
                    {badge}
                </span>
            )}
        </button>
    );
}

function StatCard({ label, val, trend, isUp, icon }) {
    return (
        <div className="bg-white p-6 rounded-[28px] border shadow-sm flex flex-col justify-between h-40 transition-transform hover:-translate-y-1">
            <div className="flex justify-between items-start">
                <div className="p-3 bg-slate-50 text-slate-400 rounded-xl group-hover:bg-indigo-600 transition-all">{icon}</div>
                <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${isUp ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>{trend}</span>
            </div>
            <div><p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p><h4 className="text-2xl font-black text-slate-800 tracking-tighter">{val}</h4></div>
        </div>
    );
}

function ProgressItem({ label, val, color }) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between text-[11px] font-black uppercase"><span className="text-slate-500">{label}</span><span className="text-slate-800">{val}%</span></div>
            <div className="h-2 bg-slate-50 rounded-full overflow-hidden"><div className={`h-full ${color} rounded-full`} style={{ width: `${val}%` }}></div></div>
        </div>
    );
}

function MetricItem({ icon, label, val }) {
    return (
        <div className="bg-white p-6 rounded-[32px] border text-center space-y-2 hover:border-indigo-600 transition-all shadow-sm">
            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center mx-auto">{icon}</div>
            <p className="text-xl font-black tracking-tighter text-slate-800">{val}</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
        </div>
    );
}

function QuickAction({ icon, label, color }) {
    return (
        <button className="w-full flex items-center gap-4 p-4 bg-slate-50 hover:bg-white border hover:border-indigo-600 rounded-2xl transition-all group font-bold text-sm">
            <div className={`p-2 rounded-lg text-white ${color}`}>{icon}</div>
            <span className="text-slate-800">{label}</span>
            <ChevronRight className="ml-auto text-slate-300" size={16} />
        </button>
    );
}

function LoginPage({ onLogin }) {
    return (
        <div className="h-screen flex items-center justify-center bg-[#F8FAFC] p-6">
            <div className="w-full max-w-md bg-white p-12 rounded-[40px] shadow-2xl text-center border">
                <div className="w-20 h-20 bg-indigo-600 rounded-3xl mx-auto mb-8 flex items-center justify-center text-white text-4xl font-black shadow-xl">G</div>
                <h2 className="text-3xl font-black mb-10 tracking-tight text-slate-800 italic uppercase">CoreGym System</h2>
                <div className="space-y-4">
                    <button onClick={() => onLogin('admin')} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black shadow-lg hover:bg-slate-800 transition-all uppercase tracking-widest text-xs">Akses Administrator</button>
                    <button onClick={() => onLogin('member')} className="w-full py-4 border-2 rounded-2xl font-black text-slate-600 hover:bg-slate-50 transition-all uppercase tracking-widest text-xs">Portal Member</button>
                </div>
            </div>
        </div>
    );
}