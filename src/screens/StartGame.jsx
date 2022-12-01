import { StyleSheet } from "react-native";
import { Text, Flex } from "@react-native-material/core";
import React, { useEffect, useState } from "react";
import { variableThema } from "../helpers/variableThema";
import { Timer } from "../components/timer/Timer";
import gameBoardClass from "../helpers/gameBoardClass";
import getBestMove from "../helpers/getBestMoveClass";
import GameBoard from "../components/gameBoard/GameBoard";
import { ModalWin } from "../components/modalWin/ModalWin";
import HeaderVSbot from "../components/hederVSbot/HeaderVSbot";
import HeaderTurnLetter from "../components/headerTurnLetter/HeaderTurnLetter";

const StartGame = ({ route, navigation }) => {
  const initialWinInfo = {
    result: "",
    winLetter: "",
    nameWin: "",
    winCombination: null,
  };
  const { lvl = null, sizeBoard = 3, startTimer = "" } = route.params;
  const [gameBoard, setGameBoard] = useState(null); // массив с текущим состоянием на доске
  const [winCombinations, setWinCombinations] = useState([]); // содержит победные комбинации для текущего размера доски
  const [turnLetter, setTurnLetter] = useState("x"); // кто ходит? 'player "X"' или 'player "O"'
  const [turnName, setTurnName] = useState("player"); // кто ходит? 'player или bot
  const [winGame, setWinGame] = useState(initialWinInfo); // инфо о завершении игры
  const [btDis, setBtDis] = useState(false);
  const [timeMove, setTimeMove] = useState(9);
  const [whoStart, setWhoStart] = useState("player");
  const [counter, setCounter] = useState({ player: 0, bot: 0 });

  // useEffect(() => {
  //   console.log(winCombinations);
  // }, [winCombinations]);

  // при старте игры создаем доску
  useEffect(() => {
    setGameBoard(() => gameBoardClass.getSizeBoard(sizeBoard));
    setWinCombinations(() => gameBoardClass.getSizeWinCombination(sizeBoard));
    setCounter({ player: 0, bot: 0 });
  }, []);

  // //контролирует кто победил
  useEffect(() => {
    if (!gameBoard) return;
    if (winCombinations === []) return;

    const letter = turnLetter === "x" ? "o" : "x";
    let winG = getBestMove.findWin({ winCombinations, board: gameBoard, letter });
    if (winG) {
      setBtDis(true);
      const nameW = gameBoard[winG[0]].move;
      const letterW = gameBoard[winG[0]].letter;
      setCounter((prevW) => {
        const x = prevW[nameW] + 1;
        return { ...prevW, [nameW]: x };
      });
      setWinGame({
        result: "win",
        winLetter: letterW,
        nameWin: nameW,
        winCombination: winG,
      });
      return;
    }
    //
    const stop = draw();
    if (!stop || stop.length < 1) {
      return;
    }
    // если мы против бота тогда вызываем бота
    if (lvl) {
      if (turnName !== "bot") {
        setBtDis(false);
        return;
      }
      // если игра продолжается тогда ходит бот
      const res = handeleBot({ letter: turnLetter });
      gamePress(res);
      setBtDis(false);
    }
  }, [turnName, turnLetter, gameBoard]);

  // высщитывает куда походить боту
  const handeleBot = ({ letter }) => {
    const emptyArr = draw();
    let res = emptyArr[0];
    if (lvl === "easy") {
      res = getBestMove.getMoveLvl1({ emptyArr });
    } else if (lvl === "normal") {
      res = getBestMove.getMoveLvl2({ letter, winCombinations, gameBoard, emptyArr });
    } else if (lvl === "hard") {
      res = getBestMove.getMoveLvl3({ letter, winCombinations, gameBoard, emptyArr });
    } else if (lvl === "imposible") {
      res = getBestMove.getMoveLvl4({ letter, winCombinations, gameBoard, emptyArr });
    }
    return res;
  };

  // событие нажатия
  const gamePress = ({ el, ind }) => {
    if (gameBoard[ind].letter !== "") {
      return;
    }
    if (timeMove === 0) {
      return;
    }
    const newSquare = { id: el.id, letter: turnLetter, move: turnName };
    setGameBoard((prevState) => {
      prevState.splice(ind, 1, newSquare);
      return [...prevState];
    });
    autoSetPing();
    setTurnLetter((prevL) => (prevL === "x" ? "o" : "x"));
    setTurnName((prevN) => {
      if (lvl) {
        return prevN === "player" ? "bot" : "player";
      }
      return "player";
    });
  };

  // имитация хода бота при таймауте
  useEffect(() => {
    if (timeMove !== 0) {
      return;
    }
    if (winGame.result !== "") {
      return;
    }
    setBtDis(true);
    const letter = turnLetter;
    setTurnLetter((prevL) => (prevL === "x" ? "o" : "x"));
    setTurnName((prevN) => {
      if (lvl) {
        return prevN === "player" ? "bot" : "player";
      }
      return "player";
    });
    autoSetPing();
    const res = handeleBot({ letter });
    gamePress(res);
    setBtDis(false);
    return;
  }, [timeMove]);

  // проверка на ничью
  const draw = () => {
    let emptyArr = gameBoard.filter((el) => el.letter === "");
    if (!emptyArr || emptyArr.length < 1) {
      setWinGame({
        result: "drow",
        winLetter: "",
        nameWin: "",
        winCombination: null,
      });
      setCounter((prevW) => {
        return { bot: prevW.bot + 0.5, player: prevW.player + 0.5 };
      });
      setBtDis(true);
      return [];
    }
    return emptyArr;
  };

  // сбрасываем все настройки на стартовые
  const restart = () => {
    setTimeMove(9);
    setWinGame(initialWinInfo);
    setTurnLetter("x");
    setGameBoard(() => gameBoardClass.getSizeBoard(sizeBoard));
    setBtDis(false);
    if (lvl) {
      setTurnName(whoStart === "bot" ? "player" : "bot");
      setWhoStart((prevStart) => (prevStart === "bot" ? "player" : "bot"));
    }
    return;
  };

  // настройка добавления
  const autoSetPing = () => {
    if (!startTimer) return;
    if (startTimer === "5s") {
      setTimeMove(5);
    }
    if (startTimer === "3s") {
      setTimeMove(3);
    }
    if (startTimer === "1s") {
      setTimeMove(1);
    }
  };

  return (
    <Flex fill center style={styles.conteiner}>
      {lvl ? (
        <HeaderVSbot lvl={lvl} counter={counter} />
      ) : (
        <Text style={{ fontSize: 22, fontWeight: "800", color: "#161616", marginBottom: 20 }}>
          Two Player Game
        </Text>
      )}
      <HeaderTurnLetter turnLetter={turnLetter} turnName={turnName} />
      {gameBoard && winCombinations.length > 1 && (
        <GameBoard
          gamePress={gamePress}
          btDis={btDis}
          sizeBoard={sizeBoard}
          gameBoard={gameBoard}
          winGameCombination={winGame.winCombination}
        />
      )}
      {startTimer !== "" && (
        <Timer timeMove={timeMove} setTimeMove={setTimeMove} startTimer={startTimer} />
      )}
      {winGame.result !== "" && (
        <ModalWin winGame={winGame} restart={restart} navigation={navigation} />
      )}
    </Flex>
  );
};

const styles = StyleSheet.create({
  conteiner: { backgroundColor: "#555", position: "relative" },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#ffffff",
    marginBottom: 20,
  },
  button: {
    marginBottom: 30,
  },
});

export default StartGame;
