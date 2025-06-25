import React from "react";
import { useNavigate } from "react-router-dom";

const SubmitButton = ({
  score,
  totalQuestions,
  onPlayAgain,
  category,
  difficulty,
  type,
  leaderboard,
  setLeaderboard,
}) => {
  const navigate = useNavigate();
  const percentage = Math.round((score / totalQuestions) * 100);

  React.useEffect(() => {
    // Save to leaderboard when component mounts
    saveToLeaderboard();
  }, []);

  function saveToLeaderboard() {
    const scoreEntry = {
      id: Date.now(),
      score: score,
      totalQuestions: totalQuestions,
      percentage: percentage,
      category: getCategoryName(category),
      difficulty: difficulty || "Any",
      type: type || "Any",
      date: new Date().toISOString(),
    };

    setLeaderboard((prev) => {
      const newLeaderboard = [...prev, scoreEntry];
      return newLeaderboard.sort((a, b) => b.percentage - a.percentage);
    });
  }

  function getCategoryName(categoryValue) {
    const categories = {
      9: "General Knowledge",
      10: "Entertainment: Books",
      11: "Entertainment: Film",
      12: "Entertainment: Music",
      13: "Entertainment: Musicals & Theatres",
      14: "Entertainment: Television",
      15: "Entertainment: Video Games",
      16: "Entertainment: Board Games",
      17: "Science & Nature",
      18: "Science: Computers",
      19: "Science: Mathematics",
      20: "Mythology",
      21: "Sports",
      22: "Geography",
      23: "History",
      24: "Politics",
      25: "Art",
      26: "Celebrities",
      27: "Animals",
      28: "Vehicles",
      29: "Entertainment: Comics",
      30: "Science: Gadgets",
      31: "Entertainment: Japanese Anime & Manga",
      32: "Entertainment: Cartoon & Animations",
    };
    return categories[categoryValue] || "Mixed Categories";
  }

  return (
    <div className="results-container">
      <div className="score-display">
        <h2>Quiz Complete!</h2>
        <div className="score-circle">
          <span className="score-percentage">{percentage}%</span>
        </div>
        <p className="score-text">
          You scored {score} out of {totalQuestions} questions correctly
        </p>

        <div className="performance-message">
          {percentage >= 80 && <p className="excellent">Excellent work! 🎉</p>}
          {percentage >= 60 && percentage < 80 && (
            <p className="good">Good job! 👍</p>
          )}
          {percentage >= 40 && percentage < 60 && (
            <p className="average">Not bad, keep practicing! 📚</p>
          )}
          {percentage < 40 && (
            <p className="needs-improvement">Keep studying! 💪</p>
          )}
        </div>
      </div>

      <div className="action-buttons">
        <button
          className="leaderboard-btn"
          onClick={() => navigate("/leaderboard")}
        >
          View Leaderboard
        </button>
        <button className="play-again-btn" onClick={onPlayAgain}>
          Play Again
        </button>
        <button className="home-btn" onClick={() => navigate("/")}>
          Home
        </button>
      </div>
    </div>
  );
};

export default SubmitButton;
