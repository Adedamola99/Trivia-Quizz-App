import React from 'react'
import IntroPage from "./Component/IntroPage";
import QuizzPage from './Component/QuizzPage';

function App() {
  const [startGame, setStartGame] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [displayHome, setDisplayHome] = React.useState(true);
  
  
  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=10&category=18&type=multiple")
    .then(res => res.json())
    .then(data => setData(data.results)) 
  },[startGame])

  
  const displayUpdatedHomePage = () => {
    setDisplayHome(prevDisplayedHome => !prevDisplayedHome);
  }

  return (
    <div>
      { displayHome ?
       
      <IntroPage  handleHomeDisplay={displayUpdatedHomePage}/> :
        
      <QuizzPage data={data} setStartGame={setStartGame}/>
      }
    </div>
  )
}

export default App

