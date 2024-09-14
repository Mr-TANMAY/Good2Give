import React, { useState } from 'react';
import "../components/FoodWasteQuiz.css";

function FoodWasteQuiz() {
  const questions = [
    {
      question: "What percentage of food produced in India is wasted each year?",
      options: ["10%", "20%", "30%", "40%"],
      correctAnswer: "40%",
      explanation: "India wastes around 40% of the food it produces due to inefficient supply chains, lack of infrastructure, and improper storage."
    },
    {
      question: "How many people go hungry every day in India despite the food wastage?",
      options: ["100 million", "150 million", "200 million", "250 million"],
      correctAnswer: "200 million",
      explanation: "Despite the massive food production, around 200 million people go hungry in India every day."
    },
    {
      question: "What is the primary cause of food waste at the consumer level in India?",
      options: ["Overbuying", "Poor Storage", "Expiry Dates", "Spoilage"],
      correctAnswer: "Overbuying",
      explanation: "Overbuying is a major issue at the consumer level in India, leading to significant food waste due to purchasing more food than can be consumed."
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleNextQuestion = () => {
    if (selectedOption === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    setSelectedOption(null);
    setShowAnswer(false);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className="quiz-section">
      <div className="question-counter">
        Question {currentQuestion + 1}/{questions.length}
      </div>
      <h2>Test Your Knowledge: Food Waste in India</h2>
      {!showScore ? (
        <div className="question-card">
          <p>{questions[currentQuestion].question}</p>
          <div className="options">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className={`option-btn ${selectedOption === option ? 'selected' : ''}`}
                onClick={() => setSelectedOption(option)}
              >
                {option}
              </button>
            ))}
          </div>
          {!showAnswer && (
            <p className="instruction-text">Please select an option before submitting.</p>
          )}
          {selectedOption && !showAnswer && (
            <button
              className="submit-btn"
              onClick={() => setShowAnswer(true)}
            >
              Submit Answer
            </button>
          )}
          {showAnswer && (
            <div className="answer-section">
              {selectedOption === questions[currentQuestion].correctAnswer ? (
                <p className="correct">Correct!</p>
              ) : (
                <p className="incorrect">Incorrect, the correct answer is {questions[currentQuestion].correctAnswer}</p>
              )}
              <p className="explanation">{questions[currentQuestion].explanation}</p>
              <button className="next-btn" onClick={handleNextQuestion}>
                {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="score-section">
          <h2>Congratulations!</h2>
          <p className="score-text">Your final score is {score}/{questions.length}</p>
          <p className="feedback-text">
            {score === questions.length ? "Excellent job!" : score >= questions.length / 2 ? "Good effort!" : "Keep trying!"}
          </p>
        </div>
      )}
    </div>
  );
}

export default FoodWasteQuiz;
