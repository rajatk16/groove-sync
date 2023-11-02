import ReactDOM from 'react-dom/client';

import { Router } from '@/Router';
import { AuthProvider } from '@/context';

import '@/styles/global.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <AuthProvider>
    <Router />
  </AuthProvider>
)