import { useEffect, useState } from "react";
import "./App.css";
import Box from "./components/Box";
import ParticlesBackground from "./components/ParticlesBackground";

function App() {
  const [boxes, setBoxes] = useState(Array(9).fill(null));
  const [xIsNext, setXisNext] = useState(true);
  const [status, setStatus] = useState("");
  const [resetGame, setResetGame] = useState(false);

  useEffect(() => {
    const winner = checkWinner(boxes);
    if (winner) {
      const string = "Winner: " + winner;
      setStatus(string);
      setResetGame(true);
    } else {
      const string = "Next Player: " + (xIsNext ? "X" : "O");
      setStatus(string);
    }
  }, [status, checkWinner]);

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
      [2, 4, 6],
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
      <ParticlesBackground />
      <div className="container">
        <div className="column">
          <div className="heading">
            <div className="title">Welcome! Let's play..</div>
            <div className="highlight">Tic-Tac-Toe</div>
            <div className="direction">
              <ol>
                <li>
                  Player 1 (X) starts by placing their marker (X) in any empty
                  space on the grid.
                </li>
                <li>
                  Player 2 (O) then places their marker (O) in any remaining
                  empty space.
                </li>
                <li>
                  Players take turns placing their markers until one player gets
                  three of their markers in a row (horizontally, vertically, or
                  diagonally) or until all spaces on the grid are filled.
                </li>
              </ol>
            </div>
          </div>
          <div>
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
          <div>
            <div className="scoreboard">
              <div className="player">{status}</div>
              {resetGame && (
                <div
                  className="reset-game"
                  onClick={() => setBoxes(Array(9).fill(null))}
                >
                  <small>Reset Game</small>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
