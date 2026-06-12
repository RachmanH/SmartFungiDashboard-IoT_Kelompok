import Sidebar from '../components/Sidebar';
import MuraiBird from '../components/MuraiBird';
import { Bird, Menu, Moon, Sun, PanelLeftClose } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { useDarkMode } from '../hooks/useDarkMode';
import { useSupabaseSensorData } from '../hooks/useSupabaseSensorData';

export default function MainLayout({ children }) {
  const {
    desktopSidebarOpen,
    toggleDesktopSidebar,
    mobileSidebarOpen,
    toggleMobileSidebar,
    closeMobileSidebar,
    toggleDarkMode,
  } = useApp();
  useDarkMode();
  useSupabaseSensorData();

  return (
    <div className="min-h-screen bg-cream-100 dark:bg-neutral-950 bird-shell flex text-gray-900 dark:text-violet-50">
      {/* Sidebar - uses sticky on desktop, fixed on mobile */}
      <Sidebar
        desktopOpen={desktopSidebarOpen}
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={closeMobileSidebar}
      />
      <MuraiBird />

      {/* Main content wrapper */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Top bar */}
        <header className="h-14 min-h-14 bg-yellow-300 dark:bg-neutral-900 border-b-4 border-black dark:border-violet-200 flex items-center justify-between px-4 shrink-0 z-20 dark:shadow-[0_4px_0px_0px_rgba(221,214,254,0.16)]">
          <div className="flex items-center gap-3">
            <button
              onClick={toggleMobileSidebar}
              className="p-2 rounded-lg neo-control hover:bg-yellow-400 dark:hover:bg-violet-950 transition-all active:scale-95 md:hidden"
              title={mobileSidebarOpen ? 'Sembunyikan sidebar' : 'Tampilkan sidebar'}
            >
              {mobileSidebarOpen ? <PanelLeftClose size={18} /> : <Menu size={18} />}
            </button>
            <button
              onClick={toggleDesktopSidebar}
              className="hidden md:inline-flex p-2 rounded-lg neo-control hover:bg-yellow-400 dark:hover:bg-violet-950 transition-all active:scale-95"
              title={desktopSidebarOpen ? 'Sembunyikan sidebar' : 'Tampilkan sidebar'}
            >
              {desktopSidebarOpen ? <PanelLeftClose size={18} /> : <Menu size={18} />}
            </button>
            <div className="hidden sm:flex items-center gap-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border-2 border-black dark:border-amber-100 bg-amber-200 dark:bg-amber-950 shadow-neo-sm dark:shadow-[2px_2px_0px_0px_rgba(253,230,138,0.22)]">
                <Bird size={19} className="text-black dark:text-amber-100" />
              </span>
              <div className="leading-tight">
                <p className="text-lg font-black text-black dark:text-violet-50 tracking-tight">Smart Fungi Alert</p>
                <p className="text-[11px] font-black uppercase tracking-wider text-black/60 dark:text-amber-100/75">Monitoring Kandang Murai</p>
              </div>
            </div>
          </div>

          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg neo-control hover:bg-yellow-400 dark:hover:bg-violet-950 transition-all active:scale-95"
            title="Toggle dark mode"
          >
            <Moon size={18} className="hidden dark:block" />
            <Sun size={18} className="block dark:hidden" />
          </button>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
