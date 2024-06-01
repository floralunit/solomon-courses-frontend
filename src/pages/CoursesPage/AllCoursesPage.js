import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../styles/LoginPage.css";
import "./course-card.css";
import { Navigate } from "react-router-dom";
import { API_URL } from "../../global-const.js";
import courses from "../../jsons/courses.json";
import api from "../../services/api.js";
import "../../styles/button.css"
import { FaCheck } from "react-icons/fa";

export default function CoursesPage() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [allCourses, setAllCourses] = useState([]);

    const { user: currentUser } = useSelector((state) => state.auth);
    api.get('/course')
        .then(res => {
            if (currentUser !== null) {
                api.get(`/course?user_id=${currentUser.id}`)
                    .then(res1 => {
                        const coursesWithSubscription = res.data.map(course => {
                            const isSubscribed = res1.data.some(userCourse => userCourse.id === course.id);
                            return { ...course, isUserSubscribed: isSubscribed };
                        });
                        setAllCourses(coursesWithSubscription);
                        setIsLoaded(true); // Установить флаг после успешного завершения всех запросов
                    })
                    .catch(error => {
                        console.error(error);
                        setError(error);
                        setIsLoaded(true); // Установить флаг только в случае ошибки
                    });
            } else {
                setAllCourses(res.data);
                setIsLoaded(true); // Установить флаг после успешного завершения всех запросов
            }
        })
        .catch(error => {
            console.error(error);
            setError(error);
            setIsLoaded(true); // Установить флаг только в случае ошибки
        })

    const handleSubscribe = (courseId) => {
        if (currentUser == null) {
            alert("Необходимо авторизоваться!");
            // props.history.push("/signin");
            // window.location.reload();
        }
        else {
            api.post(`/user/enroll?user_id=${currentUser.id}&course_id=${courseId}`)
                .then(res => {
                    alert(`Вы успешно записались на курс с ID ${courseId}!`);
                })
                .catch(error => {
                    console.error(error);
                    setError(error);
                    setIsLoaded(true); // Установить флаг только в случае ошибки
                })
        }
    };

    // useEffect(() => {
    //     if (data.length === 0) {
    //         setIsLoaded(true);
    //         setData(courses);
    //     };
    // })

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
                    {allCourses.map((item, idx) =>
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
                                {item.isUserSubscribed ? (
                                    <p className="subscribe-text"><FaCheck size={20} /></p>
                                ) : (
                                    <div className="product-price-btn">
                                        <p><span>{item.price}</span>₽</p>
                                        <button type="button" className="custom-btn btn-4" onClick={() => handleSubscribe(item.id)}>Купить</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

            </div>
        );
    }
}
