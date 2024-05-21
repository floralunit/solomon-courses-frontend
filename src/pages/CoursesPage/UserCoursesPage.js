import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../styles/LoginPage.css";
import "./course-card.css";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../global-const.js";
import courses from "../../jsons/courses.json";
import api from "../../services/api.js";
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

    api.get(`/course?user_id=${currentUser.id}`)
        .then(res => {
            setIsLoaded(true);
            setData(res.data);
        })
        .catch(error => {
            console.error(error);
            setIsLoaded(true);
            setError(error);
        });

        const handleOpenCourse = (courseId) => {
            alert(`Вы успешно открыли курс с ID ${courseId}!`);
        };

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
                    {data.map((item, idx) =>
                        <div className="wrapper" key={idx}>
                            <div className="product-img">
                                <img src={require('./course-image.jpg')} />
                            </div>
                            <div className="product-info">
                                <div className="product-text">
                                    <h1>{item.title}</h1>
                                    <h2>{item.author}</h2>
                                    <p>{item.description}</p>
                                </div>
                                <div className="product-price-btn">
                                    <Link  to={`/course/${item.id}`}>
                                   <button type="button" className="custom-btn btn-4" onClick={() => handleOpenCourse(item.id)}>Приступить</button>
                                   </Link>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        );
    }
}
