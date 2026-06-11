import { AppProvider } from './contexts/AppContext';
import AppRoutes from './routes';

export default function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}
