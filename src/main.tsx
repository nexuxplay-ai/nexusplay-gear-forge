import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById("root")!).render(<App />);

// Enhanced PWA Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/serviceWorker.js', {
        scope: '/'
      });
      console.log('✅ Service Worker registered:', registration.scope);
    } catch (error) {
      console.error('❌ SW registration failed:', error);
    }
  });
}