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
import { getBestMove } from "../../helpers/getBastMove";

export const GameBoardBot = ({ lvl, navigation }) => {
  const [gameBoard, setGameBoard] = useState(gameBoardEase); // { id: "1", state: "", move: "" }
  const nextStart = useSelector((state) => state.nextStart); // кто начинает? 'bot' или 'player'
  const [whoPlay, setWhoPlay] = useState(nextStart); // кто ходит? 'bot' или 'player'
  const [countPlayer, setCountPlayer] = useState("x"); // буква на очереди 'x' или 'o'
  const [winGame, setWinGame] = useState(null); // результаты игры: 0, 0.5, 1
  const [whoWin, setWhoWin] = useState(null); //
  const [winStyle, setWinStyle] = useState(null); // комбинация победная [0, 1, 2]
  const [letterWin, setLetterWin] = useState(""); // 'x' или 'o'
  const [btDis, setBtDis] = useState(false);
  const dispatch = useDispatch();

  // при маунте сбрасывает доску в ноль
  useEffect(() => {
    dispatch(nextBot("player"));
    setGameBoard([...gameBoardEase]);
  }, []);

  // контролирует начинающего игрока
  useEffect(() => {
    setWhoPlay(nextStart);
  }, [nextStart]);

  //контролирует кто победил
  useEffect(() => {
    const letter = countPlayer === "x" ? "o" : "x";
    let winG = winPlay({ letter });
    if (winG) {
      setBtDis(true);
      setWinStyle(winG);
      return;
    }
    const stop = draw();
    if (!stop || stop.length < 1) {
      return;
    }
    // если игра продолжается тогда ходит бот
    if (whoPlay === "player") {
      setBtDis(false);
      return;
    }
    gamePress(handeleBot({ letter: countPlayer }));
    setBtDis(false);
  }, [whoPlay, countPlayer, gameBoard]);

  useEffect(() => {
    if (!winStyle) {
      return;
    }
    const letterW = gameBoard[winStyle[0]].state;
    setLetterWin(letterW);
    const whoW = gameBoard[winStyle[0]].move;
    setWhoWin(whoW);
    setWinGame("1");
    return;
  }, [winStyle]);

  // высщитывает куда походить боту
  const handeleBot = ({ letter }) => {
    const emptyArr = draw();
    let res = null;
    let x = null;
    if (lvl === "ease") {
      x = getRandomInt(emptyArr.length);
      res = { el: emptyArr[x], ind: emptyArr[x].id - 1 };
    } else {
      res = getBestMove({ letter, gameBoard, emptyArr });
    }
    return res;
  };

  // событие хода
  const gamePress = ({ el, ind }) => {
    if (el === null) {
      return;
    }
    if (gameBoard[ind].state !== "") {
      return;
    }
    setBtDis(true);
    const newSquare = { id: el.id, state: countPlayer, move: whoPlay };
    setGameBoard((prevState) => {
      prevState.splice(ind, 1, newSquare);
      return [...prevState];
    });
    setCountPlayer(countPlayer === "x" ? "o" : "x");
    setWhoPlay(whoPlay === "bot" ? "player" : "bot");
  };

  // поиск победных позиций
  const winPlay = ({ letter }) => {
    let findWin = winCombinations.find(
      (el) =>
        gameBoard[el[0]].state === letter &&
        gameBoard[el[1]].state === letter &&
        gameBoard[el[2]].state === letter
    );
    return findWin ? findWin : null;
  };

  // проверка на ничью
  const draw = () => {
    let emptyArr = gameBoard.filter((el) => el.state === "");
    if (!emptyArr || emptyArr.length < 1) {
      setWinGame("0.5");
      setBtDis(true);
      return [];
    }
    return emptyArr;
  };

  const restart = () => {
    dispatch(nextBot(nextStart === "bot" ? "player" : "bot"));
    setWinGame(null);
    setWhoWin(null);
    setWinStyle(null);
    setCountPlayer("x");
    setGameBoard([...gameBoardEase]);
    setBtDis(false);
    return;
  };

  return (
    <Flex style={styles.conteiner}>
      {gameBoard.map((el, ind) => {
        let up = null;
        if (winStyle) {
          up =
            winStyle.find((elem) => {
              return elem === ind;
            }) + 1;
        }

        const square = (
          <TouchableOpacity
            delayLongPress={10}
            delayPressIn={10}
            onLongPress={() => {
              gamePress({ el, ind });
            }}
            accessibilityRole="button"
            disabled={btDis}
            key={el.id}
            style={styles.button}
          >
            {el.state === "x" && (
              <Ionicons
                name="close-outline"
                size={up ? 57 : 49}
                color={up ? "#f73791" : "#da60ff"}
              />
            )}
            {el.state === "o" && (
              <Ionicons
                name="ellipse-outline"
                size={up ? 53 : 45}
                color={up ? "#f73791" : "#45fcaf"}
              />
            )}
          </TouchableOpacity>
        );
        return square;
      })}
      {winGame && (
        <ModalWin
          whoWin={whoWin}
          winGame={winGame}
          restart={restart}
          navigation={navigation}
          letterWin={letterWin}
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
