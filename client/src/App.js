import React, { useState } from 'react';
import HomePage from './page/home';
import LoginForm from './page/login';
import SignupForm from './page/signup';

function App() {
  // Possible values: 'home', 'login', 'signup'
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <>
      {currentPage === 'home' && (
        <HomePage
          onLoginClick={() => setCurrentPage('login')}
          onSignupClick={() => setCurrentPage('signup')}
        />
      )}
      {currentPage === 'login' && (
        <LoginForm onBack={() => setCurrentPage('home')} />
      )}
      {currentPage === 'signup' && (
        <SignupForm onBack={() => setCurrentPage('home')} />
      )}
    </>
  );
}

export default App;
