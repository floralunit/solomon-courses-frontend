import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/auth";
import ErrorMessage from "../components/ErrorMessage";
import "../styles/LoginPage.css";
import { Col, Row } from "react-bootstrap";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { NotificationContainer, NotificationManager } from 'react-notifications';

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const vusername = (value) => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                The username must be between 3 and 20 characters.
            </div>
        );
    }
};

const vpassword = (value) => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 6 and 40 characters.
            </div>
        );
    }
};
export const RegisterPage = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();
    const [successful, setSuccessful] = useState(false);

    let { message } = useSelector(state => state.message);
    const [error, setError] = useState("");

    const dispatch = useDispatch();

    const handleRegister = (e) => {
        e.preventDefault();

        setSuccessful(false);
        if (password.length === 0 || confirmPassword.length === 0 || username.length === 0) {
            setError("Есть незаполненные поля!");
        } else if (password.length <= 6) {
            setError("Длина пароля должна быть больше 6 символов!");
        } else if (password !== confirmPassword) {
            setError("Пароли не совпадают");
        }
        else {
            dispatch(register(username, password))
                .then(() => {
                    setSuccessful(true);
                })
                .catch(() => {
                    setSuccessful(false);
                });
            navigate('/signin');
        }

    };
    return (
        <div className={"loginpage"}>
            <div className="container">
                <div className="screen">
                    <div className="screen__content">
                        <form className="login" onSubmit={handleRegister}>
                            <h2>Регистрация</h2>
                            <br />
                            <input type="text" className="login__input" placeholder="Никнейм"
                                value={username}
                                validations={[required, vusername]}
                                onChange={(e) => setUsername(e.target.value)} />
                            <br />
                            <input type="password" className="login__input" placeholder="Пароль"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                validations={[required, vpassword]} />
                            <br />
                            <input type="password" className="login__input" placeholder="Подтвердите пароль"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)} />
                            <br />
                            <button type="submit" className="custom-btn btn-4" style={{ padding: '3px 12px', fontSize: '15px', width: '270px' }}> Зарегистрироваться
                            </button>
                            <br />
                            <div className="py-3">
                                <div>
                                    Есть аккаунт? <a href="signin" style={{ color: 'white' }}>Авторизуйтесь</a>
                                </div>
                            </div>
                        </form>
                    </div>
                    {message ?
                        <ErrorMessage variant="danger">{message}</ErrorMessage>
                        :
                        error ?
                            <ErrorMessage variant="danger">{error}</ErrorMessage>
                            : null
                    }
                </div>
            </div>
        </div>
    );
}
