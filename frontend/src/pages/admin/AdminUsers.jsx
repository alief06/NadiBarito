import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { User, Trash2, Mail, Shield, ShieldCheck, Search, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const { data } = await api.get('/users');
                setUsers(data);
            } catch (err) {
                console.error("Failed to fetch users", err);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Apakah Anda yakin ingin menghapus user ini?')) return;
        try {
            await api.delete(`/users/${id}`);
            setUsers(users.filter(u => u._id !== id));
        } catch (err) {
            alert('Gagal menghapus user');
        }
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return (
        <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-heritage-gold" size={40} />
        </div>
    );

    return (
        <div className="space-y-32">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-heritage font-bold text-heritage-brown">Manajemen <span className="text-heritage-gold">Users</span></h1>
                    <p className="text-gray-500 mt-2 text-small">Kelola hak akses dan data pengguna NirantaJogja.</p>
                </div>
                <div className="relative group">
                    <Search className="absolute left-12 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-heritage-gold transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Cari user..."
                        className="pl-40 pr-16 py-12 rounded-2xl bg-white border border-gray-100 focus:border-heritage-gold outline-none shadow-sm transition-all w-80"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="bg-white rounded-[32px] overflow-hidden shadow-xl shadow-heritage-brown/5 border border-heritage-gold/10">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-heritage-brown text-white uppercase text-[10px] tracking-[0.2em] font-bold">
                            <th className="px-24 py-20">User</th>
                            <th className="px-24 py-20">Role</th>
                            <th className="px-24 py-20">Bergabung</th>
                            <th className="px-24 py-20 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {filteredUsers.map((user) => (
                            <motion.tr
                                key={user._id}
                                layout
                                className="hover:bg-heritage-cream/20 transition-colors"
                            >
                                <td className="px-24 py-16">
                                    <div className="flex items-center gap-12">
                                        <div className="w-10 h-10 rounded-full bg-heritage-gold/20 flex items-center justify-center text-heritage-gold font-bold">
                                            {user.name[0]}
                                        </div>
                                        <div>
                                            <p className="font-bold text-heritage-brown">{user.name}</p>
                                            <p className="text-xs text-gray-400 flex items-center gap-1"><Mail size={10} /> {user.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-24 py-16">
                                    <span className={`px-12 py-4 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-4 w-fit ${user.role === 'admin'
                                            ? 'bg-heritage-gold/10 text-heritage-gold border border-heritage-gold/20'
                                            : 'bg-gray-100 text-gray-500'
                                        }`}>
                                        {user.role === 'admin' ? <ShieldCheck size={12} /> : <User size={12} />}
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-24 py-16 text-gray-400 text-sm">
                                    {new Date(user.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                </td>
                                <td className="px-24 py-16 text-center">
                                    <button
                                        onClick={() => handleDelete(user._id)}
                                        className="p-8 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
                {filteredUsers.length === 0 && (
                    <div className="py-20 text-center text-gray-400 italic">
                        Tidak ada user ditemukan.
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminUsers;
