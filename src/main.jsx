import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.jsx'
import {ProviderRouters} from "./components/routers/Routers.jsx";

createRoot(document.getElementById('root')).render(
  // <StrictMode>
      <ProviderRouters >
        <App />
      </ProviderRouters>
  // </StrictMode>
)
