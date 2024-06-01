import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/LoginPage.css";
import { NavLink, useNavigate, Navigate } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { login } from "../actions/auth";

export const LoginPage = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { message } = useSelector(state => state.message);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();

        setLoading(true);

        await dispatch(login(username, password))
            .then(() => {
                //props.history.push("/profile");
                //<Navigate to="/profile" />;
                window.location.reload();
                navigate('/profile');
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const { isLoggedIn } = useSelector(state => state.auth);

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const transparentInputStyle = {
        backgroundColor: 'transparent', // Устанавливаем прозрачный фон
        border: 'none', // Убираем границу
        outline: 'none', // Убираем обводку при фокусе
        color: '#333' // Цвет текста
    };
    if (isLoggedIn) {
        return <Navigate to="/profile" />;
    }
    if (loading) {
        return <div>Грузится</div>;
    } else {
        return (
            <div className={"loginpage"}>
                <form className="login" onSubmit={submitHandler}>
                    <h2>Авторизация</h2>
                    <br />
                    <input type="text" className="login__input" placeholder="Логин"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} />
                    <br />
                    <input type="password" className="login__input" placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                    <br />
                    <button type="submit" className="custom-btn btn-4" style={{ padding: '3px 12px', fontSize: '15px', width: '270px' }}> ВОЙТИ
                    </button>
                    <br />
                    <div className="py-3">
                        <div>
                            Нет аккаунта? <a href="signup" style={{ color: 'white' }}>Зарегистрируйтесь</a>
                        </div>
                    </div>
                </form>
                {message ?
                    <ErrorMessage variant="danger">{message}</ErrorMessage> : <></>
                }
            </div>
        );
    }
}
