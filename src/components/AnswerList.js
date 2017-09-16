import React from 'react';
import AnswerContainer from '../containers/AnswerContainer'

function AnswerList({ answers }) {
  return (
    <div>
      {
        answers.map(answer => 
          <div key={answer.question}>
            <AnswerContainer answer={answer} />
          </div>
        )
      }
    </div>
  )
}

export default AnswerList;