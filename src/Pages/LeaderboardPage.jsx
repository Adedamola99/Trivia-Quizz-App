import { ChevronLeft, Trophy } from "lucide-react";

const LeaderboardPage = ({ leaderboard, onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-600 via-orange-600 to-red-600 p-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="mb-6 text-white hover:text-yellow-200 transition-colors flex items-center gap-2"
        >
          <ChevronLeft size={20} />
          Back to Home
        </button>

        <div className="bg-white/10 backdrop-blur rounded-3xl p-8 shadow-2xl">
          <h2 className="text-4xl font-bold text-white mb-8 text-center">
            <Trophy className="inline mr-3" size={40} />
            Leaderboard
          </h2>

          {leaderboard.length === 0 ? (
            <div className="text-center text-white/70 py-12">
              <Trophy size={64} className="mx-auto mb-4 opacity-50" />
              <p className="text-xl">No scores yet. Be the first to play!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {leaderboard.map((entry, index) => {
                const date = new Date(entry.date).toLocaleDateString();

                return (
                  <div
                    key={entry.id}
                    className={`p-6 rounded-2xl flex items-center justify-between ${
                      index === 0
                        ? "bg-gradient-to-r from-yellow-400/20 to-orange-500/20 border-2 border-yellow-400/50"
                        : index === 1
                        ? "bg-gradient-to-r from-gray-300/20 to-gray-400/20 border-2 border-gray-400/50"
                        : index === 2
                        ? "bg-gradient-to-r from-orange-600/20 to-red-600/20 border-2 border-orange-500/50"
                        : "bg-white/10 border border-white/30"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl ${
                          index === 0
                            ? "bg-yellow-400 text-yellow-900"
                            : index === 1
                            ? "bg-gray-400 text-gray-900"
                            : index === 2
                            ? "bg-orange-500 text-orange-900"
                            : "bg-white/20 text-white"
                        }`}
                      >
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">
                          {entry.playerName}
                        </h3>
                        <p className="text-white/70">{date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">
                        {entry.percentage}%
                      </div>
                      <div className="text-white/70">
                        {entry.score}/{entry.totalQuestions}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
