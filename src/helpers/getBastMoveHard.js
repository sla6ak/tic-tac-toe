import { getRandomInt } from "./getRandomInt";
import { winCombinationsH } from "./winCombinations";

export const getBestMoveH = ({ letter, gameBoard, emptyArr }) => {
  // бот старается занять центр
  if (emptyArr.length > 12) {
    let variants = [5, 6, 9, 10];
    let x = 3;
    function recurse() {
      x = getRandomInt(3);
      if (gameBoard[variants[x]].state === "") {
        return;
      } else {
        recurse();
      }
    }
    recurse();
    const res = { el: { ...gameBoard[variants[x]], move: "bot" }, ind: variants[x] };
    return res;
  }

  if (emptyArr.length < 13) {
    // нужно проверить вначале может ли бот выиграть
    const winBot = canWin({ letter, winCombinationsH, emptyArr, gameBoard });
    if (winBot) {
      const ind = winBot.find((el) => {
        return gameBoard[el].state === "";
      });
      const res = { el: { ...gameBoard[ind], move: "bot" }, ind: ind };
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
      const res = { el: { ...gameBoard[ind], move: "bot" }, ind: ind };
      return res;
    }
  }
  let z = getRandomInt(emptyArr.length - 1);
  const res = { el: { ...emptyArr[z], move: "bot" }, ind: emptyArr[z].id - 1 };
  return res;
};

const canWin = ({ letter, winCombinationsH, emptyArr, gameBoard }) => {
  let winGame = null;
  let arrBoards = []; // массив всех возможных массивов после хода

  // создадим N массивов из доступных клеток
  emptyArr.forEach((element) => {
    arrBoards.push(move({ element, ind: element.id - 1, letter, gameBoard }));
  });

  // найдем выигранную доску после хода
  const winBoard = arrBoards.find((el) => {
    // запишем выигрывающую линию
    winGame = findWin({ winCombinationsH, gameBoard: el, letter });
    return winGame ? true : null;
  });
  // должен быть массив с выигрывающим результатом или null
  return winGame;
};

// имитация хода получает букву и возвращает массив
const move = ({ element, ind, letter, gameBoard }) => {
  let nextBoard = [...gameBoard];
  const newSquare = { id: element.id, state: letter, move: "bot" };
  nextBoard.splice(ind, 1, newSquare);
  return nextBoard;
};

// поиск победных линий в конкретной доске
const findWin = ({ winCombinationsH, gameBoard, letter }) => {
  const findWin = winCombinationsH.find(
    (el) =>
      gameBoard[el[0]].state === letter &&
      gameBoard[el[1]].state === letter &&
      gameBoard[el[2]].state === letter &&
      gameBoard[el[3]].state === letter
  );
  return findWin ? findWin : null;
};
