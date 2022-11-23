class getBastMove {
  constructor() {
    this.n = 0;
  }

  getMoveLvl1 = ({ emptyArr }) => {
    const x = this.getRandomInt(emptyArr.length);
    const res = { el: emptyArr[x], ind: emptyArr[x].id - 1 };
    return res;
  };

  getMoveLvl2 = ({ letter, winCombinations, emptyArr, gameBoard }) => {
    // нужно проверить вначале может ли бот выиграть
    const winBot = this.canWin({
      variable: false,
      letter,
      winCombinations,
      emptyArr,
      gameBoard,
    });
    if (winBot) {
      const ind = winBot.find((el) => gameBoard[el].letter === "");
      return { el: gameBoard[ind], ind: ind };
    }
    const elseMove = this.getMoveLvl1();
    return elseMove;
  };

  getMoveLvl3 = ({ letter, winCombinations, emptyArr, gameBoard }) => {
    // нужно проверить вначале может ли бот выиграть
    const winBot = this.canWin({
      variable: false,
      letter,
      winCombinations,
      emptyArr,
      gameBoard,
    });
    if (winBot) {
      const ind = winBot.find((el) => gameBoard[el].letter === "");
      return { el: gameBoard[ind], ind: ind };
    }
    // теперь проверить может ли человек выиграть и помешать ему
    const winPlayer = this.canWin({
      variable: false,
      letter: letter === "x" ? "o" : "x",
      winCombinations,
      emptyArr,
      gameBoard,
    });
    if (winPlayer) {
      const ind = winPlayer.find((el) => gameBoard[el].letter === "");
      return { el: gameBoard[ind], ind: ind };
    }
    const elseMove = this.getMoveLvl1();
    return elseMove;
  };

  getMoveLvl4 = ({ letter, winCombinations, emptyArr, gameBoard }) => {
    // нужно проверить вначале может ли бот выиграть
    const winBot = this.canWin({
      variable: false,
      letter,
      winCombinations,
      emptyArr,
      gameBoard,
    });
    if (winBot) {
      const ind = winBot.find((el) => gameBoard[el].letter === "");
      return { el: gameBoard[ind], ind: ind };
    }
    // теперь проверить может ли человек выиграть и помешать ему
    const winPlayer = this.canWin({
      variable: false,
      letter: letter === "x" ? "o" : "x",
      winCombinations,
      emptyArr,
      gameBoard,
    });
    if (winPlayer) {
      const ind = winPlayer.find((el) => gameBoard[el].letter === "");
      return { el: gameBoard[ind], ind: ind };
    }
    // теперь проверить есть ли пустые массивы для победы в которых еще нет буквы от игрока
    const isWinBot = this.canWin({
      variable: true,
      letter: letter === "x" ? "o" : "x",
      winCombinations,
      emptyArr,
      gameBoard,
    });
    if (isWinBot) {
      const ind = isWinBot.find((el) => gameBoard[el].letter === "");
      return { el: gameBoard[ind], ind: ind };
    }
    const elseMove = this.getMoveLvl1();
    return elseMove;
  };

  canWin = ({ variable, letter, winCombinations, emptyArr, gameBoard }) => {
    let findPosition = null;
    let arrBoards = []; // массив всех возможных массивов после хода

    // создадим N массивов из доступных клеток
    emptyArr.forEach((element) => {
      arrBoards.push(move({ element, ind: element.id - 1, letter, gameBoard }));
    });
    if (variable) {
      // найдем выигранную позицию после хода
      const winBoard = arrBoards.findVariableWin((el) => {
        // запишем выигрывающую линию
        findPosition = this.findWin({ winCombinations, board: el, letter });
        return findPosition ? true : null;
      });
    }
    if (!variable) {
      // найдем выигранную вариант после хода
      const winBoard = arrBoards.find((el) => {
        // запишем выигрывающую линию
        findPosition = this.findWin({ winCombinations, board: el, letter });
        return findPosition ? true : null;
      });
    }
    // должен быть массив с выигрывающим результатом или null
    return findPosition;
  };

  // имитация хода получает букву и возвращает массив
  move = ({ element, ind, letter, gameBoard }) => {
    let nextBoard = [...gameBoard];
    const newSquare = { id: element.id, letter: letter, move: "bot" };
    nextBoard.splice(ind, 1, newSquare);
    return nextBoard;
  };

  // поиск победных линий (3 в ряд) в конкретной доске
  findWin = ({ winCombinations, board, letter }) => {
    if (winCombinations[0].length === 3) {
      const findWin = winCombinations.find(
        (el) =>
          board[el[0]].letter === letter &&
          board[el[1]].letter === letter &&
          board[el[2]].letter === letter
      );
      return findWin ? findWin : null;
    }
    if (winCombinations[0].length === 4) {
      const findWin = winCombinations.find(
        (el) =>
          board[el[0]].letter === letter &&
          board[el[1]].letter === letter &&
          board[el[2]].letter === letter &&
          board[el[3]].letter === letter
      );
      return findWin ? findWin : null;
    }
  };

  findVariableWin = ({ winCombinations, board, letter }) => {
    if (winCombinations[0].length === 3) {
      const findWin = winCombinations.find(
        (el) =>
          board[el[0]].letter !== letter &&
          board[el[1]].letter !== letter &&
          board[el[2]].letter !== letter
      );
      return findWin ? findWin : null;
    }
    if (winCombinations[0].length === 4) {
      const findWin = winCombinations.find(
        (el) =>
          board[el[0]].letter !== letter &&
          board[el[1]].letter !== letter &&
          board[el[2]].letter !== letter &&
          board[el[3]].letter !== letter
      );
      return findWin ? findWin : null;
    }
  };

  getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  };
}
