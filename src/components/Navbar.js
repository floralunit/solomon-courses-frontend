
import React, { useState,useEffect } from "react";
import {Link, NavLink} from "react-router-dom";
import "../styles/Navbar.css";
import {logout} from "../actions/auth";

import { useDispatch, useSelector } from "react-redux";


export function Navbar() {
    const [dropdown, setDropdown] = useState(false);
    const dispatch = useDispatch();


    const { user: currentUser } = useSelector((state) => state.auth);

    const logoutHandler = () => {
        dispatch(logout());
    };


    return (
        <header class="header">
    <div class="header__content">
      <a href="#" class="logo"> 
        <img class="logo__img" src={require('../resources/trollface.png')} alt="logo"/>
        Solomon Project
      </a>
  
      <nav class="nav">
        <ul class="nav__list">
          <li class="nav__item">
            <a class="nav__link" href="#">Хз</a>
          </li>
          <li class="nav__item">
            <a class="nav__link" href="/">Все курсы</a>
          </li>
          <li class="nav__item">
            <a class="btn" style={{color:'black'}} href="/signin">Войти</a>
          </li>
        </ul>
      </nav>
    </div>
  </header>

    );
}
export default Navbar;
