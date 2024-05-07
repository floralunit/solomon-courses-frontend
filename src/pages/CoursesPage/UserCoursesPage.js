import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../styles/LoginPage.css";
import "./course-card.css";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../global-const.js";
import courses from "../../jsons/courses.json";
import { logout } from "../../actions/auth.js";

export default function UserCoursesPage() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState([]);

    const dispatch = useDispatch();

    const { user: currentUser } = useSelector((state) => state.auth);

    const logoutHandler = () => {
        dispatch(logout());
    };

    
    useEffect(() => {
        fetch(`${API_URL}/course?user_id=${currentUser.id}`)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setData(result);
                },
                // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
                // чтобы не перехватывать исключения из ошибок в самих компонентах.
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    if (error) {
        return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
        return <div className={"loadingDiv"}>
            {/* <ReactLoading type={"spinningBubbles"} color={"#673923"} height={'5%'} width={'5%'} className={"loadingBar"} /> */}
            loading
        </div>;
    } else {
        return (
            <div>
                <div style={{ display: "flex", flexWrap: 'wrap', justifyContent: 'center' }}>
                    {data.map(item =>
             <div className="wrapper">
                <div className="product-img">
                    <img src={require('./course-image.jpg')}/>
                </div>
                <div className="product-info">
                    <div className="product-text">
                        <h1>{item.title}</h1>
                        <h2>{item.author}</h2>
                        <p>{item.description}</p>
                        </div>
                            <div className="product-price-btn">
                            <p><span>{item.price}</span>$</p>
                                <button type="button">Записаться</button>
                            </div>
                        </div>
                        </div>
                    )}
            </div>

            </div>
        );
    }
}
