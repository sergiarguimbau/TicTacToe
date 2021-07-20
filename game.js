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
    gameStatus = checkValue(`${moves[step * BOARD_SIZE + 0]}${moves[step * BOARD_SIZE + 1]}${moves[step * BOARD_SIZE + 2]}${moves[step * BOARD_SIZE + 3]}${moves[step * BOARD_SIZE + 4]}`);
    return gameStatus !== undefined;
  });

  if (gameStatus) return gameStatus;

  // Check vertical
  steps.find(row => {
    gameStatus = checkValue(`${moves[row + BOARD_SIZE * 0]}${moves[row + BOARD_SIZE * 1]}${moves[row + BOARD_SIZE * 2]}${moves[row + BOARD_SIZE * 3]}${moves[row + BOARD_SIZE * 4]}`);
    return gameStatus !== undefined;
  });

  if (gameStatus) return gameStatus;

  // Check diagonal
  gameStatus = checkValue(`${moves[0 + BOARD_SIZE * 0]}${moves[1 + BOARD_SIZE * 1]}${moves[2 + BOARD_SIZE * 2]}${moves[3 + BOARD_SIZE * 3]}${moves[4 + BOARD_SIZE * 4]}`);
  if (gameStatus) return gameStatus;

  gameStatus = checkValue(`${moves[(BOARD_SIZE - 1) * 1]}${moves[(BOARD_SIZE - 1) * 2]}${moves[(BOARD_SIZE - 1) * 3]}${moves[(BOARD_SIZE - 1) * 4]}${moves[(BOARD_SIZE - 1) * 5]}`);
  if (gameStatus) return gameStatus;

  if (Object.values(moves).length === BOARD_SIZE*BOARD_SIZE && !gameStatus) return "DRAW";

  return gameStatus;
};
