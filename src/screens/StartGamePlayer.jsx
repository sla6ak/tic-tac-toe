import { StyleSheet, Dimensions } from "react-native";
import { Text, Flex, Button } from "@react-native-material/core";
import React, { useEffect, useState } from "react";
import { variableThema } from "../helpers/variableThema";
import { Timer } from "../components/timer/Timer";
import gameBoardClass from "../helpers/gameBoardClass";
import MathCounterPlayers from "../components/mathCounterPlayers/MathCounterPlayers";
import getBestMove from "../helpers/getBestMoveClass";
import GameBoard from "../components/gameBoard/GameBoard";
import { ModalWin } from "../components/modalWin/ModalWin";
import HeaderTurnLetter from "../components/headerTurnLetter/HeaderTurnLetter";
import ButtonCast from "../components/buttonCast/ButtonCast";
import { useDispatch } from "react-redux";
import {
  homeMusicStatus,
  drawMusicStatus,
  looseMusicStatus,
  winMusicStatus,
} from "../redux/audioManager";
import { useSelector } from "react-redux";

const StartGamePlayer = ({ route, navigation }) => {
  const { mute } = useSelector((state) => state.audioManager);
  const dispatch = useDispatch();
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
  const [turnName, setTurnName] = useState("player1"); // кто ходит? 'player или bot
  const [winGame, setWinGame] = useState(initialWinInfo); // инфо о завершении игры
  const [btDis, setBtDis] = useState(false);
  const [timeMove, setTimeMove] = useState(9);
  const [timerStop, setTimerStop] = useState(false);
  const [whoStart, setWhoStart] = useState("player1");
  const [counter, setCounter] = useState({ player1: 0, player2: 0 });
  const [modalOpen, setModalOpen] = useState(false);

  // при старте игры создаем доску
  useEffect(() => {
    setGameBoard(() => gameBoardClass.getSizeBoard(sizeBoard));
    setWinCombinations(() => gameBoardClass.getSizeWinCombination(sizeBoard));
    setCounter({ player1: 0, player2: 0 });
  }, []);

  // открывает модалку и отключает музыку
  useEffect(() => {
    if (winGame.result === "") return;
    if (!mute) dispatch(homeMusicStatus(false));
    if (winGame.result !== "") {
      setModalOpen(true);
      return;
    }
  }, [winGame]);

  // контролирует кто победил
  useEffect(() => {
    if (!gameBoard) return;
    if (winCombinations === []) return;
    const winBoolean = win();
    if (winBoolean) return;
    // контролирует возможны ли еще ходы
    const stop = draw();
    if (stop.length === gameBoard.length - 1) {
      setTimeMove(9);
    }
    if (!stop || stop.length < 1) {
      return;
    }
    setBtDis(false);
  }, [turnName, gameBoard]);

  // событие нажатия
  const gamePress = ({ el, ind }) => {
    try {
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
        return prevN === "player1" ? "player2" : "player1";
      });
    } catch (error) {
      console.log(error);
    }
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
      return prevN === "player1" ? "player2" : "player1";
    });
    autoSetPing();
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
      setTimerStop(true);
      setCounter((prevW) => {
        return { bot: prevW.player1 + 0.5, player: prevW.player2 + 0.5 };
      });
      setBtDis(true);
      return [];
    }
    return emptyArr;
  };

  // проверка на выигрыш
  const win = () => {
    const letter = turnLetter === "x" ? "o" : "x";
    let winG = getBestMove.findWin({
      winCombinations,
      board: gameBoard,
      letter,
    });
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
      setTimerStop(true);
      return true;
    }
    return false;
  };

  // сбрасываем все настройки на стартовые
  const restart = () => {
    if (!mute) {
      dispatch(homeMusicStatus(true));
      dispatch(drawMusicStatus(false));
      dispatch(looseMusicStatus(false));
      dispatch(winMusicStatus(false));
    }
    setModalOpen(false);
    setTimerStop(false);
    setWinGame(initialWinInfo);
    setTurnLetter("x");
    setGameBoard(() => gameBoardClass.getSizeBoard(sizeBoard));
    setTimeMove(9);
    setBtDis(false);
    if (lvl) {
      setTurnName(whoStart === "player1" ? "player2" : "player1");
      setWhoStart((prevStart) =>
        prevStart === "player1" ? "player2" : "player1"
      );
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
    if (startTimer === "2s") {
      setTimeMove(2);
    }
  };

  return (
    <Flex fill center style={styles.conteiner}>
      <MathCounterPlayers counter={counter}>
        <HeaderTurnLetter
          result={winGame.result}
          turnLetter={turnLetter}
          turnName={turnName}
        />
      </MathCounterPlayers>

      {gameBoard && winCombinations.length > 1 && (
        <GameBoard
          gamePress={gamePress}
          btDis={btDis}
          sizeBoard={sizeBoard}
          gameBoard={gameBoard}
          winGameCombination={winGame.winCombination}
        />
      )}
      {modalOpen && (
        <>
          <ModalWin
            winGame={winGame}
            restart={restart}
            navigation={navigation}
          />
          <Flex style={styles.butBox}>
            <ButtonCast textBt={"RESTART"} onClickBt={restart} small={2} />
            <ButtonCast
              textBt={"SETTING"}
              onClickBt={() => navigation.navigate("HomeP")}
              small={2}
            />
          </Flex>
        </>
      )}
      {startTimer !== "" && winGame.result === "" && (
        <Timer
          timeMove={timeMove}
          setTimeMove={setTimeMove}
          timerStop={timerStop}
        />
      )}
      {startTimer === "" && winGame.result === "" && (
        <Flex
          center
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            height: Dimensions.get("window").height * 0.09,
            marginTop: Dimensions.get("window").height * 0.01,
          }}
        >
          <Text
            style={{
              fontSize: 28,
              fontWeight: "600",
              color: "#8d8d8d",
            }}
          >
            NO TIMER
          </Text>
        </Flex>
      )}
    </Flex>
  );
};

const styles = StyleSheet.create({
  butBox: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 3,
    height: Dimensions.get("window").height * 0.1,
  },
  conteiner: {
    backgroundColor: variableThema.backgroundApp,
    position: "relative",
    paddingTop: Dimensions.get("window").height * 0.07,
    paddingBottom: Dimensions.get("window").height * 0.01,
  },
});

export default StartGamePlayer;
