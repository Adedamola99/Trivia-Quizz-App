import React from 'react'

const SubmitButton = (props) => {
  
const [answerChecker, setAnswerChecker] = React.useState(true);

function handleAnswerDisplay() {
  setAnswerChecker(!answerChecker);
  props.setStartCheck(prevCheck => !prevCheck);
  props.setClick(prevClick => !prevClick);
  props.setCount(prev => answerChecker ? prev : 0);

  props.setCount(prev => answerChecker ? prev : 0);
  props.setStartGame(prev => !answerChecker ? !prev  : undefined);

  if (!answerChecker) {
    props.setNewData(props.newDatas);
  }
}


return (
  <div className='btn-container'>
    {props.startCheck && <p className="score-text">You scored {props.count}/10 correctly</p>}
    <button className='check-btn' onClick={handleAnswerDisplay}>{answerChecker ? "Check answers" : "Play again"}</button>
  </div>

  )
}

export default SubmitButton
