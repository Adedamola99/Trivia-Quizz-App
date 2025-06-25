import { ChevronLeft, Settings } from "lucide-react";

const SettingsPage = ({
  gameSettings,
  setGameSettings,
  questionsPerPage,
  setQuestionsPerPage,
  categories,
  onBack,
  onStartQuiz,
  loading,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-4">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={onBack}
          className="mb-6 text-white hover:text-purple-200 transition-colors flex items-center gap-2"
        >
          <ChevronLeft size={20} />
          Back to Home
        </button>

        <div className="bg-white/10 backdrop-blur rounded-3xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            <Settings className="inline mr-3" size={32} />
            Quiz Settings
          </h2>

          <div className="space-y-6">
            {/* Category Selection */}
            <div>
              <label className="block text-white font-semibold mb-3 text-lg">
                Category
              </label>
              <select
                value={categories.name}
                onChange={(e) =>
                  setGameSettings((prev) => ({
                    ...prev,
                    category: e.target.value,
                  }))
                }
                className="w-full p-4 rounded-xl bg-white/20 text-white border border-white/30 focus:border-white focus:outline-none backdrop-blur"
              >
                <option value="any" className="text-gray-800">
                  Any Category
                </option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id} className="text-gray-800">
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty Selection */}
            <div>
              <label className="block text-white font-semibold mb-3 text-lg">
                Difficulty
              </label>
              <select
                value={gameSettings.difficulty}
                onChange={(e) =>
                  setGameSettings((prev) => ({
                    ...prev,
                    difficulty: e.target.value,
                  }))
                }
                className="w-full p-4 rounded-xl bg-white/20 text-white border border-white/30 focus:border-white focus:outline-none backdrop-blur"
              >
                <option value="any" className="text-gray-800">
                  Any Difficulty
                </option>
                <option value="easy" className="text-gray-800">
                  Easy
                </option>
                <option value="medium" className="text-gray-800">
                  Medium
                </option>
                <option value="hard" className="text-gray-800">
                  Hard
                </option>
              </select>
            </div>

            {/* Question Type */}
            <div>
              <label className="block text-white font-semibold mb-3 text-lg">
                Question Type
              </label>
              <div className="w-full p-4 rounded-xl bg-white/20 text-white border border-white/30 backdrop-blur">
                Multiple Choice
              </div>
              {/* Hidden input to maintain the state */}
              <input type="hidden" value="multiple" />
            </div>

            {/* Number of Questions */}
            <div>
              <label className="block text-white font-semibold mb-3 text-lg">
                Number of Questions: {gameSettings.amount}
              </label>
              <input
                type="range"
                min="5"
                max="50"
                value={gameSettings.amount}
                onChange={(e) =>
                  setGameSettings((prev) => ({
                    ...prev,
                    amount: parseInt(e.target.value),
                  }))
                }
                className="w-full accent-white"
              />
              <div className="flex justify-between text-white/70 text-sm mt-1">
                <span>5</span>
                <span>50</span>
              </div>
            </div>

            {/* Questions Per Page */}
            <div>
              <label className="block text-white font-semibold mb-3 text-lg">
                Questions Per Page
              </label>
              <select
                value={questionsPerPage}
                onChange={(e) => setQuestionsPerPage(parseInt(e.target.value))}
                className="w-full p-4 rounded-xl bg-white/20 text-white border border-white/30 focus:border-white focus:outline-none backdrop-blur"
              >
                <option value="1" className="text-gray-800">
                  1 Question
                </option>
                <option value="5" className="text-gray-800">
                  5 Questions
                </option>
                <option value="10" className="text-gray-800">
                  10 Questions
                </option>
              </select>
            </div>

            <button
              onClick={onStartQuiz}
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white px-8 py-4 rounded-xl font-bold text-xl hover:from-green-500 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Loading Questions..." : "Start Quiz!"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
