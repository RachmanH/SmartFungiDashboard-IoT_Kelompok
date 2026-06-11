import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, History, BarChart3, Settings, Moon, Sun } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { useDarkMode } from '../hooks/useDarkMode';

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/riwayat', label: 'Riwayat', icon: History },
  { to: '/analitik', label: 'Analitik', icon: BarChart3 },
  { to: '/pengaturan', label: 'Pengaturan', icon: Settings },
];

export default function Navbar() {
  const { toggleDarkMode } = useApp();
  useDarkMode();
  const location = useLocation();

  return (
    <nav className="bg-yellow-300 dark:bg-neutral-800 border-b-4 border-black dark:border-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 font-black text-xl tracking-tight text-black dark:text-white">
              <span className="text-3xl">🍄</span>
              <span>Smart Fungi Alert</span>
            </Link>
            <div className="hidden md:flex gap-1">
              {navItems.map(({ to, label, icon: Icon }) => {
                const active = location.pathname === to;
                return (
                  <Link
                    key={to}
                    to={to}
                    className={`flex items-center gap-2 px-4 py-2 text-sm font-bold border-2 border-black dark:border-white rounded-lg transition-transform hover:-translate-y-0.5 ${
                      active
                        ? 'bg-black text-yellow-300 dark:bg-yellow-300 dark:text-black shadow-neo-sm'
                        : 'bg-white dark:bg-neutral-900 text-black dark:text-white hover:bg-yellow-400 dark:hover:bg-neutral-700'
                    }`}
                  >
                    <Icon size={16} />
                    {label}
                  </Link>
                );
              })}
            </div>
          </div>

          <button
            onClick={toggleDarkMode}
            className="p-2 border-2 border-black dark:border-white rounded-lg bg-white dark:bg-neutral-900 text-black dark:text-white font-bold hover:bg-yellow-400 dark:hover:bg-neutral-700 transition-transform hover:-translate-y-0.5"
            title="Toggle dark mode"
          >
            <Moon size={18} className="hidden dark:block" />
            <Sun size={18} className="block dark:hidden" />
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <div className="md:hidden border-t-2 border-black dark:border-white">
        <div className="flex overflow-x-auto py-3 px-4 gap-2">
          {navItems.map(({ to, label, icon: Icon }) => {
            const active = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-1.5 px-3 py-2 text-sm font-bold border-2 border-black dark:border-white rounded-lg whitespace-nowrap transition-transform hover:-translate-y-0.5 ${
                  active
                    ? 'bg-black text-yellow-300 dark:bg-yellow-300 dark:text-black shadow-neo-sm'
                    : 'bg-white dark:bg-neutral-900 text-black dark:text-white'
                }`}
              >
                <Icon size={14} />
                {label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}