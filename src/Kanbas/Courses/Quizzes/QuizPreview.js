import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as client from "./client";
import "./QuizPreviewScreen.css";

export default function QuizPreviewScreen({ userRole }) {
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const { cid, quizId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const fetchedQuiz = await client.findQuizById(cid, quizId);

        // Set each question's points to 1
        if (fetchedQuiz && fetchedQuiz.questions) {
          fetchedQuiz.questions = fetchedQuiz.questions.map((question) => ({
            ...question,
            points: 1,
          }));
        }

        setQuiz(fetchedQuiz);
        if (fetchedQuiz.answers) {
          setAnswers(fetchedQuiz.answers);
        }
      } catch (error) {
        console.error("Error fetching quiz:", error);
      }
    };
    fetchQuiz();
  }, [cid, quizId]);

  const handleAnswerChange = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const calculateScore = () => {
    if (!quiz || !quiz.questions) return 0;

    let score = 0;
    quiz.questions.forEach((question) => {
      if (question.correctAnswer === answers[question._id]) {
        score += 1; // Add 1 point for each correct answer
      }
    });
    return score;
  };

  const handleSubmit = async () => {
    const calculatedScore = calculateScore();
    setScore(calculatedScore);

    await client.updateQuiz(cid, quizId, { answers });
  };

  const handleEdit = () => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${quizId}/Edit`, {
      state: { quiz },
    });
  };

  return (
    <div className="quiz-preview-container">
      {quiz && (
        <>
          <div className="quiz-header">
            <h1>{quiz.title}</h1>
            <div className="quiz-metadata">
              <p>
                Due <strong>{new Date(quiz.dueDate).toLocaleString()}</strong>
              </p>
              <p>
                Points <strong>{quiz.questions.length}</strong>
              </p>
              <p>
                Questions <strong>{quiz.questions.length}</strong>
              </p>
              <p>
                Available{" "}
                <strong>{new Date(quiz.availableDate).toLocaleString()}</strong>
              </p>
              <p>
                Time Limit <strong>{quiz.timeLimit} Minutes</strong>
              </p>
            </div>
          </div>

          <div className="attempt-history">
            <h2>Attempt History</h2>
            <table>
              <thead>
                <tr>
                  <th>Attempt</th>
                  <th>Time</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Attempt 1</td>
                  <td>12 minutes</td>
                  <td>
                    {score !== null
                      ? `${score} out of ${quiz.questions.length}`
                      : "Not yet submitted"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="quiz-questions">
            {quiz.questions.map((question, index) => (
              <div key={question._id} className="question-block">
                <div className="question-header">
                  <span>Question {index + 1}</span>
                  <span>1/1 pts</span>
                </div>
                <p>{question.question}</p>
                {question.options.map((option) => {
                  const isCorrect = question.correctAnswer === option.value;
                  const isSelected = answers[question._id] === option.value;
                  const optionClass = isCorrect
                    ? "correct-option"
                    : isSelected && !isCorrect
                    ? "incorrect-option"
                    : "";

                  return (
                    <label
                      key={option.value}
                      className={`answer-option ${optionClass}`}
                    >
                      <input
                        type="radio"
                        name={`question-${question._id}`}
                        value={option.value}
                        checked={isSelected}
                        onChange={() =>
                          handleAnswerChange(question._id, option.value)
                        }
                        disabled={score !== null}
                      />
                      {option.value}
                    </label>
                  );
                })}
              </div>
            ))}
          </div>

          <div className="button-group">
            <button
              className="btn light-grey-button"
              onClick={handleSubmit}
              disabled={score !== null}
            >
              Submit
            </button>
            <button className="btn light-grey-button" onClick={handleEdit}>
              Edit Quiz
            </button>
          </div>

          {score !== null && (
            <div className="score-display">
              <h2>
                Your Score: {score}/{quiz.questions.length}
              </h2>
            </div>
          )}
        </>
      )}
    </div>
  );
}
