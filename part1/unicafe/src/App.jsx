import { useState } from 'react'

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const StatisticsLine = ({text, val}) => {
  return (
    <div>
      {text} {val}
    </div>
  )
}

const Statistics = ({good, neutral, bad}) => {
  return good || bad || neutral ? (
    <>
      <h1>statistics</h1>
      <div>
        <StatisticsLine text="good" val={good} />
        <StatisticsLine text="bad" val={bad} />
        <StatisticsLine text="neutral" val={neutral} />
        <StatisticsLine text="all" val={good + neutral + bad} />
        <StatisticsLine text="average" val={(good - bad)/(good + neutral + bad)} />
        <StatisticsLine text="good" val={`${good/(good + neutral + bad) * 100} %`} />

      </div>
    </>
  ) : (
    <>
      <h1>statistics</h1>
      <div>
        No feedback given
      </div>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <h1>give feedback</h1>
      <div>
        <Button onClick={() => setGood(good + 1)} text="good" ></Button>
        <Button onClick={() => setNeutral(neutral + 1)} text="neutral" ></Button>
        <Button onClick={() => setBad(bad + 1)} text="bad" ></Button>
      </div>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </>
  )
}

export default App