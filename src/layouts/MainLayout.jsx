import Sidebar from '../components/Sidebar';
import { Menu, Moon, Sun, PanelLeftClose } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { useDarkMode } from '../hooks/useDarkMode';
import { useFirebaseSensorData } from '../hooks/useFirebaseSensorData';

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
  useFirebaseSensorData();

  return (
    <div className="min-h-screen bg-cream-100 dark:bg-neutral-900 flex">
      {/* Sidebar - uses sticky on desktop, fixed on mobile */}
      <Sidebar
        desktopOpen={desktopSidebarOpen}
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={closeMobileSidebar}
      />

      {/* Main content wrapper */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Top bar */}
        <header className="h-14 min-h-14 bg-yellow-300 dark:bg-neutral-800 border-b-4 border-black dark:border-white flex items-center justify-between px-4 shrink-0 z-20">
          <div className="flex items-center gap-3">
            <button
              onClick={toggleMobileSidebar}
              className="p-2 border-2 border-black dark:border-white rounded-lg bg-white dark:bg-neutral-900 text-black dark:text-white font-bold hover:bg-yellow-400 dark:hover:bg-neutral-700 transition-all active:scale-95 md:hidden"
              title={mobileSidebarOpen ? 'Sembunyikan sidebar' : 'Tampilkan sidebar'}
            >
              {mobileSidebarOpen ? <PanelLeftClose size={18} /> : <Menu size={18} />}
            </button>
            <button
              onClick={toggleDesktopSidebar}
              className="hidden md:inline-flex p-2 border-2 border-black dark:border-white rounded-lg bg-white dark:bg-neutral-900 text-black dark:text-white font-bold hover:bg-yellow-400 dark:hover:bg-neutral-700 transition-all active:scale-95"
              title={desktopSidebarOpen ? 'Sembunyikan sidebar' : 'Tampilkan sidebar'}
            >
              {desktopSidebarOpen ? <PanelLeftClose size={18} /> : <Menu size={18} />}
            </button>
            <span className="text-lg font-black text-black dark:text-white tracking-tight hidden sm:block">
              🍄 Smart Fungi Alert
            </span>
          </div>

          <button
            onClick={toggleDarkMode}
            className="p-2 border-2 border-black dark:border-white rounded-lg bg-white dark:bg-neutral-900 text-black dark:text-white font-bold hover:bg-yellow-400 dark:hover:bg-neutral-700 transition-all active:scale-95"
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
