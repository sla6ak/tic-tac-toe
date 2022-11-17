import { getRandomInt } from "./getRandomInt";
import { winCombinationsH } from "./winCombinations";

export const getBestMoveH = ({ letter, gameBoard, emptyArr }) => {
  // бот старается занять центр первые 3 хода
  if (emptyArr.length >= 12) {
    let variants = [5, 6, 9, 10, 0, 3, 14, 15];
    let moveSquare = variants.find((el) => gameBoard[el].state === "");
    const res = { el: gameBoard[moveSquare], ind: moveSquare };
    return res;
  }

  if (emptyArr.length <= 11) {
    // нужно проверить вначале может ли бот выиграть
    const winBot = canWin({
      letter,
      winCombinationsH,
      emptyArr,
      gameBoard,
    });

    if (winBot) {
      const ind = winBot.find((el) => {
        return gameBoard[el].state === "";
      });
      const res = { el: gameBoard[ind], ind: ind };
      return res;
    }

    // теперь проверить может ли человек выиграть и помешать ему
    const winPlayer = canWin({
      letter: letter === "x" ? "o" : "x",
      winCombinationsH,
      emptyArr,
      gameBoard,
    });

    if (winPlayer) {
      const ind = winPlayer.find((el) => gameBoard[el].state === "");
      const res = { el: gameBoard[ind], ind: ind };
      return res;
    }
  }

  let z = getRandomInt(emptyArr.length - 1);
  const res = { el: { ...emptyArr[z], move: "bot" }, ind: emptyArr[z].id - 1 };
  return res;
};

function canWin({ letter, winCombinationsH, emptyArr, gameBoard }) {
  let winGame = null;
  let arrBoards = []; // массив всех возможных массивов после хода

  // создадим N массивов из доступных клеток
  emptyArr.forEach((element) => {
    arrBoards.push(move({ element, ind: element.id - 1, letter, gameBoard }));
  });
  // найдем выигранную доску после хода
  let winBoard = arrBoards.find((el) => {
    // запишем выигрывающую линию
    winGame = findWin({ winCombinationsH, board: el, letter });
    return winGame ? true : null;
  });
  // должен быть массив с выигрывающим результатом или null
  return winGame;
}

// имитация хода получает букву и возвращает массив
function move({ element, ind, letter, gameBoard }) {
  let nextBoard = [...gameBoard];
  nextBoard.splice(ind, 1, {
    id: element.id,
    state: letter,
    move: "bot",
    point: "искуственный ход",
  });
  return nextBoard;
}

// поиск победных линий в конкретной доске
function findWin({ winCombinationsH, board, letter }) {
  const findWin = winCombinationsH.find(
    (el) =>
      board[el[0]].state === letter &&
      board[el[1]].state === letter &&
      board[el[2]].state === letter &&
      board[el[3]].state === letter
  );
  return findWin ? findWin : null;
}
