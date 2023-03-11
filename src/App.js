import { useState } from 'react';
import './App.css';
import Box from './component/Box';

function App() {

  const [boxes, setBoxes] = useState(Array(9).fill(null));
  const [xIsNext, setXisNext] = useState(true);

  const winner = checkWinner(boxes);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next Player: " + (xIsNext ? "X" : "O");
  }

  function handleClick(position) {
    if (boxes[position] || checkWinner(boxes)) {
      return;
    }
    const nextBoxes = boxes.slice();
    if (xIsNext) {
      nextBoxes[position] = "X";
    } else {
      nextBoxes[position] = "O";
    }
    setBoxes(nextBoxes);
    setXisNext(!xIsNext);
  }

  function checkWinner(boxes) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (boxes[a] && boxes[a] === boxes[b] && boxes[a] === boxes[c]) {
        return boxes[a];
      }
    }
    return null;
  }

  return (
    <div className="App">
      <div className="container">
        <div className="heading">
          <div className="title">Welcome to my <span className="highlight">Tic-Tac-Toe!</span></div>
        </div>

        <div className="scoreboard">
          <div className="score-title">Score Board</div>
          {/* <div className="player">Player X : 5</div>
          <div className="player">Player O : 3</div> */}
          <div className="player">{ status }</div>
        </div>

        <div className="row">
          <Box value={boxes[0]} onBoxClick={() => handleClick(0)} />
          <Box value={boxes[1]} onBoxClick={() => handleClick(1)} />
          <Box value={boxes[2]} onBoxClick={() => handleClick(2)} />
        </div>
        <div className="row">
          <Box value={boxes[3]} onBoxClick={() => handleClick(3)} />
          <Box value={boxes[4]} onBoxClick={() => handleClick(4)} />
          <Box value={boxes[5]} onBoxClick={() => handleClick(5)} />
        </div>
        <div className="row">
          <Box value={boxes[6]} onBoxClick={() => handleClick(6)} />
          <Box value={boxes[7]} onBoxClick={() => handleClick(7)} />
          <Box value={boxes[8]} onBoxClick={() => handleClick(8)} />
        </div>
      </div>
    </div>
  );
}

export default App;
