import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import api from "../../services/api.js";
import { logout } from "../../actions/auth.js";
import "./list.css"
import "./course.css"
import { FiChevronDown } from 'react-icons/fi';
import { FiChevronUp } from 'react-icons/fi';
import { TbArrowBackUp } from 'react-icons/tb';
import { IoCaretDownOutline, IoCaretUpOutline } from "react-icons/io5";

export const CoursePage = (props) => {
    const params = useParams();
    const id = parseInt(params.id);

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [course, setCourse] = useState([]);

    const dispatch = useDispatch();

    const { user: currentUser } = useSelector((state) => state.auth);

    const logoutHandler = () => {
        dispatch(logout());
    };
    // const user = users.find((entry) => entry.id === id);
    // if (user === undefined) {
    //   return <p>User not found</p>;
    // }

    useEffect(() => {
        api.get(`/course/${id}?all-info=true`)
            .then(res => {
                setIsLoaded(true);
                setCourse(res.data);
            })
            .catch(error => {
                console.error(error);
                setIsLoaded(true);
                setError(error);
            });
    }, [id]); // Выполнить useEffect только при изменении id

    const handleOpenCourse = (courseId) => {
        alert(`Вы успешно открыли курс с ID ${courseId}!`);
    };
    const [selectedChapter, setSelectedChapter] = useState(null);
    const [selectedLesson, setSelectedLesson] = useState(null);
    const [openChapters, setOpenChapters] = useState([]);

    const handleChapterClick = (chapter) => {
        if (openChapters.includes(chapter.id)) {
            setOpenChapters(openChapters.filter(id => id !== chapter.id));
        } else {
            setOpenChapters([...openChapters, chapter.id]);
        }
    };

    const handleLessonClick = (lesson) => {
        setSelectedLesson(lesson);
        setSelectedChapter(null);
    };

    if (error) {
        return <div>Ошибка: {error.message}</div>;
    } else if (isLoaded) {
        return (
            <div style={{ color: 'white' }}>
                <h1>{course.title}</h1>
                <h2>{course.description}</h2>


                <div className="container">
                    <div className="chapter-list">
                        <div className={"Parent"}>
                            <div className={"child1"}>
                                <h3>Главы</h3>
                                <li onClick={() => handleChapterClick(course.chapters[0])} style={{listStyleType:'none'}}>
                                                <div onClick={() => handleChapterClick(course.chapters[0])}>
                                                    {course.chapters[0].name}</div>
                                            </li>
                                <ol className="rectangle">
                                    {course.chapters.slice(1).map((chapter, index) => (
                                        <>
                                            <li onClick={() => handleChapterClick(chapter)}>
                                                <div onClick={() => handleChapterClick(chapter)} style={{ display: 'inline-block' }}>
                                                    {chapter.name} {openChapters.includes(chapter.id) ? <IoCaretUpOutline size={12} /> : <IoCaretDownOutline size={12} />}</div>
                                            </li>
                                            {openChapters.includes(chapter.id) && (
                                                <ol className="rectangle" style={{ margin: '0 0 0 40px' }}>
                                                    {chapter.lessons.map((lesson, index) => (
                                                        <li key={index} onClick={() => handleLessonClick(lesson)}>
                                                            {lesson.name}
                                                        </li>
                                                    ))}
                                                </ol>
                                            )}
                                        </>
                                    ))}
                                </ol>
                            </div>
                        </div>
                    </div>
                    <div className="info-section">
                        {selectedChapter && (
                            <div>
                                <h2>{selectedChapter.name}</h2>
                                <p>{selectedChapter.description}</p>
                            </div>
                        )}

                        {selectedLesson && (
                            <div>
                                <h3>{selectedLesson.name}</h3>
                                <p>{selectedLesson.text}</p>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        );
    }
}