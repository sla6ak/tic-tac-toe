import { getRandomInt } from "./getRandomInt";
import { winCombinations } from "./winCombinations";

export const getBestMove = ({ letter, gameBoard, emptyArr }) => {
  // первым ходом бот старается занять центр
  if (gameBoard[4].state === "" && emptyArr.length > 6) {
    return { el: gameBoard[4], ind: 4 };
  }

  // бот старается занять углы но только если бот начинал
  if (emptyArr.length > 6) {
    let variants = [0, 2, 6, 8];
    const moveSquare = variants.find((el) => gameBoard[el].state === "");
    return { el: gameBoard[moveSquare], ind: moveSquare };
  }

  if (emptyArr.length < 7) {
    // нужно проверить вначале может ли бот выиграть
    const winBot = canWin({ letter, winCombinations, emptyArr, gameBoard });
    if (winBot) {
      const ind = winBot.find((el) => {
        return gameBoard[el].state === "";
      });
      return { el: gameBoard[ind], ind: ind };
    }

    // теперь проверить может ли человек выиграть и помешать ему
    const winPlayer = canWin({
      letter: letter === "x" ? "o" : "x",
      winCombinations,
      emptyArr,
      gameBoard,
    });

    if (winPlayer) {
      const ind = winPlayer.find((el) => gameBoard[el].state === "");
      return { el: gameBoard[ind], ind: ind };
    }
  }

  let z = getRandomInt(emptyArr.length - 1);
  return { el: emptyArr[z], ind: emptyArr[z].id - 1 };
};

function canWin({ letter, winCombinations, emptyArr, gameBoard }) {
  let winGame = null;
  let arrBoards = []; // массив всех возможных массивов после хода

  // создадим N массивов из доступных клеток
  emptyArr.forEach((element) => {
    arrBoards.push(move({ element, ind: element.id - 1, letter, gameBoard }));
  });

  // найдем выигранную доску после хода
  const winBoard = arrBoards.find((el) => {
    // запишем выигрывающую линию
    winGame = findWin({ winCombinations, board: el, letter });
    return winGame ? true : null;
  });
  // должен быть массив с выигрывающим результатом или null
  return winGame;
}

// имитация хода получает букву и возвращает массив
function move({ element, ind, letter, gameBoard }) {
  let nextBoard = [...gameBoard];
  const newSquare = { id: element.id, state: letter, move: "bot" };
  nextBoard.splice(ind, 1, newSquare);
  return nextBoard;
}

// поиск победных линий в конкретной доске
function findWin({ winCombinations, board, letter }) {
  const findWin = winCombinations.find(
    (el) =>
      board[el[0]].state === letter &&
      board[el[1]].state === letter &&
      board[el[2]].state === letter
  );
  return findWin ? findWin : null;
}
