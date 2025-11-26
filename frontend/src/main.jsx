import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { CartProvider } from './Context/CartContext.jsx'
import { LoadingProvider } from './Context/LoadingContext/LoadingContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LoadingProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </LoadingProvider>
  </StrictMode>
)
