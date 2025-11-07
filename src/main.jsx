import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.jsx'
import {AppRouterProvider} from "./components/routers/Routers.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <AppRouterProvider >
        <App />
      </AppRouterProvider>
  </StrictMode>
)
