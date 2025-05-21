import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import CoverPage from './coverpage.jsx'; // ✅ Fix the import casing

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <>
      <CoverPage />
      <App />
    </>
  </StrictMode>
);
