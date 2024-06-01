import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/LoginPage.css";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../global-const.js";
import { logout } from "../actions/auth.js";

export const Profile = () => {
    const { user: currentUser } = useSelector((state) => state.auth);
    //const headers = {Authorization: `Bearer ${currentUser.token}`};

    const dispatch = useDispatch();
    const logoutHandler = () => {
        dispatch(logout());
    };


    if (!currentUser) {
        return <Navigate to="/signin" />;
    }
    return (
        <>
            <div className={"loginpage"}>
                <div className="container">
                    <div className="screen">
                        <div className="screen__content">
                            <form className="login">
                                <h3>Привет, </h3>
                                <div className="login__field">
                                    <i className="login__icon fas fa-user" />
                                    <input type="text" className="login__input" placeholder="Никнейм"
                                        value={currentUser.login} />
                                </div>
                                <br />
                                <button type="submit" onClick={() => logoutHandler()} className="custom-btn btn-4" style={{ padding: '3px 12px', fontSize: '15px', width: '270px' }}> ВЫЙТИ
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
