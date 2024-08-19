import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as client from "./client";
import "./QuizPreviewScreen.css";

export default function StartQuizScreen({ userRole }) {
  // Accept userRole as a prop
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const { cid, quizId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const fetchedQuiz = await client.findQuizById(cid, quizId);
        setQuiz(fetchedQuiz);
      } catch (error) {
        console.error("Error fetching quiz:", error);
      }
    };
    fetchQuiz();
  }, [cid, quizId]);

  const handleAnswerChange = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleSubmit = async () => {
    try {
      // Record the student's answers
      await client.recordStudentAnswers(cid, quizId, answers);
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };

  return (
    <div className="quiz-preview-container">
      {quiz && !submitted && (
        <>
          <h1>{quiz.title}</h1>
          <div className="quiz-questions">
            {quiz.questions.map((question, index) => (
              <div key={question._id} className="question-block">
                <div className="question-header">
                  <span>Question {index + 1}</span>
                  <span>1/1 pts</span>
                </div>
                <p>{question.question}</p>
                {question.options.map((option) => (
                  <label key={option.value}>
                    <input
                      type="radio"
                      name={`question-${question._id}`}
                      value={option.value}
                      onChange={() =>
                        handleAnswerChange(question._id, option.value)
                      }
                    />
                    {option.value}
                  </label>
                ))}
              </div>
            ))}
          </div>

          <div className="button-group">
            <button className="btn light-grey-button" onClick={handleSubmit}>
              Submit Quiz
            </button>
          </div>
        </>
      )}

      {submitted && (
        <div className="score-display">
          <h2>Your quiz has been submitted!</h2>
        </div>
      )}
    </div>
  );
}
