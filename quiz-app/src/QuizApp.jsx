import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

export default function QuizApp() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [isQuizOver, setIsQuizOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          "https://opentdb.com/api.php?amount=10&type=multiple"
        );

        if (response.data.results && response.data.results.length > 0) {
          setQuestions(response.data.results);
        }
      } catch (error) {
        console.log("Error while fetching questions : ", error);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    if (questions.length > 0) {
      setShuffledAnswers(shuffleAnswers(questions[currentQuestion]));
    }
  }, [currentQuestion, questions]);

  useEffect(() => {
    if (timeLeft === 0) {
      handleNextQuestion();
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const shuffleAnswers = (question) => {
    const answers = [...question.incorrect_answers, question.correct_answer];
    console.log(question.correct_answer);
    console.log(answers);
    return answers.sort(() => Math.random() - 0.5);
  };

  const handleAnswer = (selectedAnswer) => {
    if (selectedAnswer === questions[currentQuestion].correct_answer) {
      console.log("correct answer clicked");
      setScore((prev) => prev + 1);
    } else {
      console.log("wrong ans clicked");
    }
    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setTimeLeft(5);
    } else {
      setIsQuizOver(true);
    }
  };

  const handleSkipQuestion = () => {
    handleNextQuestion();
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setIsQuizOver(false);
    setQuestions([]);
    setTimeLeft(5);

    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          "https://opentdb.com/api.php?amount=10&type=multiple"
        );

        if (response.data.results && response.data.results.length > 0) {
          setQuestions(response.data.results);
        }
      } catch (error) {
        console.log("Error while fetching questions : ", error);
      }
    };

    fetchQuestions();
  };

  const decodeEntities = (str) => {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = str;
    return textarea.value;
  };

  if (isQuizOver) {
    return (
      <div className="text-center w-2xl border rounded mx-auto p-6 mt-10 bg-white">
        <h2 className="text-3xl font-bold">Quiz Over!</h2>
        <p className="text-xl mt-4">
          Your Score: {score}/{questions.length}
        </p>
        <button
          onClick={restartQuiz}
          className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
        >
          Restart Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl max-h-3xl my-auto mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white">
      {questions.length > 0 ? (
        <>
          <h2 className="text-2xl font-bold">Question {currentQuestion + 1}</h2>
          <p className="mt-4 text-lg">
            {decodeEntities(questions[currentQuestion].question)}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-4">
            {shuffledAnswers.map((answer, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(answer)}
                className="px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-600 cursor-pointer"
              >
                {decodeEntities(answer)}
              </button>
            ))}
          </div>

          <button
            onClick={handleSkipQuestion}
            className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 cursor-pointer"
          >
            Skip Question
          </button>

          <p className="mt-2 text-red-500 font-bold">Time left: {timeLeft}s</p>
        </>
      ) : (
        <p className="text-xl">Loading questions...</p>
      )}
    </div>
  );
}
