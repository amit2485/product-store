
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Contact from './components/Contact';
import Products from './components/Products';
import { useState } from 'react';
import Specification from './components/Specification';

function App() {

  const[isLoggedIn, setIsLoggedIn] = useState(false)
  return (
    <div>
      <BrowserRouter>
      <Header isLoggedIn = {isLoggedIn} setIsLoggedIn = {setIsLoggedIn} />
        <Routes>
          <Route path="/" element={<Home isLoggedIn = {isLoggedIn}/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/products" element={isLoggedIn ?  <Products/> : <Navigate to="/"/>}/>
          <Route path="/products/:id" element = {<Specification/>}/>
          <Route path="*" element={<h1>Page not found</h1>}/>

          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
