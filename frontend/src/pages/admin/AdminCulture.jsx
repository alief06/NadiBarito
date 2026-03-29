import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { Plus, Edit, Trash2, BookOpen, Layers, Loader2, X, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminCulture = () => {
    const [cultures, setCultures] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        category: 'Tradisi',
        description: '',
        image: ''
    });

    useEffect(() => { fetchCulture(); }, []);

    const fetchCulture = async () => {
        setLoading(true);
        try {
            const res = await api.get('/culture');
            setCultures(res.data);
        } catch (err) { console.error(err); }
        setLoading(false);
    };

    const handleOpenModal = (item = null) => {
        if (item) {
            setCurrentItem(item);
            setFormData(item);
        } else {
            setCurrentItem(null);
            setFormData({ name: '', category: 'Tradisi', description: '', image: '' });
        }
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentItem) {
                await api.put(`/culture/${currentItem._id}`, formData);
            } else {
                await api.post('/culture', formData);
            }
            setShowModal(false);
            fetchCulture();
        } catch (err) { alert('Error saving culture'); }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Hapus konten budaya ini?')) {
            try {
                await api.delete(`/culture/${id}`);
                fetchCulture();
            } catch (err) { alert('Error deleting'); }
        }
    };

    return (
        <div className="space-y-32">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-heritage font-bold text-heritage-brown">Arsip <span className="text-heritage-gold">Budaya</span></h1>
                    <p className="text-gray-500 mt-2 text-small">Kelola konten edukasi seputar tradisi, kesenian, dan warisan Jogja.</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="btn-primary flex items-center gap-2"
                >
                    <Plus size={20} /> Tambah Konten
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20">
                {loading ? (
                    <div className="col-span-full py-20 text-center"><Loader2 className="animate-spin mx-auto text-heritage-gold" /></div>
                ) : cultures.map((item) => (
                    <motion.div
                        key={item._id}
                        layout
                        className="bg-white rounded-3xl shadow-lg border border-heritage-gold/5 group relative h-[300px] overflow-hidden"
                    >
                        <img src={item.image || 'https://via.placeholder.com/400x300'} alt={item.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-24 flex flex-col justify-end">
                            <span className="text-[10px] font-bold text-heritage-gold uppercase tracking-[0.2em] mb-4">{item.category}</span>
                            <h3 className="text-white font-heritage font-bold text-lg mb-8">{item.name}</h3>
                            <div className="flex gap-8 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => handleOpenModal(item)} className="px-12 py-6 bg-white/20 backdrop-blur-md text-white rounded-lg text-xs font-bold hover:bg-heritage-gold hover:text-heritage-brown transition-all">Edit</button>
                                <button onClick={() => handleDelete(item._id)} className="px-12 py-6 bg-red-500/20 backdrop-blur-md text-red-100 rounded-lg text-xs font-bold hover:bg-red-500 transition-all">Hapus</button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[150] flex items-center justify-center p-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-[40px] w-full max-w-xl p-12 shadow-2xl relative"
                    >
                        <button onClick={() => setShowModal(false)} className="absolute top-8 right-8 p-8 hover:bg-gray-100 rounded-full transition-colors"><X size={24} /></button>
                        <h2 className="text-3xl font-heritage font-bold text-heritage-brown mb-8">{currentItem ? 'Edit Budaya' : 'Konten Budaya Baru'}</h2>

                        <form onSubmit={handleSubmit} className="space-y-24">
                            <div className="grid grid-cols-2 gap-24">
                                <div className="space-y-8">
                                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Nama</label>
                                    <input
                                        type="text" required
                                        className="w-full p-4 bg-gray-50 border border-transparent focus:border-heritage-gold rounded-2xl outline-none transition-all font-medium"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-8">
                                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Kategori</label>
                                    <select
                                        className="w-full p-4 bg-gray-50 border border-transparent focus:border-heritage-gold rounded-2xl outline-none transition-all font-medium"
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    >
                                        <option value="Tradisi">Tradisi</option>
                                        <option value="Seni">Seni</option>
                                        <option value="Upacara">Upacara</option>
                                        <option value="Filosofi">Filosofi</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-8">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">URL Gambar</label>
                                <input
                                    type="text"
                                    className="w-full p-4 bg-gray-50 border border-transparent focus:border-heritage-gold rounded-2xl outline-none transition-all font-medium text-sm"
                                    value={formData.image}
                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                />
                            </div>

                            <div className="space-y-8">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Deskripsi</label>
                                <textarea
                                    className="w-full p-4 bg-gray-50 border border-transparent focus:border-heritage-gold rounded-2xl outline-none transition-all font-medium h-32"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>

                            <button type="submit" className="w-full btn-primary py-4 rounded-2xl font-bold shadow-xl shadow-heritage-gold/20 flex items-center justify-center gap-12 group">
                                <Layers size={20} className="group-hover:rotate-12 transition-transform" />
                                {currentItem ? 'Simpan Perubahan' : 'Arsipkan Konten'}
                            </button>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default AdminCulture;
