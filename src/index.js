import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './Contexts/AuthContext';
import { CartContextProvider } from './Contexts/CartContext';
import { MinicartContextProvider } from './Contexts/MinicartContext';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <BrowserRouter>
     <AuthProvider>
      <CartContextProvider>
      <MinicartContextProvider>
        <App />
        </MinicartContextProvider>
      </CartContextProvider>     
      </AuthProvider>
      </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
