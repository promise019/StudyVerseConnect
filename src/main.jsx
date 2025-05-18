import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import AuthProvider from './app/Context/AuthContext.jsx'
import DropDownProvider from './app/Context/DropDownContext.jsx'

createRoot(document.getElementById('root')).render(
<AuthProvider>
<DropDownProvider>
  <BrowserRouter>
    <App />
  </BrowserRouter>
</DropDownProvider>
</AuthProvider>
)
