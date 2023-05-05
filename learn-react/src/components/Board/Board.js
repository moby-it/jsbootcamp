import { useState } from 'react';
import Square from '../Square/Square';
import { calculateWinner } from '../../business/calculateWinner';

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [nextValue, setNextValue] = useState('X');
  const [gameStatus, setGameStatus] = useState({ description: 'Game Started', completed: false });
  function setSquare(index) {
    return () => {
      if (gameStatus.completed) return;
      const newSquares = squares.slice();
      newSquares[index] = nextValue;
      setNextValue(nextValue === 'X' ? 'O' : 'X');
      setSquares(newSquares);
      const winner = calculateWinner(newSquares);
      if (winner) {
        setGameStatus({ description: `We have a winner: ${winner}`, completed: true });
      }
    };
  }
  return (
    <>
      <h2>{gameStatus.description}</h2>
      <div className="board-row">
        <Square value={squares[0]} setter={setSquare(0)} />
        <Square value={squares[1]} setter={setSquare(1)} />
        <Square value={squares[2]} setter={setSquare(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} setter={setSquare(3)}/>
        <Square value={squares[4]} setter={setSquare(4)}/>
        <Square value={squares[5]} setter={setSquare(5)}/>
      </div>
      <div className="board-row">
        <Square value={squares[6]} setter={setSquare(6)}/>
        <Square value={squares[7]} setter={setSquare(7)}/>
        <Square value={squares[8]} setter={setSquare(8)}/>
      </div>
    </>
  );
}