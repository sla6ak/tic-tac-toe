import { StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Flex } from "@react-native-material/core";

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

  return (
    <Flex style={styles.conteiner}>
      {gameBoard.map((el, ind) => {
        let up = null;
        if (winGameCombination) {
          up =
            winGameCombination.find((elem) => {
              return elem === ind;
            }) + 1;
        }
        const square = (
          <TouchableOpacity
            key={el.id}
            delayPressIn={10}
            delayLongPress={10}
            onLongPress={() => {
              gamePress({ el, ind });
            }}
            disabled={btDis}
            style={{
              backgroundColor: "#555",
              borderColor: "#999",
              borderWidth: 1,
              height: sizeSq,
              width: sizeSq,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {el.letter === "x" && (
              <Ionicons
                name="close-outline"
                size={up ? 57 : 49}
                color={up ? "#fc2263" : "#da60ff"}
              />
            )}
            {el.letter === "o" && (
              <Ionicons
                name="ellipse-outline"
                size={up ? 53 : 45}
                color={up ? "#fc2263" : "#45fcaf"}
              />
            )}
          </TouchableOpacity>
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
    backgroundColor: "#555",
    borderColor: "#202020",
    borderWidth: 1,
    borderRadius: 7,
    width: Dimensions.get("window").width * 0.85,
    height: Dimensions.get("window").width * 0.85,
  },
});

export default GameBoard;
