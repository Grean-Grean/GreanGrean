import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header';
import Footer from './components/Footer';

import Main from './components/main/Main';
import Shop from './components/shop/shop';
import ProductDetail from './components/shop/ProductDetail';

import RouteTest from './components/RouteTest';

function App() {
  return (
    <BrowserRouter>
      <div className="App" >
        <Header />

        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/product/:id' element={<ProductDetail />} />
        </Routes>

        <RouteTest />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
