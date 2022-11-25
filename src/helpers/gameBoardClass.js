class gameBoardClass {
  constructor() {
    this.elemBoard = { id: "", letter: "", move: "" };
    this.counter = 0;
    this.counterPrived = 0;
  }
  getSmallBoard = () => {
    let smallBoard = [];
    for (this.counter = 1; this.counter <= 9; this.counter += 1) {
      const elementBoard = { ...this.elemBoard, id: this.counter };
      smallBoard.push(elementBoard);
    }
    return smallBoard;
  };
  getMiddleBoard = () => {
    let middleBoard = [];
    for (this.counter = 1; this.counter <= 16; this.counter += 1) {
      const elementBoard = { ...this.elemBoard, id: this.counter };
      middleBoard.push(elementBoard);
    }
    return middleBoard;
  };
  getBigBoard = () => {
    let bigBoard = [];
    for (this.counter = 1; this.counter <= 25; this.counter += 1) {
      const elementBoard = { ...this.elemBoard, id: this.counter };
      bigBoard.push(elementBoard);
    }
    return bigBoard;
  };
  getWinCombinationSmallBoard = () => {
    const winCombination = this.calculatorWinPosition(this.getSmallBoard());
    return winCombination;
  };
  getWinCombinationMiddleBoard = () => {
    const winCombination = this.calculatorWinPosition(this.getMiddleBoard());
    return winCombination;
  };
  getWinCombinationBigBoard = () => {
    const winCombinationLong = this.calculatorWinPosition(this.getBigBoard());
    const winCombination = [
      [1, 7, 13, 19],
      [3, 7, 11, 15],
      [5, 11, 17, 23],
      [9, 13, 17, 21],
      ...winCombinationLong.map((el) => {
        el.splice(0, 1);
      }),
      ...winCombinationLong.map((el) => {
        el.splice(4, 1);
      }),
    ];
    return winCombination;
  };

  // принимает длинну сетки и возвращает массив выиграшных линий
  calculatorWinPosition = (board) => {
    const lengBoard = board.length;
    const lengHorizontal = Math.sqrt(lengBoard);
    const step = lengHorizontal - 1;
    let diagonal = [];
    let gorizontal = [];
    let vertical = [];
    const arrBoard = this.getVeryBigBoard();

    // всегда вернет массив из 2х эл
    // ищем элементы с шагом +1
    diagonal.push(
      (() => {
        const arrS = [];
        for (
          this.counterPrived = step;
          this.counterPrived <= lengBoard - step;
          this.counterPrived += step
        ) {
          arrS.push(this.counterPrived);
        }
        return arrS;
      })()
    );
    // меняем шаг расщета в обратную сторону
    diagonal.push(
      (() => {
        const arrS = [];
        for (
          this.counterPrived = 0;
          this.counterPrived <= lengBoard - 1;
          this.counterPrived += lengHorizontal + 1
        ) {
          arrS.push(this.counterPrived);
        }
        return arrS;
      })()
    );

    for (this.counter = 0; this.counter <= step; this.counter += 1) {
      gorizontal.push(
        // вернет массив из элементов каждый следующий массив состоит из чисел более предыдущего на +длинна сетки
        (() => {
          const arrS = [];
          for (this.counterPrived = 0; this.counterPrived <= step; this.counterPrived += 1) {
            arrS.push(this.counterPrived + this.counter * lengHorizontal);
          }
          return arrS;
        })()
      );

      vertical.push(
        // вернет массив из элементов каждый элемент равент +длинна массива а следующий массив состоит из чисел более предыдущего на +1
        (() => {
          const arrS = [];
          for (this.counterPrived = 0; this.counterPrived <= step; this.counterPrived += 1) {
            arrS.push(this.counter + lengHorizontal * this.counterPrived);
          }
          return arrS;
        })()
      );
    }
    let winCombination = [diagonal, vertical, gorizontal];
    return winCombination;
  };
}
export default new gameBoardClass();
