class getBestMove {
  constructor() {
    this.n = 0;
  }
  getMoveLvl = ({ lvl, letter, winCombinations, emptyArr, gameBoard }) => {
    let res = emptyArr[0];
    if (lvl === "easy") {
      res = this.getMoveLvl1({ emptyArr });
    } else if (lvl === "normal") {
      res = this.getMoveLvl2({
        letter,
        winCombinations,
        gameBoard,
        emptyArr,
      });
    } else if (lvl === "hard") {
      res = this.getMoveLvl3({
        letter,
        winCombinations,
        gameBoard,
        emptyArr,
      });
    } else if (lvl === "impossible") {
      res = this.getMoveLvl4({
        letter,
        winCombinations,
        gameBoard,
        emptyArr,
      });
    }
    return res;
  };

  getMoveLvl1 = ({ emptyArr }) => {
    const x = this.getRandomInt(emptyArr.length);
    const res = { el: emptyArr[x], ind: emptyArr[x].id - 1 };
    return res;
  };

  getMoveLvl2 = ({ letter, winCombinations, emptyArr, gameBoard }) => {
    // ручной ввод ходов 3*3
    if (gameBoard.length === 9) {
      if (emptyArr.length > 7) {
        const res = emptyArr.find((el) => el.id === 5);
        if (res) {
          return { el: res.id, ind: res.id - 1 };
        }
      }
    }
    // ручной ввод ходов 4*4
    if (gameBoard.length === 16) {
      if (emptyArr.length > 14) {
        const arr = [6, 7, 10, 11, 0];
        const x = arr[this.getRandomInt(4)];
        const res = emptyArr.find((el) => el.id === x);
        if (res) {
          return { el: res.id, ind: res.id - 1 };
        }
      }
    }
    // ручной ввод ходов 5*5
    if (gameBoard.length === 25) {
      const res = emptyArr.find((el) => el.id === 13);
      if (res) {
        return { el: res.id, ind: res.id - 1 };
      }
    }
    // нужно проверить вначале может ли бот выиграть
    const winBot = this.canWin({
      letter,
      winCombinations,
      emptyArr,
      gameBoard,
    });
    if (winBot) {
      const ind = winBot.find((el) => gameBoard[el].letter === "");
      return { el: gameBoard[ind], ind: ind };
    }
    const elseMove = this.getMoveLvl1({ emptyArr });
    return elseMove;
  };

  getMoveLvl3 = ({ letter, winCombinations, emptyArr, gameBoard }) => {
    // ручной ввод ходов 3*3
    if (gameBoard.length === 9) {
      if (emptyArr.length > 7) {
        const res = emptyArr.find((el) => el.id === 5);
        if (res) {
          return { el: res.id, ind: res.id - 1 };
        }
      }
    }
    // ручной ввод ходов 4*4
    if (gameBoard.length === 16) {
      if (emptyArr.length > 14) {
        const arr = [6, 7, 10, 11, 0];
        const x = arr[this.getRandomInt(4)];
        const res = emptyArr.find((el) => el.id === x);
        if (res) {
          return { el: res.id, ind: res.id - 1 };
        }
      }
    }
    // ручной ввод ходов 5*5
    if (gameBoard.length === 25) {
      const res = emptyArr.find((el) => el.id === 13);
      if (res) {
        return { el: res.id, ind: res.id - 1 };
      }
    }
    // нужно проверить вначале может ли бот выиграть
    const winBot = this.canWin({
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
      letter: letter === "x" ? "o" : "x",
      winCombinations,
      emptyArr,
      gameBoard,
    });
    if (winPlayer) {
      const ind = winPlayer.find((el) => gameBoard[el].letter === "");
      return { el: gameBoard[ind], ind: ind };
    }
    const elseMove = this.getMoveLvl1({ emptyArr });
    return elseMove;
  };

  getMoveLvl4 = ({ letter, winCombinations, emptyArr, gameBoard }) => {
    // ручной ввод ходов 3*3
    if (gameBoard.length === 9) {
      if (emptyArr.length > 7) {
        const res = emptyArr.find((el) => el.id === 5);
        if (res) {
          return { el: res.id, ind: res.id - 1 };
        }
      }
    }
    // ручной ввод ходов 4*4
    if (gameBoard.length === 16) {
      if (emptyArr.length > 14) {
        const arr = [6, 7, 10, 11, 0];
        const x = arr[this.getRandomInt(4)];
        const res = emptyArr.find((el) => el.id === x);
        if (res) {
          return { el: res.id, ind: res.id - 1 };
        }
      }
    }
    // ручной ввод ходов 5*5
    if (gameBoard.length === 25) {
      const res = emptyArr.find((el) => el.id === 13);
      if (res) {
        return { el: res.id, ind: res.id - 1 };
      }
    }
    // нужно проверить вначале может ли бот выиграть
    const winBot = this.canWin({
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
    const isWinBot = this.findWinVariable({
      letter: letter === "x" ? "o" : "x",
      winCombinations,
      board: gameBoard,
    });
    if (isWinBot) {
      // console.log("итоговый вариант: ", isWinBot);
      // isWinBot === [из 3 или 4х индексов]
      if (isWinBot.length === 3) {
        const findVariableIND = isWinBot
          .reverse()
          .find((el) => gameBoard[el].letter === "");
        return { el: gameBoard[findVariableIND], ind: findVariableIND };
      }
      if (isWinBot.length === 4) {
        if (gameBoard[isWinBot[2]].letter === "") {
          return { el: gameBoard[isWinBot[2]], ind: isWinBot[2] };
        }
        if (gameBoard[isWinBot[1]].letter === "") {
          return { el: gameBoard[isWinBot[1]], ind: isWinBot[1] };
        }
        if (gameBoard[isWinBot[0]].letter === "") {
          return { el: gameBoard[isWinBot[0]], ind: isWinBot[0] };
        }
        if (gameBoard[isWinBot[3]].letter === "") {
          return { el: gameBoard[isWinBot[3]], ind: isWinBot[3] };
        }
      }
    }
    const elseMove = this.getMoveLvl1({ emptyArr });
    return elseMove;
  };

  canWin = ({ letter, winCombinations, emptyArr, gameBoard }) => {
    let findPosition = null;
    let arrBoards = []; // массив всех возможных массивов после хода

    // создадим N массивов из доступных клеток
    emptyArr.forEach((element) => {
      arrBoards.push(
        this.move({ element, ind: element.id - 1, letter, gameBoard })
      );
    });
    // найдем выигранную вариант после хода
    const winBoard = arrBoards.find((el) => {
      // запишем выигрывающую линию
      findPosition = this.findWin({ winCombinations, board: el, letter });
      return findPosition ? true : null;
    });
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
  // поиск победных линий (3 в ряд) в конкретной доске
  findWinVariable = ({ winCombinations, board, letter }) => {
    if (winCombinations[0].length === 3) {
      const findWin = winCombinations.find(
        (el) =>
          board[el[0]].letter !== letter &&
          board[el[1]].letter !== letter &&
          board[el[2]].letter !== letter
      );
      return findWin ? findWin : null;
    }
    // сложная логика для большой сетки
    if (winCombinations[0].length === 4) {
      let l = letter === "x" ? "o" : "x";

      // найдем массив доступных для победы массивов
      const findWinArr = winCombinations.filter(
        (el) =>
          board[el[0]].letter !== letter &&
          board[el[1]].letter !== letter &&
          board[el[2]].letter !== letter &&
          board[el[3]].letter !== letter
      );
      if (findWinArr.length === 0) {
        return null;
      }

      // попробуем найти в этом массиве те массивы в которых уже есть несколько наших букв
      let arrW2L = findWinArr.find((el) => {
        if (board[el[0]].letter === l && board[el[1]].letter === l) {
          return true;
        }
        if (board[el[0]].letter === l && board[el[2]].letter === l) {
          return true;
        }
        if (board[el[0]].letter === l && board[el[3]].letter === l) {
          return true;
        }
        if (board[el[1]].letter === l && board[el[2]].letter === l) {
          return true;
        }
        if (board[el[1]].letter === l && board[el[3]].letter === l) {
          return true;
        }
        if (board[el[2]].letter === l && board[el[3]].letter === l) {
          return true;
        }
        return false;
      });

      if (arrW2L) {
        return arrW2L;
      }
      // проверим не опережает ли соперник нас на ход
      const opponentStart = this.findVariableForOpponent({
        winCombinations,
        board,
        letter,
      });

      if (opponentStart) {
        return opponentStart;
      }
      // если нет двух то хоть 1 букву найдем
      let arrW1L = findWinArr.find((el) => {
        return (
          board[el[0]].letter === l ||
          board[el[1]].letter === l ||
          board[el[2]].letter === l ||
          board[el[3]].letter === l
        );
      });

      // если для победы доступен только пустой вариант вернем его
      if (arrW1L) {
        return arrW1L;
      }
      // если что-то нашло но нет ни 1й буквы то вернем просто доступную линию.
      return findWinArr[0];
    }
  };

  findVariableForOpponent = ({ winCombinations, board, letter }) => {
    let l = letter === "x" ? "o" : "x";
    // найдем массив доступных для победы соперником массивов
    const findWinArr = winCombinations.filter(
      (el) =>
        board[el[0]].letter !== l &&
        board[el[1]].letter !== l &&
        board[el[2]].letter !== l &&
        board[el[3]].letter !== l
    );
    if (findWinArr.length === 0) {
      return null;
    }
    // попробуем найти в этом массиве те массивы в которых уже есть несколько букв соперника
    let arrW2L = findWinArr.find((el) => {
      if (board[el[0]].letter === letter && board[el[1]].letter === letter) {
        return true;
      }
      if (board[el[0]].letter === letter && board[el[2]].letter === letter) {
        return true;
      }
      if (board[el[0]].letter === letter && board[el[3]].letter === letter) {
        return true;
      }
      if (board[el[1]].letter === letter && board[el[2]].letter === letter) {
        return true;
      }
      if (board[el[1]].letter === letter && board[el[3]].letter === letter) {
        return true;
      }
      if (board[el[2]].letter === letter && board[el[3]].letter === letter) {
        return true;
      }
      return false;
    });

    if (arrW2L) {
      return arrW2L;
    }
    return null;
  };

  getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  };
}

export default new getBestMove();
