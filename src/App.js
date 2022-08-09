import React from 'react'
import IntroPage from "./Component/IntroPage";
import QuestionPage from "./Component/QuestionPage";
import { nanoid } from 'nanoid';
import SubmitButton from './Component/SubmitButton';

function App() {
  const [startGame, setStartGame] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [displayHome, setDisplayHome] = React.useState(true);
  const [newData, setNewData] = React.useState(newDatas());
  const [click, setClick] = React.useState(true);
  const [startCheck, setStartCheck] = React.useState(false);
  const [count, setCount] = React.useState(0);
  
  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=10&category=18&type=multiple")
    .then(res => res.json())
    .then(data => setData(data.results)) 
  },[startGame])

  
  
  const displayUpdatedHomePage = () => {
    setDisplayHome(prevDisplayedHome => !prevDisplayedHome);
  }

  function newDatas(){
    const arr = [];
    data.forEach(items => {
      arr.push({...items, id: nanoid()})
    })
    return arr
  }



  function shuffle(array) {
    for(let i = array.length - 1; i > 0; i--){
      const random = Math.floor(Math.random() * (i + 1));
      [array[i], array[random]] = [array[random], array[i]]
    }
  }
  

   const questionItem = newData.map(items => {
     let allAnswers = [...items.incorrect_answers, items.correct_answer]
     shuffle(allAnswers)

     return (
       <QuestionPage 
         key = {items.id}
         question = {items.question}
         incorrectAnswer = {items.incorrect_answers}
         correctAnswer = {items.correct_answer}
         allAnswers = {allAnswers}
         click={click}
         startCheck = {startCheck}
         setCount={setCount}
       />
     )
   })


  return (
    <div>
      { displayHome ?
       
      <IntroPage  handleHomeDisplay={displayUpdatedHomePage}/> :
        
        <div className='question-container'>
          <img src="./images/blob 4.svg" alt="" className='blob3'/>
            {questionItem}
              <SubmitButton 
                startCheck={startCheck}
                setStartCheck={setStartCheck}
                setClick = {setClick}
                count={count}
                setCount={setCount}
                newDatas={newDatas}
                setNewData={setNewData}
                setStartGame={setStartGame}
              />
          <img src="./images/blob 5.svg" alt="" className='blob4'/>
        </div>
      
      }
    </div>
  )
}

export default App

