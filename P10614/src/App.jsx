import { useState } from 'react';

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

// const Stats = ({ good, neutral, bad }) => {
//   const all = good + neutral + bad;
//   const avg = (good - bad) / (good + neutral + bad);
//   const positive = (good / (good + neutral + bad)) * 100;

//   if (all === 0) {
//     return <div>no feedback given</div>;
//   }

//   return (
//     <div>
//       <div>good {good}</div>
//       <div>neutral {neutral}</div>
//       <div>bad {bad}</div>
//       <div>all {all}</div>
//       <div>average {avg}</div>
//       <div>positive {positive} %</div>
//     </div>
//   );
// };

const StatsLine = ({ text, value }) => {
  if (isNaN(value)) {
    return (
      <tr>
        <td>{text}</td>
        <td>Not a Number</td>
      </tr>
    );
  }
  if (text === 'positive') {
    return (
      // <table>
      //   <tbody>
      <tr>
        <td>{text}</td>
        <td>{value} %</td>
      </tr>
      //   </tbody>
      // </table>
    );
  }
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [clicks, setClicks] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const clickGood = () => {
    const newClicks = { ...clicks, good: clicks.good + 1 };
    setGood(good + 1);
    setClicks(newClicks);
  };
  const clickNeutral = () => {
    const newClicks = { ...clicks, neutral: clicks.neutral + 1 };
    setNeutral(neutral + 1);
    setClicks(newClicks);
  };
  const clickBad = () => {
    const newClicks = { ...clicks, bad: clicks.bad + 1 };
    setBad(bad + 1);
    setClicks(newClicks);
  };
  // const clickBtn = ({Btn, text}) => {
  //   setGood({props.} + 1);
  // };

  const all = good + neutral + bad;
  // const avg = (good - bad) / (good + neutral + bad);
  // const positive = (good / (good + neutral + bad)) * 100;

  return (
    <div>
      <h2>give feedback</h2>
      <Button handleClick={clickGood} text="good" />
      <Button handleClick={clickNeutral} text="neutral" />
      <Button handleClick={clickBad} text="bad" />
      <h2>statistics</h2>
      {/* <Stats good={clicks.good} neutral={clicks.neutral} bad={clicks.bad} /> */}
      {all === 0 ? (
        <div>no feedback given</div>
      ) : (
        <table>
          <tbody>
            <StatsLine text="good" value={good} />
            <StatsLine text="neutral" value={neutral} />
            <StatsLine text="bad" value={bad} />
            <StatsLine text="all" value={good + bad + neutral} />
            <StatsLine
              text="average"
              value={(good - bad) / (good + neutral + bad)}
            />
            <StatsLine
              text="positive"
              value={(good / (good + neutral + bad)) * 100}
            />
          </tbody>
        </table>
        /* <div>all {all}</div>
      <div>average {avg}</div>
      <div>positive {positive}</div> */
        /* <div>all {good + neutral + bad}</div> */
        /* <div>average {(good - bad) / (good + neutral + bad)}</div>
      <div>positive {(good / (good + neutral + bad)) * 100}%</div> */
      )}
    </div>
  );

  // const History = (props) => {
  //   if (props.allClicks.length === 0) {
  //     return <div>click any button to show history</div>;
  //   }
  //   return <div>button press history: {props.allClicks.join(' ')}</div>;
  // };

  // const Button = ({ handleclick, text }) => (
  //   <button onClick={handleclick}>{text}</button>
  // );

  // const App = () => {
  //   // const [clicks, setClicks] = useState({ left: 0, right: 0 });
  //   const [left, setLeft] = useState(0);
  //   const [right, setRight] = useState(0);
  //   const [allClicks, setAll] = useState([]);
  //   const [total, setTotal] = useState(0);

  //   const handleLeftClick = () => {
  //     setAll(allClicks.concat('L'));
  //     const updatedLeft = left + 1;
  //     setLeft(updatedLeft);
  //     setTotal(updatedLeft + right);
  //   };
  //   const handleRightClick = () => {
  //     setAll(allClicks.concat('R'));
  //     const updatedRight = right + 1;
  //     setRight(updatedRight);
  //     setTotal(left + updatedRight);
  //   };

  //   return (
  //     <div>
  //       {left}
  //       <Button handleclick={handleLeftClick} text="left" />
  //       {/* <button onClick={handleLeftClick}>left</button> */}
  //       <Button handleclick={handleRightClick} text="right" />
  //       {/* <button onClick={handleRightClick}>right</button> */}
  //       {right}
  //       {/* <p>button press history: {allClicks.join(' ')}</p> */}
  //       <History allClicks={allClicks} />
  //       <p>Total: {total}</p>
  //     </div>
  //   );
};

export default App;
