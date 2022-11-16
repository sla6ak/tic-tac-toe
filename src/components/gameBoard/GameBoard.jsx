import React, { useEffect, useState } from "react";
import { Flex } from "react-native-flex-layout";
import { StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { gameBoardEase } from "../../helpers/gameBoard";
import { ModalWin } from "../modalWin/ModalWin";
import Ionicons from "@expo/vector-icons/Ionicons";
import { winCombinations } from "../../helpers/winCombinations";

export const GameBoard = ({ navigation }) => {
  const [gameBoard, setGameBoard] = useState(gameBoardEase);
  const [countPlayer, setCountPlayer] = useState("x");
  const [winGame, setWinGame] = useState(false);
  const [btDis, setBtDis] = useState(false);

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

  const winPlay = () => {
    const letter = countPlayer === "x" ? "o" : "x";
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
    const winG = winPlay();
    if (winG) {
      setWinGame(true);
      setBtDis(true);
    }
  }, [gameBoard]);

  const restart = () => {
    setWinGame(false);
    setCountPlayer("x");
    setGameBoard([...gameBoardEase]);
    setBtDis(false);
  };

  return (
    <Flex style={styles.conteiner}>
      {gameBoard.map((el, ind) => {
        const square = (
          <TouchableOpacity
            disabled={btDis}
            key={el.id}
            style={styles.button}
            onPress={() => gamePress(el, ind)}
          >
            {/* <Text>{el.state}</Text> */}
            {el.state === "x" && <Ionicons name="close-outline" size={47} color="#d752ff" />}
            {el.state === "o" && <Ionicons name="ellipse-outline" size={37} color="#45fcaf" />}
          </TouchableOpacity>
        );
        return square;
      })}
      {winGame && (
        <ModalWin
          restart={restart}
          navigation={navigation}
          winPlayer={countPlayer === "x" ? "o" : "x"}
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
