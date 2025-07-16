import { useState } from "react";
import { firebaseAPI } from "../utility/firebase";

const ResultPage = ({
  questions,
  userAnswers,
  onPlayAgain,
  onViewLeaderboard,
}) => {
  const [playerName, setPlayerName] = useState("");
  const [scoreSaved, setScoreSaved] = useState(false);

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((question, index) => {
      if (userAnswers[index] === question.correct_answer) {
        correct++;
      }
    });
    return correct;
  };

  const score = calculateScore();
  const percentage = Math.round((score / questions.length) * 100);

  const saveScore = async () => {
    if (playerName.trim()) {
      const success = await firebaseAPI.saveScore(
        playerName.trim(),
        score,
        questions.length
      );
      if (success) {
        setScoreSaved(true);
      } else {
        alert("Failed to save score. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Score Summary */}
        <div className="bg-white/10 backdrop-blur rounded-3xl p-8 mb-8 shadow-2xl text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Quiz Complete! 🎉
          </h2>
          <div className="text-6xl font-bold text-white mb-4">
            {percentage}%
          </div>
          <p className="text-2xl text-white/90 mb-6">
            You got {score} out of {questions.length} questions correct!
          </p>

          {!scoreSaved && (
            <div className="flex gap-4 justify-center items-center mb-6 flex-wrap">
              <input
                type="text"
                placeholder="Enter your name"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                onKeyPress={(e) =>
                  e.key === "Enter" && playerName.trim() && saveScore()
                }
                className="px-4 py-2 rounded-xl bg-white/20 text-white placeholder-white/70 border border-white/30 focus:border-white focus:outline-none backdrop-blur"
                maxLength={50}
              />
              <button
                onClick={saveScore}
                disabled={!playerName.trim()}
                className="bg-green-500 text-white px-6 py-2 rounded-xl hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
              >
                Save your score
              </button>
            </div>
          )}

          {scoreSaved && (
            <p className="text-green-300 mb-6 text-lg">
              ✅ Score saved to leaderboard!
            </p>
          )}

          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={onPlayAgain}
              className="bg-white/20 text-white px-6 py-3 rounded-xl hover:bg-white/30 transition-colors"
            >
              Play Again
            </button>
            <button
              onClick={onViewLeaderboard}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-xl hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 font-semibold"
            >
              View Leaderboard
            </button>
          </div>
        </div>

        {/* Detailed Results */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            Review Your Answers
          </h3>
          {questions.map((question, index) => {
            const userAnswer = userAnswers[index];
            const isCorrect = userAnswer === question.correct_answer;

            return (
              <div
                key={question.id}
                className="bg-white/10 backdrop-blur rounded-2xl p-6 shadow-xl"
              >
                <h4 className="text-lg font-semibold text-white mb-4">
                  <span
                    className={`rounded-full px-3 py-1 mr-3 text-sm ${
                      isCorrect
                        ? "bg-green-500/30"
                        : userAnswer
                        ? "bg-red-500/30"
                        : "bg-yellow-500/30"
                    }`}
                  >
                    {index + 1}
                  </span>
                  <span
                    dangerouslySetInnerHTML={{ __html: question.question }}
                  />
                </h4>

                <div className="grid gap-2">
                  {question.all_answers.map((answer, answerIndex) => {
                    let buttonClass = "p-3 rounded-xl border-2 ";

                    if (answer === question.correct_answer) {
                      buttonClass +=
                        "bg-green-500/30 border-green-400 text-white";
                    } else if (
                      answer === userAnswer &&
                      userAnswer !== question.correct_answer
                    ) {
                      buttonClass += "bg-red-500/30 border-red-400 text-white";
                    } else {
                      buttonClass +=
                        "bg-white/10 border-white/30 text-white/70";
                    }

                    return (
                      <div key={answerIndex} className={buttonClass}>
                        <div className="flex items-center justify-between">
                          <span dangerouslySetInnerHTML={{ __html: answer }} />
                          {answer === question.correct_answer && (
                            <span className="text-green-300 font-semibold">
                              ✓ Correct
                            </span>
                          )}
                          {answer === userAnswer &&
                            answer !== question.correct_answer && (
                              <span className="text-red-300 font-semibold">
                                ✗ Your Answer
                              </span>
                            )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {!userAnswer && (
                  <div className="mt-3 p-3 bg-yellow-500/20 border border-yellow-400/50 rounded-xl">
                    <span className="text-yellow-300">
                      ⚠️ No answer selected
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
