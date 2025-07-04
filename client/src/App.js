// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import AllProduct from './page/AllProduct';
// import AddProduct from './page/addproduct';
// import ViewProduct from './page/viewproduct';


import HomePage from './page/home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/viewproduct/:id" element={<ViewProduct />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
