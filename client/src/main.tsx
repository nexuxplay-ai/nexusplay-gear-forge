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
      
      // Handle service worker updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New service worker available
              if (confirm('New version available! Reload to update?')) {
                newWorker.postMessage({ type: 'SKIP_WAITING' });
                window.location.reload();
              }
            }
          });
        }
      });
      
      // Listen for service worker messages
      navigator.serviceWorker.addEventListener('message', (event) => {
        console.log('Message from SW:', event.data);
      });
      
      // Request persistent storage for better offline experience
      if ('storage' in navigator && 'persist' in navigator.storage) {
        const isPersistent = await navigator.storage.persist();
        console.log(`Persistent storage: ${isPersistent ? 'granted' : 'denied'}`);
      }
      
    } catch (error) {
      console.error('❌ SW registration failed:', error);
    }
  });
}

// PWA Install Prompt Handler
let deferredPrompt: any;

window.addEventListener('beforeinstallprompt', (e) => {
  console.log('PWA install prompt available');
  e.preventDefault();
  deferredPrompt = e;
  
  // Show custom install button/banner
  const installBanner = document.createElement('div');
  installBanner.innerHTML = `
    <div style="position: fixed; top: 0; left: 0; right: 0; background: linear-gradient(135deg, #8b5cf6, #a855f7); color: white; padding: 12px; text-align: center; z-index: 1000; box-shadow: 0 2px 10px rgba(0,0,0,0.3);">
      <span style="margin-right: 15px;">📱 Install NexusPlay for the best experience!</span>
      <button id="install-button" style="background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.3); color: white; padding: 8px 16px; border-radius: 6px; cursor: pointer; margin-right: 10px;">Install</button>
      <button id="dismiss-button" style="background: transparent; border: 1px solid rgba(255,255,255,0.3); color: white; padding: 8px 16px; border-radius: 6px; cursor: pointer;">Later</button>
    </div>
  `;
  
  document.body.appendChild(installBanner);
  
  const installButton = document.getElementById('install-button');
  const dismissButton = document.getElementById('dismiss-button');
  
  installButton?.addEventListener('click', async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`PWA install outcome: ${outcome}`);
      deferredPrompt = null;
      installBanner.remove();
    }
  });
  
  dismissButton?.addEventListener('click', () => {
    installBanner.remove();
  });
});

// Track PWA installation
window.addEventListener('appinstalled', () => {
  console.log('✅ NexusPlay PWA was installed');
  deferredPrompt = null;
});
