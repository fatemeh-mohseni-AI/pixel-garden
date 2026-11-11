import { createRoot } from 'react-dom/client';
import '@fontsource/dm-sans/latin-400.css';
import '@fontsource/dm-sans/latin-600.css';
import '@fontsource/dm-sans/latin-700.css';
import '@fontsource/space-mono/latin-700.css';
import { App } from './App';
import './styles/garden.css';

createRoot(document.getElementById('root')!).render(<App />);
