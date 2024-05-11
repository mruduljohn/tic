import {initJuno} from '@junobuild/core';
await initJuno({
  satelliteId: "g4mbu-jiaaa-aaaal-ajdza-cai"
});
import { useState } from 'react';
import { Board } from './components/Board';

function App() {
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);
  const [board, setBoard] = useState(Array(9).fill(null));

  const handleCellClick = (index) => {
    if (board[index] || winner) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const newWinner = calculateWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  }

  const calculateWinner = (board) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    return null;
  };

  const resetGame = () => {
    setCurrentPlayer('X');
    setWinner(null);
    setBoard(Array(9).fill(null));
  };

  return (
    <div className="relative isolate min-h-[100dvh]">
      <main className="mx-auto max-w-screen-2xl py-16 px-8 md:px-24 tall:min-h-[calc(100dvh-128px)]">
        <h1 className="dark:text-white text-5xl md:text-6xl font-extrabold md:pt-16">
          Welcome to Tic Tac Toe
        </h1>

        <Board board={board} onCellClick={handleCellClick} />

        {winner && (
          <div className="mt-8">
            <p className="text-2xl font-bold">
              Winner: {winner}
            </p>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={resetGame}>
              Reset Game
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;