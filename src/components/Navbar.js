
import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import "../styles/Navbar.css";
import { logout } from "../actions/auth";

import { useDispatch, useSelector } from "react-redux";


export function Navbar() {
  const [dropdown, setDropdown] = useState(false);
  const dispatch = useDispatch();


  const { user: currentUser } = useSelector((state) => state.auth);

  const logoutHandler = () => {
    dispatch(logout());
  };


  return (
    <header className="header">
      <div className="header__content">
        <a href="#" className="logo">
          <img className="logo__img" src={require('../resources/trollface.png')} alt="logo" />
          Solomon Project
        </a>

        <nav className="nav">
          <ul className="nav__list">
            <li className="nav__item">
              <a className="nav__link" href="/">Все курсы</a>
            </li>
            {currentUser ? (
              <>
                <li className="nav__item">
                  <a className="nav__link" href="/">Мои курсы</a>
                </li>
                <li className="nav__item">
                  <a className="btn" style={{ color: 'black' }} href="/signin">{currentUser.username}</a>
                </li>
              </>

            ) :
              <li className="nav__item">
                <a className="btn" style={{ color: 'black' }} href="/signin">Войти</a>
              </li>}
          </ul>
        </nav>
      </div>
    </header>

  );
}
export default Navbar;
