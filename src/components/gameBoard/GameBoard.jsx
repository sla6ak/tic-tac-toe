import { StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Flex } from "@react-native-material/core";
import View from "@expo/html-elements/build/primitives/View";
import { variableThema } from "../../helpers/variableThema";

const GameBoard = ({
  gamePress,
  sizeBoard,
  btDis,
  gameBoard,
  winGameCombination,
}) => {
  const [sizeSq, setSizeSq] = useState("33.3%"); //
  const [sizeFont, setSizeFont] = useState(30);

  useEffect(() => {
    const window = Dimensions.get("window");
    if (window.width > 799) {
      setSizeFont(80);
      return;
    }
    if (window.width > 599) {
      setSizeFont(60);
      return;
    }
    if (window.width > 399) {
      setSizeFont(45);
      return;
    }
    return;
  }, []);

  // gameBoard = { id: "", letter: "", move: "" }
  useEffect(() => {
    if (sizeBoard === 3) {
      setSizeSq("33.33%");
      return;
    }
    if (sizeBoard === 4) {
      setSizeSq("25%");
      return;
    }
    if (sizeBoard === 5) {
      setSizeSq("20%");
      return;
    }
  }, [sizeBoard]);

  getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  };

  return (
    <View style={styles.conteiner}>
      {gameBoard.map((el, ind) => {
        let up = null;
        const keySq = toString(getRandomInt(999999)) + el.id;
        if (winGameCombination) {
          up =
            winGameCombination.find((elem) => {
              return elem === ind;
            }) + 1;
        }
        const square = (
          <View
            style={[
              styles.squer,
              {
                width: sizeSq,
                height: sizeSq,
              },
            ]}
            key={keySq}
          >
            <TouchableOpacity
              delayPressIn={10}
              delayLongPress={10}
              onLongPress={() => {
                gamePress({ el, ind });
              }}
              disabled={btDis}
              style={styles.tothSquer}
            >
              {el.letter === "x" && (
                <Ionicons
                  name="close-outline"
                  size={up ? sizeFont + 35 : sizeFont + 5}
                  color={up ? variableThema.colorWin : variableThema.colorX}
                />
              )}
              {el.letter === "o" && (
                <Ionicons
                  name="ellipse-outline"
                  size={up ? sizeFont + 30 : sizeFont}
                  color={up ? variableThema.colorWin : variableThema.colorO}
                />
              )}
            </TouchableOpacity>
          </View>
        );
        return square;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  conteiner: {
    display: "flex",
    position: "relative",
    flexWrap: "wrap",
    flexDirection: "row",
    backgroundColor: variableThema.backgroundApp,
    borderRadius: 1,
    borderColor: variableThema.backgroundApp,
    shadowColor: "#93cea1",
    width: Dimensions.get("window").width * 0.81,
    height: Dimensions.get("window").width * 0.81,
    elevation: 5,
  },
  squer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#979797",
    backgroundColor: "transparent",
    borderWidth: 2,
    padding: 0,
  },
  tothSquer: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default GameBoard;
