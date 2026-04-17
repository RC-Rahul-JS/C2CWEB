import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { LoaderProvider } from './context/LoaderContext.jsx'
import ComingSoon from './components/services/ComingSoon.jsx'

if ( window.location.pathname==='/dc'||window.location.pathname==='/privacy_policy'||
  window.location.pathname==='/c2c_assure'||window.location.pathname==='/nsp'||window.location.pathname==='/mp'
||window.location.pathname==='/bsp'||window.location.pathname==='/dp') {
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LoaderProvider>
         <App />
    </LoaderProvider>
  </StrictMode>,
)
}else if(window.innerWidth < 800){
window.location.href = 'https://app.care2connect.in/' 
// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <LoaderProvider>
//          <ComingSoon />
//     </LoaderProvider>
//   </StrictMode>,
// )
}
 else {

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LoaderProvider>
         <App />
    </LoaderProvider>
  </StrictMode>,
)
}



