import { useEffect } from 'react';
import { useApp } from '../contexts/AppContext';

export function useDarkMode() {
  const { darkMode } = useApp();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return darkMode;
}
