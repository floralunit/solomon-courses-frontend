import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import "../styles/LoginPage.css";
import {Navigate} from "react-router-dom";
import axios from "axios";
import {API_URL} from "../global-const.js";
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
                                            <i className="login__icon fas fa-user"/>
                                            <input type="text" className="login__input" placeholder="Никнейм"
                                                   value={currentUser.login}/>
                                        </div>
                                        <button className="button login__submit" type="submit" onClick={() => logoutHandler()}>
                                <span className="button__text">Выйти</span>
                                <i className="button__icon fas fa-chevron-right"/>
                            </button>
                                    </form>
                                </div>
                                <div className="screen__background">
                                    <span className="screen__background__shape screen__background__shape4"/>
                                    <span className="screen__background__shape screen__background__shape3"/>
                                    <span className="screen__background__shape screen__background__shape2"/>
                                    <span className="screen__background__shape screen__background__shape1"/>
                                </div>
                            </div>
                        </div>
                    </div>
        </>
    );
}
