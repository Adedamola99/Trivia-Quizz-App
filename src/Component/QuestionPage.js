import React from 'react'
import { nanoid } from 'nanoid';

const QuestionPage = (props) => {
  const {correctAnswer, allAnswers, setCount, question} = props;
  const [answer, setAnswer] = React.useState(answerData())
  const regex = /(&quot;)|(&#039;t)|(&#039;s)|(&#039;)|(&amp;!)|(&amp;)|(&uuml;)/gi;
  const otherRegex = /&eacute;/gi;

  function answerData() {
    const arr = [];
    allAnswers.map(item => (
     arr.push({
        answer: item,
        id: nanoid(),
        picked: false
      })
    ))
    return arr
  }


  
  
  function handleAnswerCheck(e,id) {
    if(props.click){ 

      setAnswer(prev => prev.map(item => {
    
          return item.id === id ? {...item, picked: true} :  {...item, picked: false};
          }
        )
      ) 
      
      setCount(prev => e.target.innerText === correctAnswer ? prev + 1 : prev)
    }
  }
  const answerItem = answer.map(item => {
    const styles = {
      backgroundColor: item.picked ? "#D6DBF5" : "white"
    }

    const wrongAnswer = {
      backgroundColor: "#F8BCBC",
      borderColor: "#F8BCBC",
      opacity: 0.5
    }

    return (
      <p className={item.answer === correctAnswer && props.startCheck ? "correct-answer" : "option"}
         key={item.id}
         onClick = {props.click ? (e) => handleAnswerCheck(e, item.id) : null}
         style = {!props.startCheck ? styles : item.picked && item.answer !== correctAnswer ? wrongAnswer : undefined} 
      >
        {item.answer.replace(regex, "").replace(otherRegex, "e")}
      </p>
    )
  })


  return (
    <div>
      <div className="questions">
        <div className="question">
          <h3 className="question-title">{question.replace(regex, "").replace(otherRegex, "e")}</h3>
          <div className="options">
            {answerItem}
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuestionPage

