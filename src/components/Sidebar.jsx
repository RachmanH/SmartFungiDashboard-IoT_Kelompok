import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, History, BarChart3, Settings } from 'lucide-react';

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/riwayat', label: 'Riwayat', icon: History },
  { to: '/analitik', label: 'Analitik', icon: BarChart3 },
  { to: '/pengaturan', label: 'Pengaturan', icon: Settings },
];

export default function Sidebar({ desktopOpen, mobileOpen, onCloseMobile }) {
  const location = useLocation();
  const labelClass = mobileOpen
    ? 'opacity-100 w-auto md:opacity-0 md:w-0 md:overflow-hidden'
    : desktopOpen
      ? 'opacity-100 w-auto'
      : 'opacity-0 w-0 overflow-hidden';
  const expandedClass = mobileOpen
    ? 'px-4 justify-start md:px-3 md:justify-center'
    : desktopOpen
      ? 'px-4 justify-start'
      : 'px-3 justify-center';
  const contentPadding = mobileOpen
    ? 'px-3 md:px-2'
    : desktopOpen
      ? 'px-3'
      : 'px-2';

  return (
    <>
      {/* Mobile backdrop overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={`
          fixed md:sticky top-0 z-40 h-screen
          flex flex-col shrink-0
          bg-white dark:bg-neutral-950 border-r-4 border-black dark:border-violet-200
          dark:shadow-[4px_0px_0px_0px_rgba(221,214,254,0.14)]
          transition-all duration-300 ease-in-out
          w-64 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 ${desktopOpen ? 'md:w-64' : 'md:w-20'}
        `}
      >
        {/* Logo section */}
        <div className={`
          h-14 min-h-14 border-b-4 border-black dark:border-violet-200
          flex items-center px-4
          ${mobileOpen ? 'justify-start md:justify-center' : desktopOpen ? 'justify-start' : 'justify-center'}
          overflow-hidden
        `}>
          <div className="flex items-center gap-2 overflow-hidden transition-all duration-300">
            <span className="text-2xl shrink-0">🍄</span>
            <span className={`font-black text-lg text-black dark:text-violet-50 tracking-tight whitespace-nowrap transition-all duration-200 ${labelClass}`}>
              SmartFungi
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 overflow-y-auto overflow-x-hidden">
          <div className={`space-y-2 ${contentPadding}`}>
            {navItems.map(({ to, label, icon: Icon }) => {
              const active = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  onClick={onCloseMobile}
                  className={`
                    flex items-center gap-3 py-3 font-bold border-2 border-black dark:border-violet-200 rounded-xl
                    transition-all duration-150 active:scale-95
                    ${expandedClass}
                    ${active
                      ? 'bg-yellow-300 dark:bg-violet-300 text-black shadow-neo-sm dark:shadow-[2px_2px_0px_0px_rgba(221,214,254,0.3)]'
                      : 'bg-white dark:bg-neutral-900 text-black dark:text-violet-50 hover:bg-cream-200 dark:hover:bg-violet-950'
                    }
                  `}
                  title={!desktopOpen ? label : undefined}
                >
                  <Icon size={20} className="shrink-0" />
                  <span
                    className={`whitespace-nowrap transition-all duration-200 ${labelClass}`}
                  >
                    {label}
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className={`
          py-4 border-t-4 border-black dark:border-violet-200
          ${mobileOpen ? 'px-4 md:px-2' : desktopOpen ? 'px-4' : 'px-2'}
          transition-all duration-300
        `}>
          <div className={`
            text-xs font-bold text-gray-500 dark:text-violet-200/70 uppercase tracking-wider text-center
            ${mobileOpen ? 'block md:hidden' : desktopOpen ? 'block' : 'hidden'}
          `}>
            Smart Fungi v1.0
          </div>
        </div>
      </aside>
    </>
  );
}
