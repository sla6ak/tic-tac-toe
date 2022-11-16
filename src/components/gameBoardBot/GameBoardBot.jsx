import React, { useEffect, useState } from "react";
import { Flex } from "react-native-flex-layout";
import { StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { gameBoardEase } from "../../helpers/gameBoard";
import { ModalWin } from "../modalWin/ModalWin";
import Ionicons from "@expo/vector-icons/Ionicons";
import { winCombinations } from "../../helpers/winCombinations";
import { useSelector, useDispatch } from "react-redux";
import { nextBot } from "../../redux/whoStartSlise";
import { getRandomInt } from "../../helpers/getRandomInt";

export const GameBoardBot = ({ lvl, navigation }) => {
  const [gameBoard, setGameBoard] = useState(gameBoardEase);
  const nextStart = useSelector((state) => state.nextStart); // кто начинает?
  const [whoPlay, setWhoPlay] = useState(nextStart); // кто ходит?
  const [countPlayer, setCountPlayer] = useState("x"); // буква на очереди
  const [winGame, setWinGame] = useState("0"); // результаты игры: 0, 0.5, 1
  const [whoWin, setWhoWin] = useState(null); // комбинация победная
  const [btDis, setBtDis] = useState(false);
  const dispatch = useDispatch();

  // при маунте сбрасывает доску в ноль и передает ход
  useEffect(() => {
    setGameBoard([...gameBoardEase]);
  }, []);

  // контролирует начинающего игрока
  useEffect(() => {
    setWhoPlay(nextStart);
  }, [nextStart]);

  // контролирует кто победил
  useEffect(() => {
    let winG = null;
    winG = winPlay("x");
    if (!winG) {
      winG = winPlay("o");
    }
    if (winG) {
      setWinGame("1");
      setBtDis(true);
      setWhoWin(winG);
      return;
    }
    draw();
  }, [gameBoard]);

  // делает ходы ботом если его очередь
  useEffect(() => {
    if (whoPlay === "player") {
      return;
    }
    gamePress(handeleBot());
  }, [whoPlay]);

  // высщитывает куда походить боту
  const handeleBot = () => {
    const emptyArr = draw();
    const x = getRandomInt(emptyArr.length - 1);
    return { el: emptyArr[x], ind: emptyArr[x].id - 1 };
  };

  // событие хода
  const gamePress = ({ el, ind }) => {
    if (el === null) {
      return;
    }
    if (gameBoard[ind].state !== "") {
      return;
    }
    setCountPlayer(countPlayer === "x" ? "o" : "x");
    setWhoPlay(whoPlay === "bot" ? "player" : "bot");
    const newSquare = { id: el.id, state: countPlayer };
    setGameBoard((prevState) => {
      prevState.splice(ind, 1, newSquare);
      return [...prevState];
    });
  };

  // поиск победных позиций
  const winPlay = (latter) => {
    const findWin = winCombinations.find(
      (el) =>
        gameBoard[el[0]].state === latter &&
        gameBoard[el[1]].state === latter &&
        gameBoard[el[2]].state === latter
    );
    return findWin ? findWin : null;
  };

  // проверка на ничью
  const draw = () => {
    let emptyArr = gameBoard.filter((el) => el.state === "");
    if (emptyArr.length < 1) {
      setWinGame("0.5");
      return;
    }
    return emptyArr;
  };

  const restart = () => {
    dispatch(nextBot(nextStart === "bot" ? "player" : "bot"));
    setWinGame("0");
    setCountPlayer("x");
    setGameBoard([...gameBoardEase]);
    setBtDis(false);
    return;
  };

  return (
    <Flex style={styles.conteiner}>
      {gameBoard.map((el, ind) => {
        const square = (
          <TouchableOpacity
            disabled={btDis}
            key={el.id}
            style={styles.button}
            onPress={() => {
              gamePress({ el, ind });
            }}
          >
            {/* <Text>{el.state}</Text> */}
            {el.state === "x" && <Ionicons name="close-outline" size={47} color="#d752ff" />}
            {el.state === "o" && <Ionicons name="ellipse-outline" size={37} color="#45fcaf" />}
          </TouchableOpacity>
        );
        return square;
      })}
      {winGame !== "0" && (
        <ModalWin
          winGame={winGame}
          restart={restart}
          navigation={navigation}
          winPlayer={gameBoard[whoWin[0]].state}
        />
      )}
    </Flex>
  );
};

const styles = StyleSheet.create({
  conteiner: {
    position: "relative",
    flexWrap: "wrap",
    flexDirection: "row",
    backgroundColor: "#555",
    borderColor: "#202020",
    borderWidth: 1,
    borderRadius: 7,
    width: Dimensions.get("window").width * 0.85,
    height: Dimensions.get("window").width * 0.85,
  },
  button: {
    backgroundColor: "#555",
    borderColor: "#999",
    borderWidth: 1,
    height: "33.3%",
    width: "33.3%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
