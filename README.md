**Trivia Quiz App**
A responsive trivia quiz application built with React, Firebase, Tailwind CSS, and Lucide Icons. Users can select from multiple categories, answer timed questions, and have their scores saved to a real-time leaderboard.

---

## 🚀 Features

- **Multiple Categories**: Choose from a variety of trivia topics (General Knowledge, Science, History, etc.).
- **Timed Questions**: Each question has a countdown timer to keep the pace exciting.
- **Score Tracking**: Real-time scoring displayed at the end of each quiz.
- **Persistent Leaderboard**: User scores are stored in Firebase Firestore and shown in a public leaderboard.
- **Responsive Design**: Mobile-ready layouts powered by Tailwind CSS.
- **Modern Icons**: Clean, consistent iconography with Lucide Icons.

---

## 🛠️ Technologies

- **Framework**: React (Create React App / Vite)
- **Styling**: Tailwind CSS
- **Icons**: [Lucide Icons](https://lucide.dev/) (via `lucide-react`)
- **Backend**: Firebase (Authentication & Firestore)
- **Hosting**: Netlify / Vercel (or your preferred provider)
- **Language**: JavaScript (ES6+), JSX

---

## 📦 Installation

1. **Clone the repo**

   ```bash
   git clone https://github.com/<your-username>/react-trivia-quiz.git
   cd react-trivia-quiz
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables**
   Create a `.env` file in the project root with your Firebase config (prefixed by `REACT_APP_`):

   ```env
   REACT_APP_FIREBASE_API_KEY=your_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   ```

---

## 🔧 Usage

1. **Start the development server**

   ```bash
   npm start
   # or
   yarn start
   ```

   Open [http://localhost:3000](http://localhost:3000) to view in your browser.

2. **Select a category**
   Choose from the category menu on the home screen.

3. **Answer questions**
   Each question will display a 15-second timer. Select an answer before time runs out.

4. **View your score**
   At quiz completion, see your total correct answers and time bonus.

5. **Save to leaderboard**
   Enter your name to submit your score. The Firestore-backed leaderboard will update instantly.

---

## 📁 Project Structure

```
react-trivia-quiz/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── QuizCard.jsx
│   │   ├── Timer.jsx
│   │   ├── Leaderboard.jsx
│   │   └── CategorySelect.jsx
│   ├── contexts/
│   │   └── FirebaseContext.js
│   ├── firebase.js          # Firebase initialization
│   ├── App.jsx
│   ├── index.css            # Tailwind imports
│   └── index.js
├── .env
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── README.md
```

---

## 🔑 Environment Variables

All Firebase credentials must be set as environment variables:

- `REACT_APP_FIREBASE_API_KEY`
- `REACT_APP_FIREBASE_AUTH_DOMAIN`
- `REACT_APP_FIREBASE_PROJECT_ID`
- `REACT_APP_FIREBASE_STORAGE_BUCKET`
- `REACT_APP_FIREBASE_MESSAGING_SENDER_ID`
- `REACT_APP_FIREBASE_APP_ID`

---

## 📈 Deployment

1. **Build the app**

   ```bash
   npm run build
   # or
   yarn build
   ```

2. **Deploy to Netlify/Vercel**

   - Connect your Git repo in the Netlify/Vercel dashboard.
   - Set the same environment variables in the project’s settings.
   - Trigger a deployment.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m "Add YourFeature"`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

Please adhere to the existing code style and include tests where appropriate.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE). Feel free to use, modify, and distribute!
