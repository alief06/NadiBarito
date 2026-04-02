import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTourismStore } from '../store/useTourismStore';
import { toast } from 'sonner';
import { 
  Save, 
  Plus, 
  Trash2, 
  MapPin, 
  Type, 
  BarChart3, 
  Lock, 
  Unlock, 
  ShieldCheck,
  ChevronRight,
  Loader2
} from 'lucide-react';

const AdminCommandCenter = () => {
    const { 
        places, updatePlace, addPlace, deletePlace, 
        cultureNarrative, updateNarrative, 
        cityStats, updateStat 
    } = useTourismStore();

    const [token, setToken] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [activeTab, setActiveTab] = useState('places');
    const [isUpdating, setIsUpdating] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [newPlace, setNewPlace] = useState({ name: '', category: 'Budaya', description: '', image: '', lat: -3.3, lng: 114.6 });

    // Security Check
    const handleLogin = (e) => {
        e.preventDefault();
        if (token === 'BARITO2026') {
            setIsAuthenticated(true);
            toast.success('Access Granted. Welcome, Commander.');
        } else {
            toast.error('Invalid Token. Access Denied.');
        }
    };

    const handlePushUpdate = async () => {
        setIsUpdating(true);
        // Simulate remote update
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsUpdating(false);
        toast.success('Data Successfully Synchronized with LocalStorage!', {
            description: 'All nodes have been updated to the latest state.',
        });
    };

    const handleAddPlace = () => {
        if (!newPlace.name) return toast.error('Name is required');
        addPlace(newPlace);
        setIsAdding(false);
        setNewPlace({ name: '', category: 'Budaya', description: '', image: '', lat: -3.3, lng: 114.6 });
        toast.success(`${newPlace.name} added successfully!`);
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-md p-10 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-3xl shadow-2xl"
                >
                    <div className="flex flex-col items-center text-center space-y-6">
                        <div className="w-20 h-20 bg-brand-orange/20 rounded-full flex items-center justify-center text-brand-orange border border-brand-orange/30 shadow-[0_0_30px_rgba(249,115,22,0.2)]">
                            <Lock size={32} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-serif font-bold text-white mb-2 uppercase tracking-editorial">Command Center</h1>
                            <p className="text-white/40 text-sm">Enter access token to decrypt system control.</p>
                        </div>
                        <form onSubmit={handleLogin} className="w-full space-y-4">
                            <input 
                                type="password" 
                                placeholder="ADMIN_TOKEN" 
                                value={token}
                                onChange={(e) => setToken(e.target.value)}
                                className="w-full bg-black/50 border border-white/10 rounded-2xl p-5 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-brand-orange/50 transition-all font-mono text-center tracking-[0.5em]"
                            />
                            <button 
                                type="submit"
                                className="w-full bg-brand-orange hover:bg-orange-500 text-white font-bold py-5 rounded-2xl transition-all shadow-[0_10px_20px_-10px_rgba(249,115,22,0.5)] flex items-center justify-center gap-3 uppercase text-xs tracking-meta"
                            >
                                <ShieldCheck size={18} /> Authenticate
                            </button>
                        </form>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#020202] text-white p-6 md:p-12 font-sans">
            {/* Header Area */}
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                <div>
                    <div className="flex items-center gap-3 text-brand-orange mb-2">
                        <Unlock size={16} />
                        <span className="text-[10px] font-mono uppercase tracking-meta">System Authenticated</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-editorial">Command Center <span className="text-brand-orange">v1.2</span></h1>
                </div>
                
                <button 
                    onClick={handlePushUpdate}
                    disabled={isUpdating}
                    className="flex items-center gap-3 bg-white/5 border border-white/10 px-8 py-4 rounded-full hover:bg-brand-orange hover:border-brand-orange hover:text-white transition-all group disabled:opacity-50"
                >
                    {isUpdating ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} className="group-hover:scale-110 transition-transform" />}
                    <span className="text-xs font-bold uppercase tracking-meta">Push Updates</span>
                </button>
            </div>

            {/* Main Interface */}
            <div className="max-w-7xl mx-auto grid lg:grid-cols-[280px_1fr] gap-10">
                
                {/* Sidebar Navigation */}
                <div className="space-y-4">
                    {[
                        { id: 'places', label: 'Tourism Spots', icon: MapPin },
                        { id: 'narrative', label: 'Culture Narratives', icon: Type },
                        { id: 'stats', label: 'Modern Stats', icon: BarChart3 },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center justify-between p-5 rounded-2xl transition-all border ${
                                activeTab === tab.id 
                                ? 'bg-brand-orange/10 border-brand-orange/30 text-brand-orange' 
                                : 'bg-white/5 border-white/5 text-white/40 hover:bg-white/10 hover:border-white/10'
                            }`}
                        >
                            <div className="flex items-center gap-4">
                                <tab.icon size={20} />
                                <span className="font-bold text-sm">{tab.label}</span>
                            </div>
                            <ChevronRight size={16} className={activeTab === tab.id ? 'opacity-100' : 'opacity-0'} />
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="bg-white/5 border border-white/10 rounded-[3rem] p-8 md:p-12 min-h-[600px] backdrop-blur-xl">
                    <AnimatePresence mode="wait">
                        {activeTab === 'places' && (
                            <motion.div 
                                key="places"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-10"
                            >
                                <div className="flex justify-between items-center bg-brand-orange/5 p-6 rounded-2xl border border-brand-orange/10">
                                    <div>
                                        <h2 className="text-2xl font-serif font-bold text-white mb-1">Tourism Spots</h2>
                                        <p className="text-white/40 text-xs">Managing {places.length} active destinations in Banjarmasin.</p>
                                    </div>
                                    <button 
                                        onClick={() => setIsAdding(!isAdding)}
                                        className="bg-white text-black px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-meta flex items-center gap-2 hover:bg-brand-orange hover:text-white transition-all"
                                    >
                                        <Plus size={14} /> {isAdding ? 'Cancel' : 'Add Spot'}
                                    </button>
                                </div>

                                {isAdding && (
                                    <div className="bg-white/10 border border-brand-orange/20 p-8 rounded-3xl space-y-6">
                                        <h3 className="font-bold text-brand-orange uppercase text-xs tracking-meta">New Destination</h3>
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <input 
                                                placeholder="Spot Name" 
                                                value={newPlace.name}
                                                onChange={e => setNewPlace({...newPlace, name: e.target.value})}
                                                className="bg-black/50 border border-white/10 p-4 rounded-xl text-sm focus:outline-none focus:border-brand-orange" 
                                            />
                                            <select 
                                                value={newPlace.category}
                                                onChange={e => setNewPlace({...newPlace, category: e.target.value})}
                                                className="bg-black/50 border border-white/10 p-4 rounded-xl text-sm focus:outline-none focus:border-brand-orange"
                                            >
                                                <option value="Budaya">Budaya</option>
                                                <option value="Alam">Alam</option>
                                                <option value="Sejarah">Sejarah</option>
                                                <option value="Modern">Modern</option>
                                            </select>
                                            <input 
                                                placeholder="Image URL" 
                                                value={newPlace.image}
                                                onChange={e => setNewPlace({...newPlace, image: e.target.value})}
                                                className="bg-black/50 border border-white/10 p-4 rounded-xl text-sm focus:outline-none focus:border-brand-orange" 
                                            />
                                            <div className="flex gap-4">
                                                <input 
                                                    type="number" placeholder="Lat" 
                                                    value={newPlace.lat}
                                                    onChange={e => setNewPlace({...newPlace, lat: parseFloat(e.target.value)})}
                                                    className="bg-black/50 border border-white/10 p-4 rounded-xl text-sm w-full" 
                                                />
                                                <input 
                                                    type="number" placeholder="Lng" 
                                                    value={newPlace.lng}
                                                    onChange={e => setNewPlace({...newPlace, lng: parseFloat(e.target.value)})}
                                                    className="bg-black/50 border border-white/10 p-4 rounded-xl text-sm w-full" 
                                                />
                                            </div>
                                        </div>
                                        <textarea 
                                            placeholder="Description" 
                                            value={newPlace.description}
                                            onChange={e => setNewPlace({...newPlace, description: e.target.value})}
                                            className="w-full bg-black/50 border border-white/10 p-4 rounded-xl text-sm h-24" 
                                        />
                                        <button 
                                            onClick={handleAddPlace}
                                            className="w-full bg-brand-orange py-4 rounded-xl font-bold uppercase text-xs tracking-meta"
                                        >
                                            Confirm Addition
                                        </button>
                                    </div>
                                )}

                                <div className="grid gap-6">
                                    {places.map((place) => (
                                        <div key={place.id} className="bg-black/40 border border-white/5 p-6 rounded-2xl flex flex-col md:flex-row gap-8 items-start md:items-center group">
                                            <div className="w-full md:w-24 h-24 rounded-xl overflow-hidden border border-white/10">
                                                <img src={place.image} alt={place.name} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                            <div className="flex-1 space-y-4 w-full">
                                                <div className="grid md:grid-cols-2 gap-4">
                                                    <div className="space-y-1">
                                                        <label className="text-[9px] font-mono uppercase text-white/20 tracking-meta">Name</label>
                                                        <input 
                                                            type="text" 
                                                            value={place.name} 
                                                            onChange={(e) => updatePlace(place.id, { name: e.target.value })}
                                                            className="w-full bg-transparent border-b border-white/10 py-1 font-bold text-sm focus:outline-none focus:border-brand-orange transition-all"
                                                        />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <label className="text-[9px] font-mono uppercase text-white/20 tracking-meta">Category</label>
                                                        <select 
                                                            value={place.category}
                                                            onChange={(e) => updatePlace(place.id, { category: e.target.value })}
                                                            className="w-full bg-transparent border-b border-white/10 py-1 font-bold text-sm focus:outline-none focus:border-brand-orange transition-all"
                                                        >
                                                            <option className="bg-[#111]" value="Budaya">Budaya</option>
                                                            <option className="bg-[#111]" value="Alam">Alam</option>
                                                            <option className="bg-[#111]" value="Sejarah">Sejarah</option>
                                                            <option className="bg-[#111]" value="Modern">Modern</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <button 
                                                onClick={() => deletePlace(place.id)}
                                                className="p-4 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'narrative' && (
                            <motion.div 
                                key="narrative"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                <div className="bg-brand-orange/5 p-6 rounded-2xl border border-brand-orange/10 mb-8">
                                    <h2 className="text-2xl font-serif font-bold text-white mb-1">Culture Narratives</h2>
                                    <p className="text-white/40 text-xs">Update the poetic storytelling across the platform.</p>
                                </div>

                                {cultureNarrative.map((item, idx) => (
                                    <div key={item.id} className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-[10px] font-mono text-brand-orange uppercase tracking-meta">Section Block {idx + 1}</span>
                                        </div>
                                        <textarea 
                                            value={item.text}
                                            onChange={(e) => updateNarrative(item.id, e.target.value)}
                                            rows={3}
                                            className="w-full bg-black/40 border border-white/10 rounded-2xl p-6 text-gray-400 focus:text-white focus:outline-none focus:ring-1 focus:ring-brand-orange/50 transition-all font-serif italic text-lg leading-relaxed"
                                        />
                                    </div>
                                ))}
                            </motion.div>
                        )}

                        {activeTab === 'stats' && (
                            <motion.div 
                                key="stats"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                <div className="bg-brand-orange/5 p-6 rounded-2xl border border-brand-orange/10 mb-8">
                                    <h2 className="text-2xl font-serif font-bold text-white mb-1">Modern Stats</h2>
                                    <p className="text-white/40 text-xs">Manage Smart City performance metrics.</p>
                                </div>

                                <div className="grid md:grid-cols-2 gap-8">
                                    {cityStats.map((stat) => (
                                        <div key={stat.label} className="bg-black/40 border border-white/10 p-8 rounded-3xl space-y-6">
                                            <div className="flex justify-between items-center">
                                                <h3 className="font-bold text-white/60">{stat.label}</h3>
                                                <div className={`w-3 h-3 rounded-full ${stat.color} shadow-[0_0_10px_currentColor]`} />
                                            </div>
                                            <div className="flex items-end gap-2">
                                                <input 
                                                    type="number" 
                                                    step="0.1"
                                                    value={stat.value}
                                                    onChange={(e) => updateStat(stat.label, parseFloat(e.target.value))}
                                                    className="bg-transparent border-b border-white/20 text-4xl font-bold w-32 focus:outline-none focus:border-brand-orange transition-all"
                                                />
                                                <span className="text-white/20 font-bold mb-1">/ {stat.max}</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                                <div 
                                                    className={`h-full ${stat.color} transition-all duration-700`}
                                                    style={{ width: `${(stat.value / stat.max) * 100}%` }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default AdminCommandCenter;
