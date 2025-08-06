import { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)

  const handleGoodClick=()=>{
    const newGood = good + 1;
    setGood(newGood);
    const newAll = newGood + neutral + bad;
    setAll(newAll );
    setAverage((newGood - bad)/newAll);
  }

  const handleNeutralClick=()=>{
    const newNeutral = neutral + 1;
    setNeutral(newNeutral);
    setAll(good + newNeutral + bad);
  }
  const handleBadClick=()=>{
    const newBad = bad + 1;
    setBad(newBad);
    const newAll = good + neutral + newBad;
    setAll(newAll);
    setAverage((good - newBad)/newAll )
  }

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={handleGoodClick}>good</button>
      <button onClick={handleNeutralClick}>neutral</button>
      <button onClick={handleBadClick}>bad</button>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>average {average}</p>
      <p>positive</p>
    </div>
  )
}

export default App