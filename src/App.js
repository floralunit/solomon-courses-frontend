import React from 'react';
import './styles/App.css';
import {Navbar} from './components/Navbar';
import {BrowserRouter, Route,  Routes, Navigate} from 'react-router-dom';
import {LoginPage} from "./pages/LoginPage";
import {RegisterPage} from "./pages/RegisterPage";
import {Profile} from "./pages/Profile";
import AllCoursesPage from "./pages/CoursesPage/AllCoursesPage";
import UserCoursesPage from "./pages/CoursesPage/UserCoursesPage";
import {CoursePage} from "./pages/CoursePage/CoursePage";
import {TestPage} from "./pages/TestPage/TestPage";

function App() {
  return (
      <BrowserRouter>
          <Navbar/>
          <Routes>
              <Route path='/' element={<AllCoursesPage/>}/>
              <Route path='/my-courses' element={<UserCoursesPage/>}/>
              <Route  path="/course/:id" element={<CoursePage/>}/>
              <Route  path="/test/:id" element={<TestPage/>}/>
              <Route path='/signin' element={<LoginPage/>}/>
              <Route path='/signup' element={<RegisterPage/>}/>
              <Route path='profile' element={<Profile/>}/>
              <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
