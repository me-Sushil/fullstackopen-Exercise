import { useState } from "react";

const StatisticLine=({value, text, per})=>{
  return(
    <>
    <p>{text} {value} {per}</p>
    </>
  )

}

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
  return (
    <>
      {all === 0 ? (<StatisticLine text="no feedback given" />) :(
      <>
      <StatisticLine value={good} text="good"/>
      <StatisticLine value={neutral} text="neutral"/>
      <StatisticLine value={bad} text="bad"/>
      <StatisticLine value={all} text="all"/>
      <StatisticLine value={average} text="average"/>
      <StatisticLine value={positive} text="positive" per="%"/>

      {/* <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>average {average}</p>
      <p>positive {positive} %</p> */}
      </>
    )}
    </>
  );
};


const Button=({onClick, text})=>{
  return(
    <>
    <button onClick={onClick}>{text}</button>
    </>
  )
}
const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);

  const handleGoodClick = () => {
    const newGood = good + 1;
    setGood(newGood);
    const newAll = newGood + neutral + bad;
    setAll(newAll);
    setAverage((newGood - bad) / newAll);
    setPositive((newGood / newAll) * 100);
  };

  const handleNeutralClick = () => {
    const newNeutral = neutral + 1;
    setNeutral(newNeutral);
    const newAll = good + newNeutral + bad;
    setAll(newAll);
    setAverage(good / newAll);
    setPositive((good / newAll) * 100);
  };
  const handleBadClick = () => {
    const newBad = bad + 1;
    setBad(newBad);
    const newAll = good + neutral + newBad;
    setAll(newAll);
    setAverage((good - newBad) / newAll);
    setPositive((good / newAll) * 100);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodClick} text ="good" />
      <Button onClick={handleNeutralClick} text ="neutral" />
      <Button onClick={handleBadClick} text ="bad" />
      {/* <button onClick={handleGoodClick}>good</button>
      <button onClick={handleNeutralClick}>neutral</button>
      <button onClick={handleBadClick}>bad</button> */}
      <h1>statistics</h1>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positive={positive}
      />
      {/* <p>good {good}</p> 
       <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>average {average}</p>
      <p>positive {positive}%</p> */}
    </div>
  );
};

export default App;
