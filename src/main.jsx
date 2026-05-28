import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { LoaderProvider } from './context/LoaderContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import ComingSoon from './components/services/ComingSoon.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <LoaderProvider>
           <App />
      </LoaderProvider>
    </AuthProvider>
  </StrictMode>,
)




