import React from 'react'

//types
import { AnswerObject } from '../App'

// styles
import { ButtonWrapper, Wrapper } from './QuestionCard.styles'

type Props = {
  question: string
  answers: string[]
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void
  userAnswer: AnswerObject | undefined
  questionNum: number
  totalQuestions: number
}

const QuestionCard: React.FC<Props> = ({
  question,
  answers = [],
  callback,
  userAnswer,
  questionNum,
  totalQuestions,
}) => {
  return (
    <Wrapper>
      <p className='number'>
        Question: {questionNum} / {totalQuestions}
      </p>
      <p dangerouslySetInnerHTML={{ __html: question }} />
      <div>
        {answers.map((answer: string, idx: number) => (
          <ButtonWrapper
            correct={userAnswer?.answer === answer}
            userClicked={userAnswer?.answer === answer}
            key={answer}
          >
            <button disabled={Boolean(userAnswer)} value={answer} onClick={callback}>
              <span dangerouslySetInnerHTML={{ __html: answer }} />
            </button>
          </ButtonWrapper>
        ))}
      </div>
    </Wrapper>
  )
}

export default QuestionCard
