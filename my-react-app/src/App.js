import React, { useState } from 'react';
import './App.scss';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './screens/Home/Home';
import { Users } from './screens/Users/Users';
import { Profile } from './screens/MyProfil/Profile';
import { Navbar } from './composants/Navbar/Navbar';
import { Login } from './screens/Login/Login';
import { Register } from './screens/Register/Register';
import { MyCounters } from './screens/MyCounters/MyCounters';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem('user'))
  );

  return (
    <div className="App">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/users" element={<Users />} />
        <Route path="/user/:id" element={<Profile />} />
        <Route
          path="/register"
          element={<Register setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/myCounters" element={<MyCounters />} />
        {/* <Route path="*" element={<h1>404</h1>} /> */}
      </Routes>
    </div>
  );
}

export default App;
