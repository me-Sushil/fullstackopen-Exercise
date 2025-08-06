import { useState } from 'react'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick=()=>{
    const newGood = good + 1;
    setGood(newGood);
  }

  const handleNeutralClick=()=>{
    const newNeutral = neutral + 1;
    setNeutral(newNeutral);
  }
  const handleBadClick=()=>{
    const newBad = bad + 1;
    setBad(newBad);
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
    </div>
  )
}

export default App