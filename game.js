const checkValue = (value, boardSize) => {

  const X_WIN = "♟".repeat(boardSize);
  const O_WIN = "♙".repeat(boardSize);

  if (value === X_WIN) {
    return "X_WIN";
  } else if (value === O_WIN) {
    return "O_WIN";
  }
};

export const getGameStatus = (moves, boardSize) => {

  const steps = [...Array(boardSize).keys()];

  let gameStatus;
  // Check horizontal
  steps.find((step, i) => {
    const value = steps.map(number => `${moves[step * boardSize + number]}`).join('');
    gameStatus = checkValue(value, boardSize);
    return gameStatus !== undefined;
  });

  if (gameStatus) return gameStatus;

  // Check vertical
  steps.find(row => {
    const value = steps.map(number => `${moves[row + boardSize * number]}`).join('');
    gameStatus = checkValue(value, boardSize);
    return gameStatus !== undefined;
  });

  if (gameStatus) return gameStatus;

  // Check diagonal
  const value1 = steps.map(number => `${moves[number + boardSize * number]}`).join('');
  gameStatus = checkValue(value1, boardSize);
  if (gameStatus) return gameStatus;

  const value2 = steps.map(number => `${moves[(boardSize - 1) * (1 + number)]}`).join('');
  gameStatus = checkValue(value2, boardSize);
  if (gameStatus) return gameStatus;

  if (Object.values(moves).length === boardSize * boardSize && !gameStatus) return "DRAW";

  return gameStatus;
};
