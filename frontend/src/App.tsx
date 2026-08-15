import { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate, Routes, Route } from 'react-router-dom';

import './App.css'

import Home from './pages/Home/home';
import Login from './pages/auth/login';
import Signup from './pages/auth/signup';




function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect( () => {
    const checkAuth = async () => {
      try{
        const response = await axios.get(
          "http://localhost:3001/api/auth/me",
          {
            withCredentials: true
          }

        );
        setUser(response.data.user);


      } catch(err){
        setUser(null);
      }finally{
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if(loading){
    return <div> Loading...</div>;
  }

  // if(!user){
  //   return <Navigate to="/login" replace />
  // }


  return (
    
      <Routes>

        {/* Login page */}
        <Route path="/login"
        element={
          user? <Navigate to="/" replace /> : <Login /> 
        }
        />

        {/* Signup page */}
        <Route
          path="/signup"
          element={
            user ? <Navigate to="/" replace /> : <Signup />
          }
        />

        {/* Home page */}
        <Route
          path="/"
          element={
            user ? <Home /> : <Navigate to="/login" replace />
          }
        />

      </Routes>

  );



  // return (
    
  //     <Home></Home>
    
  // )
}

export default App
