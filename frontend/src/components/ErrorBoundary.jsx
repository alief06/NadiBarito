import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("NADIBARITO Runtime Error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-[#050505] flex items-center justify-center px-6 text-center">
                    <div className="max-w-md space-y-8">
                        <div className="relative inline-block">
                            <div className="absolute inset-0 bg-red-500/20 blur-3xl rounded-full" />
                            <AlertTriangle size={80} className="text-red-500 relative z-10 mx-auto" />
                        </div>
                        
                        <div className="space-y-4">
                            <h1 className="text-4xl font-serif font-bold text-white">Gangguan Visual</h1>
                            <p className="text-white/40 font-serif italic text-lg leading-relaxed">
                                "Terkadang arus sungai terlalu deras untuk dimuat." <br/>
                                Terjadi kesalahan saat memproses elemen visual 3D atau interaktif.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button 
                                onClick={() => window.location.reload()}
                                className="flex items-center justify-center gap-3 bg-white text-black font-bold py-4 px-8 rounded-2xl uppercase text-[10px] tracking-widest hover:bg-[#f97316] hover:text-white transition-all shadow-2xl"
                            >
                                <RefreshCw size={16} /> Muat Ulang Koordinat
                            </button>
                            <a 
                                href="/"
                                className="flex items-center justify-center gap-3 border border-white/10 text-white font-bold py-4 px-8 rounded-2xl uppercase text-[10px] tracking-widest hover:bg-white/5 transition-all"
                            >
                                <Home size={16} /> Kembali ke Pusat
                            </a>
                        </div>
                        
                        <p className="text-[10px] text-white/20 font-mono tracking-tighter uppercase">
                            Error Code: BARITO_RENDER_SWIFT_FAILURE
                        </p>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
