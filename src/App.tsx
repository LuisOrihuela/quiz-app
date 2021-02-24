import React, { useState } from 'react'
import { fetchQuizQuestions } from './API'
//Components
import QuestionCard from './components/QuestionCard'

// Types
import { Difficulty, QuestionState } from './API'

//Styles
import { GlobalStyle, Wrapper } from './App.styles'

const TOTAL_QUESTIONS = 10

export type AnswerObject = {
  question: string
  answer: string
  isCorrect: boolean
  correctAnswer: string
}

const App = () => {
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState<QuestionState[]>([])
  const [score, setScore] = useState(0)
  const [number, setNumber] = useState(0)
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])
  const [gameOver, setGameOver] = useState(true)

  const startTrivia = async () => {
    setLoading(true)
    setGameOver(false)
    const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY)
    setQuestions(newQuestions)
    setScore(0)
    setUserAnswers([])
    setLoading(false)
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>): void => {
    if (!gameOver) {
      const answer = e.currentTarget.value
      const isCorrect = questions[number].correct_answer === answer
      if (isCorrect) setScore(prevScore => prevScore + 1)
      const answerObject = {
        question: questions[number].question,
        answer,
        isCorrect,
        correctAnswer: questions[number].correct_answer,
      }
      setUserAnswers(prev => [...prev, answerObject])
    }
  }

  const nextQuestion = () => {
    const nextQuestion = number + 1
    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true)
      return
    }
    setNumber(nextQuestion)
  }

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>REACT QUIZ</h1>
        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <button className='start' onClick={startTrivia}>
            Start
          </button>
        ) : null}
        {!gameOver ? <p className='score'>Score: {score}</p> : null}
        {loading ? <p>Loading Questions...</p> : null}
        {!loading && !gameOver ? (
          <QuestionCard
            questionNum={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number]?.question}
            answers={questions[number]?.answers}
            userAnswer={userAnswers?.[number]}
            callback={checkAnswer}
          />
        ) : null}
        {!gameOver &&
        !loading &&
        userAnswers.length === number + 1 &&
        number !== TOTAL_QUESTIONS - 1 ? (
          <button className='next' onClick={nextQuestion}>
            Next question
          </button>
        ) : null}
      </Wrapper>
    </>
  )
}

export default App
