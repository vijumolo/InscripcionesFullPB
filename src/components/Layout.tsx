
import { Link, Outlet } from 'react-router-dom';
import logo from '../assets/logo.png';

export const Layout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img src={logo} alt="TCT Colombia" className="h-12 w-auto" />
                        <span className="font-bold text-xl tracking-tight text-slate-900 hidden sm:block">RegistroEventos</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link
                            to="/"
                            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                        >
                            Inscripciones
                        </Link>
                        <Link
                            to="/admin"
                            className="inline-flex items-center rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                        >
                            Admin
                        </Link>
                    </div>
                </div>
            </header>

            <main className="flex-grow">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
                    <Outlet />
                </div>
            </main>

            <footer className="bg-slate-900 text-slate-300 py-8 text-center mt-auto">
                <div className="max-w-7xl mx-auto px-4">
                    <p className="text-sm">
                        © {new Date().getFullYear()} TCT Colombia, Innovando el cronometraje electrónico colombiano.
                    </p>
                </div>
            </footer>
        </div>
    );
};
