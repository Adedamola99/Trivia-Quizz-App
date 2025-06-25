import { Trophy, Play } from "lucide-react";

const IntroPage = ({ onStartQuiz, onViewLeaderboard }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-8 drop-shadow-lg">
          🧠 Trivia Master
        </h1>
        <p className="text-xl text-white/90 mb-12 max-w-md mx-auto">
          Test your knowledge with questions from various categories and
          difficulty levels!
        </p>
        <div className="space-y-4">
          <button
            onClick={onStartQuiz}
            className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-xl hover:bg-purple-50 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-3 mx-auto"
          >
            <Play size={24} />
            Start Quiz
          </button>
          <button
            onClick={onViewLeaderboard}
            className="bg-purple-500/20 backdrop-blur text-white px-8 py-4 rounded-full font-bold text-xl hover:bg-purple-500/30 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-3 mx-auto border border-white/20"
          >
            <Trophy size={24} />
            Leaderboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default IntroPage;
