import React, { useEffect, useState } from "react";
import { Flex } from "react-native-flex-layout";
import { StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { gameBoardEase } from "../../helpers/gameBoard";
import { ModalWin } from "../modalWin/ModalWin";
import Ionicons from "@expo/vector-icons/Ionicons";
import { winCombinations } from "../../helpers/winCombinations";

export const GameBoard = ({ navigation }) => {
  const [gameBoard, setGameBoard] = useState(gameBoardEase); // { id: "1", state: "", move: "" }
  const [countPlayer, setCountPlayer] = useState("x");
  const [winGame, setWinGame] = useState(null); // результаты игры: 0, 0.5, 1
  const [btDis, setBtDis] = useState(false);
  const [letterWin, setLetterWin] = useState(""); // 'x' или 'o'
  const [winStyle, setWinStyle] = useState(null); // комбинация победная [0, 1, 2]

  const gamePress = (el, ind) => {
    if (gameBoard[ind].state !== "") {
      return;
    }
    const newSquare = { id: el.id, state: countPlayer };
    setGameBoard((prevState) => {
      prevState.splice(ind, 1, newSquare);
      return [...prevState];
    });
    setCountPlayer(countPlayer === "x" ? "o" : "x");
  };

  const winPlay = (letter) => {
    const findWin = winCombinations.find(
      (el) =>
        gameBoard[el[0]].state === letter &&
        gameBoard[el[1]].state === letter &&
        gameBoard[el[2]].state === letter
    );
    return findWin ? findWin : null;
  };

  useEffect(() => {
    setGameBoard([...gameBoardEase]);
  }, []);

  useEffect(() => {
    let winG = null;
    winG = winPlay("x");
    if (!winG) {
      winG = winPlay("o");
    }
    if (winG) {
      const letterW = gameBoard[winG[0]].state;
      setLetterWin(letterW);
      setBtDis(true);
      setWinStyle(winG);
      setWinGame("1");
      return;
    }
    const stop = draw();
    if (!stop || stop.length < 1) {
      return;
    }
  }, [gameBoard]);

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
    setWinGame(null);
    setWinStyle(null);
    setCountPlayer("x");
    setGameBoard([...gameBoardEase]);
    setBtDis(false);
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
            disabled={btDis}
            key={el.id}
            style={styles.button}
            onPress={() => gamePress(el, ind)}
          >
            {el.state === "x" && (
              <Ionicons name="close-outline" size={up ? 105 : 69} color="#d752ff" />
            )}
            {el.state === "o" && (
              <Ionicons name="ellipse-outline" size={up ? 95 : 61} color="#45fcaf" />
            )}
          </TouchableOpacity>
        );
        return square;
      })}
      {winGame && (
        <ModalWin
          whoWin={"player"}
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
