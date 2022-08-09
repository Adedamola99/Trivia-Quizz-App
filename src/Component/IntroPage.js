import React from 'react'

const IntroPage = (props) => {
  return (
    <div className='intro-page'>
      <img src="./images/blob 4.svg" alt="" className='blob1' />
      <img src="./images/blob 5.svg" alt="" className='blob2'/>

      <div className="content">
        <h1 className='quiz-name'>Quizzical</h1>
        <p className='description'>A quick quiz testing your knowledge</p>
        <h4 className='start' onClick= {props.handleHomeDisplay}>Start quiz</h4>
      </div>


    </div>
  )
}

export default IntroPage

