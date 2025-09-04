import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

try {
  console.log('Starting app render...');
  const rootElement = document.getElementById('root');
  
  if (!rootElement) {
    throw new Error('Root element not found');
  }
  
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
  console.log('App rendered successfully');
} catch (error) {
  console.error('Failed to render app:', error);
  const rootElement = document.getElementById('root');
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="padding: 20px; text-align: center; font-family: Arial, sans-serif;">
        <h1>App Failed to Load</h1>
        <p>Error: ${error.message}</p>
        <button onclick="window.location.reload()" style="padding: 10px 20px; font-size: 16px;">Reload Page</button>
      </div>
    `;
  }
}
