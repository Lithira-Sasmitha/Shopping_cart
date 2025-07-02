import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


// // src/App.js
// import React, { useState } from 'react';
// // import HomePage from './page/home';
// // import LoginForm from './page/login';
// // import SignupForm from './page/signup';
// import AllProduct from './page/AllProduct';
// import AddProduct from './page/addproduct';
// import ProductDetails from './page/viewproduct';

// // function App() {
// //   const [currentPage, setCurrentPage] = useState('home');
// //   const [selectedProductId, setSelectedProductId] = useState(null); 

// //   const renderPage = () => {
// //     switch (currentPage) {
// //       case 'home':
// //         return (
// //           <HomePage
// //             onLoginClick={() => setCurrentPage('login')}
// //             onSignupClick={() => setCurrentPage('signup')}
// //             onProductListClick={() => setCurrentPage('productList')}
// //             onAddProductClick={() => setCurrentPage('addProduct')}
// //           />
// //         );
// //       case 'login':
// //         return <LoginForm onBack={() => setCurrentPage('home')} />;
// //       case 'signup':
// //         return <SignupForm onBack={() => setCurrentPage('home')} />;
// //       case 'productList':
// //         return (
// //           <AllProduct
// //             onBack={() => setCurrentPage('home')}
// //             onViewDetails={(id) => {
// //               setSelectedProductId(id);
// //               setCurrentPage('productDetails');
// //             }}
// //           />
// //         );
// //       case 'addProduct':
// //         return <AddProduct onBack={() => setCurrentPage('home')} />;
// //       case 'productDetails':
// //         return (
// //           <ProductDetails
// //             productId={selectedProductId}
// //             onBack={() => setCurrentPage('productList')}
// //           />
// //         );
// //       default:
// //         return <HomePage />;
// //     }
// //   };

// //   return <div className="App">{renderPage()}</div>;
// // }

// export default App;
