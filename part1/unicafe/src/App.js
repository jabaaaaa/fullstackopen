import React, { useState } from 'react'

  const StatisticLine = ({text, value, unit}) => {
    return  (
      <tr>
        <td>{text}</td>
        <td>{value}</td>
        <td>{unit}</td>
      </tr>
    )
  }

  // TODO - why new line between p?
  const Statistics = ({good, neutral, bad}) => {
    const all = good + neutral + bad

    if (all === 0) {
      return (
        <div>
          <p>No Feedback given</p>
        </div>
      )
    }

    let positive = good/all *100
    
    return (
      <table>
        <tbody>
          <StatisticLine text="good" value ={good} unit="" />
          <StatisticLine text="neutral" value ={neutral} unit="" />
          <StatisticLine text="bad" value ={bad} unit="" />
          <StatisticLine text="all" value ={all} unit="" />
          <StatisticLine text="average" value ={all/3} unit="" />
          <StatisticLine text="positive" value ={positive} unit="%" />
        </tbody>

      </table>
    );
  }

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodClicked = () => {
    setGood(good + 1)
  }
  
  const neutralClicked = () => {
    setNeutral(neutral + 1)
  }

  const badClicked = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={goodClicked}>good</button>
      <button onClick={neutralClicked}>neutral</button>
      <button onClick={badClicked}>bad</button>

      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App