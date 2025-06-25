import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const firebaseAPI = {
  saveScore: async (playerName, score, totalQuestions) => {
    try {
      console.log("Attempting to save score:", {
        playerName,
        score,
        totalQuestions,
      });

      const trimmedName = String(playerName).trim();
      const numScore = Number(score);
      const numTotal = Number(totalQuestions);
      const percentage = Math.round((numScore / numTotal) * 100);

      // Check if player already exists
      const existingQuery = query(
        collection(db, "scores"),
        where("playerName", "==", trimmedName)
      );

      const existingDocs = await getDocs(existingQuery);

      if (!existingDocs.empty) {
        // Player exists - check if new score is better
        const existingDoc = existingDocs.docs[0];
        const existingData = existingDoc.data();

        if (
          percentage > existingData.percentage ||
          (percentage === existingData.percentage &&
            numScore > existingData.score)
        ) {
          // Update existing document with better score
          await updateDoc(doc(db, "scores", existingDoc.id), {
            score: numScore,
            totalQuestions: numTotal,
            percentage: percentage,
            date: new Date().toISOString(),
            timestamp: new Date(),
            lastImproved: new Date().toISOString(),
            gamesPlayed: (existingData.gamesPlayed || 1) + 1,
          });

          console.log(
            "Updated existing score for",
            trimmedName,
            "- New best score!"
          );
          return {
            success: true,
            action: "improved",
            message: `Congratulations! New best score: ${percentage}%`,
            previousBest: existingData.percentage,
            newBest: percentage,
          };
        } else {
          // Score didn't improve, but still count the game
          await updateDoc(doc(db, "scores", existingDoc.id), {
            gamesPlayed: (existingData.gamesPlayed || 1) + 1,
            lastPlayed: new Date().toISOString(),
          });

          console.log(
            "Score didn't improve for",
            trimmedName,
            "but game counted"
          );
          return {
            success: true,
            action: "played",
            message: `Good try! Your best score is still ${existingData.percentage}%`,
            currentScore: percentage,
            bestScore: existingData.percentage,
          };
        }
      } else {
        // New player - create new document
        const docData = {
          playerName: trimmedName,
          score: numScore,
          totalQuestions: numTotal,
          percentage: percentage,
          date: new Date().toISOString(),
          timestamp: new Date(),
          lastImproved: new Date().toISOString(),
          lastPlayed: new Date().toISOString(),
          gamesPlayed: 1,
        };

        console.log("Creating new player document:", docData);

        const docRef = await addDoc(collection(db, "scores"), docData);
        console.log("New player document created with ID:", docRef.id);
        return {
          success: true,
          action: "new_player",
          message: `Welcome ${trimmedName}! Your score: ${percentage}%`,
          score: percentage,
        };
      }
    } catch (error) {
      console.error("Full error details:", error);
      console.error("Error code:", error.code);
      console.error("Error message:", error.message);
      return {
        success: false,
        action: "error",
        error: error.message,
      };
    }
  },

  getLeaderboard: async () => {
    try {
      console.log("Fetching leaderboard...");

      // Simple query - order by percentage first, then by score for ties
      const q = query(
        collection(db, "scores"),
        orderBy("percentage", "desc"),
        orderBy("score", "desc"),
        limit(10)
      );

      const querySnapshot = await getDocs(q);
      const scores = [];

      querySnapshot.forEach((doc) => {
        scores.push({ id: doc.id, ...doc.data() });
      });

      console.log("Fetched leaderboard:", scores);
      return scores;
    } catch (error) {
      console.error("Error loading leaderboard:", error);

      // Fallback: if composite index doesn't exist, use single orderBy
      try {
        console.log("Trying fallback query...");
        const fallbackQuery = query(
          collection(db, "scores"),
          orderBy("percentage", "desc"),
          limit(10)
        );

        const fallbackSnapshot = await getDocs(fallbackQuery);
        const fallbackScores = [];

        fallbackSnapshot.forEach((doc) => {
          fallbackScores.push({ id: doc.id, ...doc.data() });
        });

        // Sort in JavaScript for tie-breaking
        fallbackScores.sort((a, b) => {
          if (b.percentage !== a.percentage) {
            return b.percentage - a.percentage;
          }
          return b.score - a.score;
        });

        console.log("Fallback leaderboard loaded:", fallbackScores);
        return fallbackScores.slice(0, 10);
      } catch (fallbackError) {
        console.error("Fallback query also failed:", fallbackError);
        return [];
      }
    }
  },

  getPlayerStats: async (playerName) => {
    try {
      const trimmedName = String(playerName).trim();
      const playerQuery = query(
        collection(db, "scores"),
        where("playerName", "==", trimmedName)
      );

      const querySnapshot = await getDocs(playerQuery);

      if (querySnapshot.empty) {
        return null;
      }

      const playerData = querySnapshot.docs[0].data();
      return {
        playerName: playerData.playerName,
        bestScore: playerData.score,
        bestPercentage: playerData.percentage,
        totalQuestions: playerData.totalQuestions,
        gamesPlayed: playerData.gamesPlayed || 1,
        lastPlayed: playerData.lastPlayed,
        lastImproved: playerData.lastImproved,
      };
    } catch (error) {
      console.error("Error fetching player stats:", error);
      return null;
    }
  },

  // Clean up any duplicate entries (run once if needed)
  cleanupDuplicates: async () => {
    try {
      console.log("Starting cleanup of duplicate entries...");

      const allDocs = await getDocs(collection(db, "scores"));
      const playerBestScores = new Map();
      const duplicatesToDelete = [];

      // Group by player name and find best scores
      allDocs.forEach((doc) => {
        const data = doc.data();
        const existing = playerBestScores.get(data.playerName);

        if (!existing) {
          // First entry for this player
          playerBestScores.set(data.playerName, {
            ...data,
            docId: doc.id,
          });
        } else {
          // Compare scores
          const isCurrentBetter =
            data.percentage > existing.percentage ||
            (data.percentage === existing.percentage &&
              data.score > existing.score);

          if (isCurrentBetter) {
            // Current is better, mark existing for deletion
            duplicatesToDelete.push(existing.docId);
            playerBestScores.set(data.playerName, {
              ...data,
              docId: doc.id,
            });
          } else {
            // Existing is better, mark current for deletion
            duplicatesToDelete.push(doc.id);
          }
        }
      });

      console.log("Cleanup analysis:");
      console.log("- Unique players:", playerBestScores.size);
      console.log("- Total documents:", allDocs.size);
      console.log("- Duplicates to delete:", duplicatesToDelete.length);

      // Uncomment the lines below to actually delete duplicates
      // WARNING: This will permanently delete data!
      /*
      for (const docId of duplicatesToDelete) {
        await deleteDoc(doc(db, "scores", docId));
        console.log("Deleted duplicate:", docId);
      }
      */

      return {
        uniquePlayers: playerBestScores.size,
        totalDocs: allDocs.size,
        duplicates: duplicatesToDelete.length,
        duplicateIds: duplicatesToDelete, // For manual review
      };
    } catch (error) {
      console.error("Error in cleanup:", error);
      return { error: error.message };
    }
  },

  // Get overall game statistics
  getGameStats: async () => {
    try {
      const allDocs = await getDocs(collection(db, "scores"));
      let totalPlayers = 0;
      let totalGames = 0;
      let totalScore = 0;
      let highestScore = 0;
      let highestScorePlayer = "";

      allDocs.forEach((doc) => {
        const data = doc.data();
        totalPlayers++;
        totalGames += data.gamesPlayed || 1;
        totalScore += data.percentage;

        if (data.percentage > highestScore) {
          highestScore = data.percentage;
          highestScorePlayer = data.playerName;
        }
      });

      return {
        totalPlayers,
        totalGames,
        averageScore:
          totalPlayers > 0 ? Math.round(totalScore / totalPlayers) : 0,
        highestScore,
        highestScorePlayer,
      };
    } catch (error) {
      console.error("Error loading game stats:", error);
      return {
        totalPlayers: 0,
        totalGames: 0,
        averageScore: 0,
        highestScore: 0,
        highestScorePlayer: "",
      };
    }
  },
};
