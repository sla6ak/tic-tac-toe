import { StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Flex, Text } from "@react-native-material/core";
import View from "@expo/html-elements/build/primitives/View";
import { variableThema } from "../../helpers/variableThema";

const GameBoard = ({ gamePress, sizeBoard, btDis, gameBoard, winGameCombination }) => {
  const [sizeSq, setSizeSq] = useState("33.3%"); //
  // gameBoard = { id: "", letter: "", move: "" }
  useEffect(() => {
    if (sizeBoard === 3) {
      setSizeSq("33.3%");
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
    <Flex style={styles.conteiner}>
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
            style={{
              width: sizeSq,
              height: sizeSq,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderColor: "#979797",
              borderWidth: 1,
              padding: 0,
            }}
            key={keySq}
          >
            <TouchableOpacity
              delayPressIn={10}
              delayLongPress={10}
              onLongPress={() => {
                gamePress({ el, ind });
              }}
              disabled={btDis}
              style={{
                height: "100%",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {el.letter === "x" && (
                <Ionicons
                  name="close-outline"
                  size={up ? 57 : 49}
                  color={up ? variableThema.colorWin : variableThema.colorX}
                />
              )}
              {el.letter === "o" && (
                <Ionicons
                  name="ellipse-outline"
                  size={up ? 53 : 45}
                  color={up ? variableThema.colorWin : variableThema.colorO}
                />
              )}
            </TouchableOpacity>
          </View>
        );
        return square;
      })}
    </Flex>
  );
};

const styles = StyleSheet.create({
  conteiner: {
    position: "relative",
    flexWrap: "wrap",
    flexDirection: "row",
    backgroundColor: variableThema.backgroundApp,
    borderBottomColor: variableThema.backgroundApp,
    borderLeftColor: variableThema.backgroundApp,
    borderRightColor: variableThema.backgroundApp,
    borderTopColor: variableThema.backgroundApp,
    borderBottomWidth: 2,
    borderTopWidth: 3,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderRadius: 7,
    width: Dimensions.get("window").width * 0.85,
    height: Dimensions.get("window").width * 0.85,
  },
});

export default GameBoard;
