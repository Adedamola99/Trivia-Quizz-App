import { useState, useEffect } from "react";
import IntroPage from "./Pages/IntroPage";
import LeaderboardPage from "./Pages/LeaderboardPage";
import QuizPage from "./Pages/QuizPage";
import ResultPage from "./Pages/ResultPage";
import SettingsPage from "./Pages/SettingsPage";
import { firebaseAPI } from "./utility/firebase";
import triviaAPI from "./utility/api";

function TriviaApp() {
  const [currentPage, setCurrentPage] = useState("home");
  const [gameSettings, setGameSettings] = useState({
    category: "any",
    difficulty: "any",
    type: "multiple",
    amount: 10,
  });
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [questionsPerPage, setQuestionsPerPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Load categories on mount
  useEffect(() => {
    const loadCategories = async () => {
      const cats = await triviaAPI.getCategories();
      setCategories(cats);
    };
    loadCategories();
  }, []);

  const startQuiz = async () => {
    setLoading(true);
    try {
      const fetchedQuestions = await triviaAPI.getQuestions(
        gameSettings.amount,
        gameSettings.category,
        gameSettings.difficulty,
        gameSettings.type
      );

      if (fetchedQuestions.length > 0) {
        setQuestions(fetchedQuestions);
        setUserAnswers(new Array(fetchedQuestions.length).fill(null));
        setCurrentQuestionIndex(0);
        setCurrentPage("quiz");
      } else {
        alert(
          "Failed to load questions. Please check your internet connection and try again."
        );
      }
    } catch (error) {
      console.error("Error starting quiz:", error);
      alert("An error occurred while loading questions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const loadLeaderboard = async () => {
    const scores = await firebaseAPI.getLeaderboard();
    setLeaderboard(scores);
  };

  const resetQuiz = () => {
    setCurrentPage("home");
    setQuestions([]);
    setUserAnswers([]);
    setCurrentQuestionIndex(0);
  };

  const handleViewLeaderboard = async () => {
    await loadLeaderboard();
    setCurrentPage("leaderboard");
  };

  const handleSubmitQuiz = () => {
    setCurrentPage("results");
  };

  // Render current page
  switch (currentPage) {
    case "home":
      return (
        <IntroPage
          onStartQuiz={() => setCurrentPage("settings")}
          onViewLeaderboard={handleViewLeaderboard}
        />
      );

    case "settings":
      return (
        <SettingsPage
          gameSettings={gameSettings}
          setGameSettings={setGameSettings}
          questionsPerPage={questionsPerPage}
          setQuestionsPerPage={setQuestionsPerPage}
          categories={categories}
          onBack={() => setCurrentPage("home")}
          onStartQuiz={startQuiz}
          loading={loading}
        />
      );

    case "quiz":
      return (
        <QuizPage
          questions={questions}
          userAnswers={userAnswers}
          setUserAnswers={setUserAnswers}
          currentQuestionIndex={currentQuestionIndex}
          setCurrentQuestionIndex={setCurrentQuestionIndex}
          questionsPerPage={questionsPerPage}
          onSubmitQuiz={handleSubmitQuiz}
        />
      );

    case "results":
      return (
        <ResultPage
          questions={questions}
          userAnswers={userAnswers}
          onPlayAgain={resetQuiz}
          onViewLeaderboard={handleViewLeaderboard}
        />
      );

    case "leaderboard":
      return (
        <LeaderboardPage
          leaderboard={leaderboard}
          onBack={() => setCurrentPage("home")}
        />
      );

    default:
      return (
        <IntroPage
          onStartQuiz={() => setCurrentPage("settings")}
          onViewLeaderboard={handleViewLeaderboard}
        />
      );
  }
}

export default TriviaApp;
