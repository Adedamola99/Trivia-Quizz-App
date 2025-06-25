import { ChevronLeft, ChevronRight } from "lucide-react";

const QuizPage = ({
  questions,
  userAnswers,
  setUserAnswers,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  questionsPerPage,
  onSubmitQuiz,
}) => {
  const currentPage = Math.floor(currentQuestionIndex / questionsPerPage);
  const totalPages = Math.ceil(questions.length / questionsPerPage);
  const startIndex = currentPage * questionsPerPage;
  const endIndex = Math.min(startIndex + questionsPerPage, questions.length);
  const currentQuestions = questions.slice(startIndex, endIndex);

  const handleAnswerSelect = (questionIndex, selectedAnswer) => {
    const globalIndex = startIndex + questionIndex;
    const newAnswers = [...userAnswers];
    newAnswers[globalIndex] = selectedAnswer;
    setUserAnswers(newAnswers);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentQuestionIndex((currentPage + 1) * questionsPerPage);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentQuestionIndex((currentPage - 1) * questionsPerPage);
    }
  };

  const goToPage = (pageIndex) => {
    setCurrentQuestionIndex(pageIndex * questionsPerPage);
  };

  const progress = ((currentPage + 1) / totalPages) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur rounded-2xl p-6 mb-6 shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white">
              Page {currentPage + 1} of {totalPages}
            </h2>
            <div className="text-white/90">
              Questions {startIndex + 1}-{endIndex} of {questions.length}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-white/20 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-6">
          {currentQuestions.map((question, index) => {
            const globalIndex = startIndex + index;
            return (
              <div
                key={question.id}
                className="bg-white/10 backdrop-blur rounded-2xl p-6 shadow-xl"
              >
                <h3 className="text-xl font-semibold text-white mb-6">
                  <span className="bg-white/20 rounded-full px-3 py-1 mr-3 text-sm">
                    {globalIndex + 1}
                  </span>
                  <span
                    dangerouslySetInnerHTML={{ __html: question.question }}
                  />
                </h3>

                <div className="grid gap-3">
                  {question.all_answers.map((answer, answerIndex) => (
                    <button
                      key={answerIndex}
                      onClick={() => handleAnswerSelect(index, answer)}
                      className={`text-left p-4 rounded-xl transition-all duration-300 border-2 ${
                        userAnswers[globalIndex] === answer
                          ? "bg-white/30 border-white text-white"
                          : "bg-white/10 border-white/30 text-white/90 hover:bg-white/20 hover:border-white/50"
                      }`}
                    >
                      <span dangerouslySetInnerHTML={{ __html: answer }} />
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 0}
            className="flex items-center gap-2 bg-white/20 text-white px-6 py-3 rounded-xl hover:bg-white/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={20} />
            Previous
          </button>

          {/* <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  i === currentPage
                    ? "bg-white"
                    : "bg-white/40 hover:bg-white/60"
                }`}
                title={`Go to page ${i + 1}`}
              />
            ))}
          </div> */}

          <div className="flex gap-2">
            {totalPages <= 10 ? (
              // Show all circles if 10 or fewer pages
              Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => goToPage(i)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    i === currentPage
                      ? "bg-white"
                      : "bg-white/40 hover:bg-white/60"
                  }`}
                  title={`Go to page ${i + 1}`}
                />
              ))
            ) : (
              // Show condensed pagination for more than 10 pages
              <div className="flex items-center gap-2">
                <span className="text-white/70 text-sm">
                  Page {currentPage + 1} of {totalPages}
                </span>
                <div className="flex gap-1">
                  {currentPage > 0 && (
                    <button
                      onClick={() => goToPage(0)}
                      className="w-3 h-3 rounded-full bg-white/40 hover:bg-white/60 transition-colors"
                      title="Go to first page"
                    />
                  )}
                  <div
                    className="w-3 h-3 rounded-full bg-white"
                    title={`Current page ${currentPage + 1}`}
                  />
                  {currentPage < totalPages - 1 && (
                    <button
                      onClick={() => goToPage(totalPages - 1)}
                      className="w-3 h-3 rounded-full bg-white/40 hover:bg-white/60 transition-colors"
                      title="Go to last page"
                    />
                  )}
                </div>
              </div>
            )}
          </div>

          {currentPage === totalPages - 1 ? (
            <button
              onClick={onSubmitQuiz}
              className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-3 rounded-xl hover:from-green-500 hover:to-blue-600 transition-all duration-300 font-semibold"
            >
              Submit Quiz
            </button>
          ) : (
            <button
              onClick={goToNextPage}
              className="flex items-center gap-2 bg-white/20 text-white px-6 py-3 rounded-xl hover:bg-white/30 transition-colors"
            >
              Next
              <ChevronRight size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
