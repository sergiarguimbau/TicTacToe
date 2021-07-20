export const BOARD_SIZE = 5

const steps = [...Array(BOARD_SIZE).keys()];

const X_WIN = "♟".repeat(BOARD_SIZE);
const O_WIN = "♙".repeat(BOARD_SIZE);

const checkValue = value => {
  if (value === X_WIN) {
    return "X_WIN";
  } else if (value === O_WIN) {
    return "O_WIN";
  }
};

export const getGameStatus = moves => {
  let gameStatus;
  // Check horizontal
  steps.find((step, i) => {
    const value = steps.map(number => `${moves[step * BOARD_SIZE + number]}`).join('');
    gameStatus = checkValue(value);
    return gameStatus !== undefined;
  });

  if (gameStatus) return gameStatus;

  // Check vertical
  steps.find(row => {
    const value = steps.map(number => `${moves[row + BOARD_SIZE * number]}`).join('');
    gameStatus = checkValue(value);
    return gameStatus !== undefined;
  });

  if (gameStatus) return gameStatus;

  // Check diagonal
  const value1 = steps.map(number => `${moves[number + BOARD_SIZE * number]}`).join('');
  gameStatus = checkValue(value1);
  if (gameStatus) return gameStatus;

  const value2 = steps.map(number => `${moves[(BOARD_SIZE - 1) * (1 + number)]}`).join('');
  gameStatus = checkValue(value2);
  if (gameStatus) return gameStatus;

  if (Object.values(moves).length === BOARD_SIZE*BOARD_SIZE && !gameStatus) return "DRAW";

  return gameStatus;
};
