import { Link, useLocation } from 'react-router-dom';
import { BarChart3, Bird, History, LayoutDashboard, Moon, Settings, Sun } from 'lucide-react';
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
    <nav className="bg-yellow-300 dark:bg-neutral-900 border-b-4 border-black dark:border-violet-200 dark:shadow-[0_4px_0px_0px_rgba(221,214,254,0.16)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 font-black text-xl tracking-tight text-black dark:text-violet-50">
              <span className="grid h-9 w-9 place-items-center rounded-xl border-2 border-black dark:border-amber-100 bg-amber-200 dark:bg-amber-950 shadow-neo-sm">
                <Bird size={19} />
              </span>
              <span>Murai Monitor</span>
            </Link>
            <div className="hidden md:flex gap-1">
              {navItems.map(({ to, label, icon: Icon }) => {
                const active = location.pathname === to;
                return (
                  <Link
                    key={to}
                    to={to}
                    className={`flex items-center gap-2 px-4 py-2 text-sm font-bold border-2 border-black dark:border-violet-200 rounded-lg transition-transform hover:-translate-y-0.5 ${
                      active
                        ? 'bg-black text-yellow-300 dark:bg-violet-300 dark:text-black shadow-neo-sm dark:shadow-[2px_2px_0px_0px_rgba(221,214,254,0.3)]'
                        : 'bg-white dark:bg-neutral-950 text-black dark:text-violet-50 hover:bg-yellow-400 dark:hover:bg-violet-950'
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
            className="p-2 rounded-lg neo-control hover:bg-yellow-400 dark:hover:bg-violet-950 transition-transform hover:-translate-y-0.5"
            title="Toggle dark mode"
          >
            <Moon size={18} className="hidden dark:block" />
            <Sun size={18} className="block dark:hidden" />
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <div className="md:hidden border-t-2 border-black dark:border-violet-200">
        <div className="flex overflow-x-auto py-3 px-4 gap-2">
          {navItems.map(({ to, label, icon: Icon }) => {
            const active = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-1.5 px-3 py-2 text-sm font-bold border-2 border-black dark:border-violet-200 rounded-lg whitespace-nowrap transition-transform hover:-translate-y-0.5 ${
                  active
                    ? 'bg-black text-yellow-300 dark:bg-violet-300 dark:text-black shadow-neo-sm dark:shadow-[2px_2px_0px_0px_rgba(221,214,254,0.3)]'
                    : 'bg-white dark:bg-neutral-950 text-black dark:text-violet-50'
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
