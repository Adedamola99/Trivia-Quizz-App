import React from 'react'
import IntroPage from "./Component/IntroPage";
import QuizzPage from './Component/QuizzPage';
import { useState, useEffect} from "react";
// import { Spinner } from "@chakra-ui/react";

function App() {
  const [startGame, setStartGame] = useState(false);
  const [data, setData] = useState([]);
  const [displayHome, setDisplayHome] = useState(true);
  const [pageLoading, setPageLoading] = useState(true);
  
  useEffect(() => {
      async function fetchData() {
        const response = await fetch("https://opentdb.com/api.php?amount=10&category=18&type=multiple");
        const quizData = await response.json();
        setPageLoading(false)
        setData(quizData.results)
      }
      fetchData();
  },[startGame])


  

  
  const displayUpdatedHomePage = () => {
    setDisplayHome(prevDisplayedHome => !prevDisplayedHome);
  }

  return (
    <div>
      { displayHome ?
       
      <IntroPage  handleHomeDisplay={displayUpdatedHomePage}/> : pageLoading ? <div className="dot-box"><div className="dots"></div></div> :
        
      <QuizzPage data={data} setStartGame={setStartGame}/>
      
      }
    </div>
  )
}

export default App

