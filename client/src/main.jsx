import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import {Layout} from './layouts/Layout'
import {CartProvider} from './context/CartProvider'
import './index.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



ReactDOM.createRoot(document.getElementById('root')).render(
  
  <BrowserRouter>
   <CartProvider>
    <Layout>
      <App />
    </Layout>
    </CartProvider>
  </BrowserRouter>
)
