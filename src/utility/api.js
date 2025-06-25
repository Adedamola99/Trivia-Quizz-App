const triviaAPI = {
  // Use hardcoded categories instead of API call
  getCategories: () => {
    return [
      { id: 9, name: "General Knowledge" },
      { id: 10, name: "Entertainment: Books" },
      { id: 11, name: "Entertainment: Film" },
      { id: 12, name: "Entertainment: Music" },
      { id: 13, name: "Entertainment: Musicals & Theatres" },
      { id: 14, name: "Entertainment: Television" },
      { id: 15, name: "Entertainment: Video Games" },
      { id: 16, name: "Entertainment: Board Games" },
      { id: 17, name: "Science & Nature" },
      { id: 18, name: "Science: Computers" },
      { id: 19, name: "Science: Mathematics" },
      { id: 20, name: "Mythology" },
      { id: 21, name: "Sports" },
      { id: 22, name: "Geography" },
      { id: 23, name: "History" },
      { id: 24, name: "Politics" },
      { id: 25, name: "Art" },
      { id: 26, name: "Celebrities" },
      { id: 27, name: "Animals" },
      { id: 28, name: "Vehicles" },
      { id: 29, name: "Entertainment: Comics" },
      { id: 30, name: "Science: Gadgets" },
      { id: 31, name: "Entertainment: Japanese Anime & Manga" },
      { id: 32, name: "Entertainment: Cartoon & Animations" },
    ];
  },

  getQuestions: async (amount, category, difficulty, type) => {
    try {
      let url = `https://opentdb.com/api.php?amount=${amount}`;
      if (category && category !== "any") url += `&category=${category}`;
      if (difficulty && difficulty !== "any")
        url += `&difficulty=${difficulty}`;
      if (type && type !== "any") url += `&type=${type}`;

      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch questions");
      const data = await response.json();

      if (data.response_code === 0 && data.results) {
        return data.results.map((q, index) => ({
          id: index,
          question: q.question,
          correct_answer: q.correct_answer,
          incorrect_answers: q.incorrect_answers,
          all_answers: [...q.incorrect_answers, q.correct_answer].sort(
            () => Math.random() - 0.5
          ),
          type: q.type,
          category: q.category,
          difficulty: q.difficulty,
        }));
      }
      throw new Error("No questions returned from API");
    } catch (error) {
      console.error("Error fetching questions:", error);
      return [];
    }
  },
};

export default triviaAPI;
