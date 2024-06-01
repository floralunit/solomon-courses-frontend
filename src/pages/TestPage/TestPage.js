import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import api from "../../services/api.js";
import { Timer } from "../../components/timer.js";
import { IoClose, IoCheckmarkSharp } from "react-icons/io5";

export const TestPage = (props) => {
    const params = useParams();
    const id = parseInt(params.id);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [testEnd, setTestEnd] = useState(false);
    const [answers, setAnswers] = useState({});
    const [testData, setTestData] = useState([]);

    useEffect(() => {
        api.get(`/test/all-info?test_id=${id}`)
            .then(res => {
                setIsLoaded(true);
                setTestData(res.data);
            })
            .catch(error => {
                console.error(error);
                setIsLoaded(true);
                setError(error);
            });
    }, [id]); // Выполнить useEffect только при изменении id

    const handleAnswerChange = (questionId, answerId) => {
        setAnswers({ ...answers, [questionId]: answerId });
    };

    const handleSubmit = () => {
        // Подсчет правильных ответов
        let correctAnswers = 0;
        testData.questionList.forEach((question) => {
            const selectedAnswerId = answers[question.id];
            if (selectedAnswerId !== undefined) {
                const selectedAnswer = question.answerList.find((answer) => answer.id === selectedAnswerId);
                if (selectedAnswer && selectedAnswer.correct) {
                    correctAnswers++;
                }
            }
        });
        // Вывод результата пользователю
        alert(`Количество правильных ответов: ${correctAnswers}`);
        setTestEnd(true);
    };
    const handleTimerEnd = () => {
        alert('Время вышло!');
    };

    if (!isLoaded) {
        return <p>Данные не загружены</p>;
    } else
        return (
            <div style={{ display: 'flex', justifyContent: 'center', color: 'white' }}>
                <div className="info-section" style={{marginTop:'20px'}}>
                    <h1 style={{ textAlign: 'center' }}>{testData.name}</h1>
                    <Timer runTime={testData.runTime * 60} onTimerEnd={handleTimerEnd}></Timer>
                    {testData.questionList.map((question) => (
                        <div key={question.id}>
                            <h3>{question.quest}</h3>
                            {question.answerList.map((answer) => (
                                <div key={answer.id} style={{ fontSize: '15px' }}>
                                    {testEnd ?
                                        <>
                                            {answer.correct ? <IoCheckmarkSharp color={'green'} /> : <IoClose color={'red'} />}</>
                                        : <></>
                                    }
                                    <input
                                        type="radio"
                                        name={`question-${question.id}`}
                                        style={{ backgroundColor: 'black', color: 'black' }}
                                        value={answer.id}
                                        onChange={() => handleAnswerChange(question.id, answer.id)}
                                    />
                                    <label>{answer.quest}</label>
                                </div>
                            ))}
                            <br />
                        </div>
                    ))}
                    <button onClick={handleSubmit} className="custom-btn btn-4" style={{ padding: '3px 12px', fontSize: '10px' }}>ПРОВЕРИТЬ ОТВЕТЫ</button>
                    <br /><br />
                </div>
            </div>
        );
};