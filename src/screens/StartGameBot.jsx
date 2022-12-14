import { StyleSheet, Dimensions } from "react-native";
import { Text, Flex } from "@react-native-material/core";
import React, { useEffect, useState } from "react";
import { variableThema } from "../helpers/variableThema";
import { Timer } from "../components/timer/Timer";
import gameBoardClass from "../helpers/gameBoardClass";
import getBestMove from "../helpers/getBestMoveClass";
import GameBoard from "../components/gameBoard/GameBoard";
import { ModalWin } from "../components/modalWin/ModalWin";
import MathCounterBot from "../components/mathCounterBot/MathCounterBot";
import HeaderTurnLetter from "../components/headerTurnLetter/HeaderTurnLetter";
import ButtonCast from "../components/buttonCast/ButtonCast";
import { useDispatch } from "react-redux";
import {
  homeMusicStatus,
  drawMusicStatus,
  looseMusicStatus,
  winMusicStatus,
} from "../redux/audioManager";

// **********************
import { useSelector } from "react-redux";
import { useInterstitialAd, TestIds } from "react-native-google-mobile-ads";
const reclamaID = "ca-app-pub-3796955223799964/5085997104";
// const reclamaID = "ca-app-pub-3940256099942544/1033173712";
// const reclamaID = TestIds.INTERSTITIAL;

const StartGameBot = ({ route, navigation }) => {
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
  const [timerStop, setTimerStop] = useState(false);
  const [whoStart, setWhoStart] = useState("player");
  const [counter, setCounter] = useState({ player: 0, bot: 0 });
  const [modalOpen, setModalOpen] = useState(false);

  // ************Reclama******************
  // чтоб не ломать плеер нужно отключить музыку перед рекламой и включить после
  // запомним была ли музыка включена перед рекламой или нет
  const { mute } = useSelector((state) => state.audioManager);
  const dispatch = useDispatch();

  const { isLoaded, isClosed, load, show } = useInterstitialAd(reclamaID, {
    requestNonPersonalizedAdsOnly: true,
  });

  useEffect(() => {
    if (isLoaded) return;
    try {
      load();
    } catch (error) {
      console.log("загрузка рекламы не удается проверте интернет", error);
    }
  }, [load, isLoaded]);

  useEffect(() => {
    if (winGame.result === "") return;
    if (!mute) dispatch(homeMusicStatus(false));
    if (winGame.result !== "" && isLoaded) {
      // покажим рекламу при победе чаще
      if (winGame.result !== "" && getBestMove.getRandomInt(10) > 6) {
        try {
          show();
        } catch (error) {
          console.log(
            "реклама загружена но устройство не смогло ее отобразить",
            error
          );
          // в эроре откроем модалку
          setModalOpen(true);
        }
        return;
      }
      setModalOpen(true);
      return;
    }

    if (winGame.result !== "" && !isLoaded) {
      setModalOpen(true);
      return;
    }
  }, [isLoaded, winGame]);

  useEffect(() => {
    if (!isClosed) return;
    setModalOpen(true);
  }, [isClosed]);
  // **************R***************

  // при старте игры создаем доску
  useEffect(() => {
    setGameBoard(() => gameBoardClass.getSizeBoard(sizeBoard));
    setWinCombinations(() => gameBoardClass.getSizeWinCombination(sizeBoard));
    setCounter({ player: 0, bot: 0 });
  }, []);

  // контролирует кто победил
  useEffect(() => {
    if (!gameBoard) return;
    if (winCombinations === []) return;

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
      setTimerStop(true);

      setWinGame({
        result: "win",
        winLetter: letterW,
        nameWin: nameW,
        winCombination: winG,
      });
      setCounter((prevW) => {
        const x = prevW[nameW] + 1;
        return { ...prevW, [nameW]: x };
      });
      return;
    }

    // контролирует возможны ли еще ходы
    const stop = draw();
    if (stop.length === gameBoard.length - 1 && whoStart === "bot") {
      setTimeMove(9);
    }
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
  }, [turnName, gameBoard]);

  // высщитывает куда походить боту
  const handeleBot = ({ letter }) => {
    const emptyArr = draw();
    const res = getBestMove.getMoveLvl({
      lvl,
      letter,
      winCombinations,
      gameBoard,
      emptyArr,
    });
    return res;
  };

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
        if (lvl) {
          return prevN === "player" ? "bot" : "player";
        }
        return "player";
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
      setTimerStop(true);
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
    if (startTimer === "2s") {
      setTimeMove(2);
    }
  };

  return (
    <Flex fill center style={styles.conteiner}>
      <MathCounterBot lvl={lvl} counter={counter}>
        <HeaderTurnLetter
          result={winGame.result}
          turnLetter={turnLetter}
          turnName={turnName}
        />
      </MathCounterBot>

      {gameBoard && winCombinations.length > 1 && (
        <GameBoard
          gamePress={gamePress}
          btDis={btDis}
          sizeBoard={sizeBoard}
          gameBoard={gameBoard}
          winGameCombination={winGame.winCombination}
        />
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
      {modalOpen && (
        <>
          <ModalWin winGame={winGame} />
          <Flex style={styles.butBox}>
            <ButtonCast textBt={"RESTART"} onClickBt={restart} small={2} />
            <ButtonCast
              textBt={"SETTING"}
              onClickBt={() => navigation.navigate("HomeB")}
              small={2}
            />
          </Flex>
        </>
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
    // height: Dimensions.get("window").height * 0.1,
  },
  conteiner: {
    backgroundColor: variableThema.backgroundApp,
    position: "relative",
    paddingTop: Dimensions.get("window").height * 0.07,
    paddingBottom: Dimensions.get("window").height * 0.01,
  },
});

export default StartGameBot;
