import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { AuthProvider } from './context/AuthContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import TestReq from './pages/testReq.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
     <AuthProvider>
    <App />
     </AuthProvider>
      </BrowserRouter>
  </StrictMode>
);