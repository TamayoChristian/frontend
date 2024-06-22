import React from 'react';
import './App.css';
import Home from './components/Home';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import ProductProvider from './context/ProductContext';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <ProductProvider>
          <Home />
        </ProductProvider>
      </UserProvider>
    </BrowserRouter>

  );
}

export default App;
