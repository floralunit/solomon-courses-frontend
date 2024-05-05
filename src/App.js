import React from 'react';
import './styles/App.css';
import {Navbar} from './components/Navbar';
import {BrowserRouter, Route,  Routes, Navigate} from 'react-router-dom';
import {LoginPage} from "./pages/LoginPage";
import {RegisterPage} from "./pages/RegisterPage";
import {Profile} from "./pages/Profile";
import CoursesPage from "./pages/CoursesPage/CoursesPage";

function App() {
  return (
      <BrowserRouter>
          <Navbar/>
          <Routes>
              {/* <Route path="/" element={<Navigate to="about" replace />} /> */}
              <Route path='/' element={<CoursesPage/>}/>
              <Route path='signin' element={<LoginPage/>}/>
              <Route path='signup' element={<RegisterPage/>}/>
              <Route path='profile' element={<Profile/>}/>
              <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
