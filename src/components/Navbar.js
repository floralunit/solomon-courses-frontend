
import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import "../styles/Navbar.css";
import { logout } from "../actions/auth";
import { FaRegUserCircle, FaSignInAlt } from "react-icons/fa";
import { TbSchool } from "react-icons/tb";

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
        <a href="/" className="logo">
          <TbSchool style={{ margin: '0 10px 0 0' }} />
          Solomon courses
        </a>

        <nav className="nav">
          <ul className="nav__list">
            <li className="nav__item">
              <a className="nav__link" href="/">Все курсы</a>
            </li>
            {currentUser ? (
              <>
                <li className="nav__item">
                  <a className="nav__link" href="/my-courses">Мои курсы</a>
                </li>
                <li className="nav__item">
                  <a href="/profile" ><FaRegUserCircle size={20} /></a>
                </li>
              </>

            ) :
              <li className="nav__item">
                <a href="/signin"><FaSignInAlt /></a>
              </li>}
          </ul>
        </nav>
      </div>
    </header>

  );
}
export default Navbar;
