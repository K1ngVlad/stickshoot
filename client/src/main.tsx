import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { RootStoreProvider } from './providers/root-store-provider.tsx';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RootStoreProvider>
    <App />
  </RootStoreProvider>
);
