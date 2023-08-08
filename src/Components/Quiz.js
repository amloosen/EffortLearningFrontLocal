import React, { useState } from "react";
import "./style/quizStylesAdapt.css";
const Quiz = ({ onQuizEnd = () => {} }) => {
  const questions = [
    {
      questionText: "What determines the alien population size?",
      answerOptions: [
        { answerText: "One relevant instrument at a time.", isCorrect: true },
        { answerText: "Two instruments at a time.", isCorrect: false },
        {
          answerText: "All instruments add to the population size.",
          isCorrect: false,
        },
      ],
    },
    {
      questionText: "What are the challenges you need to master?",
      answerOptions: [
        {
          answerText:
						"Find out (1)  which instrument is determining the population size and (2) how it is associated with it.",
						isCorrect: false,
        },
        {
          answerText:
            "Find out (1) which instrument is determining the population size, (2) how it is associated with it and (3) how this changes.",
          isCorrect: true,
        },
        {
          answerText:
            "Find out (1) which two instruments is determining the population size,(2) how the slider is associated with it and (3) how this changes.",
          isCorrect: false,
        },
      ],
    },
    {
      questionText:
        "What does the peak (highest point) of the slider indicate?",
      answerOptions: [
        { answerText: "The population size you estimated.", isCorrect: true },
        {
          answerText: "Your certainty in the population size you estimated.",
          isCorrect: false,
        },
        { answerText: "Your accuracy.", isCorrect: false },
      ],
    },
    {
      questionText: "What does the width of the slider indicate?",
      answerOptions: [
        { answerText: "The population size you estimated.", isCorrect: false },
        {
          answerText: "Your certainty in the population size you estimated.",
          isCorrect: true,
        },
        { answerText: "Your accuracy.", isCorrect: false },
      ],
    },
    {
      questionText: "What determines the amount of reward you gain?",
      answerOptions: [
        {
          answerText:
            "The accuracy of your population size estimate and the certainty in it.",
          isCorrect: true,
        },
        {
          answerText: "The accuracy of your population size estimate.",
          isCorrect: false,
        },
        { answerText: "How quickly you respond.", isCorrect: false },
      ],
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(1);

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
      onQuizEnd(score);
    }
  };

  return (
    <div className="app">
      {showScore ? (
        <div className="score-section">
          You scored {score} out of {questions.length}
        </div>
      ) : (
        <>
          <div className="question-section">
            <div className="question-count">
              <span>Question {currentQuestion + 1}</span>/{questions.length}
            </div>
            <div className="question-text">
              {questions[currentQuestion].questionText}
            </div>
          </div>
          <div className="answer-section">
            {questions[currentQuestion].answerOptions.map((answerOption) => (
              <button className="button"
                onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}
              >
                {answerOption.answerText}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
