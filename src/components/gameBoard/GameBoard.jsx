import { StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import View from "@expo/html-elements/build/primitives/View";
import { variableThema } from "../../helpers/variableThema";
import { useSelector, useDispatch } from "react-redux";
import { moveMusicStatus } from "../../redux/audioManager";

const GameBoard = ({
  gamePress,
  sizeBoard,
  btDis,
  gameBoard,
  winGameCombination,
}) => {
  const [sizeSq, setSizeSq] = useState("33.3%"); //
  const [sizeFont, setSizeFont] = useState(30);
  const [sizeFontPlus, setSizeFontPlus] = useState(10);
  const { mute } = useSelector((state) => state.audioManager);
  const dispatch = useDispatch();

  useEffect(() => {
    const window = Dimensions.get("window");
    if (window.width > 799) {
      setSizeFont(80);
      setSizeFontPlus(40);
      return;
    }
    if (window.width > 599) {
      setSizeFont(60);
      setSizeFontPlus(30);
      return;
    }
    if (window.width > 399) {
      setSizeFont(45);
      setSizeFontPlus(20);
      return;
    }
    return;
  }, []);

  // gameBoard = { id: "", letter: "", move: "" }
  useEffect(() => {
    if (sizeBoard === 3) {
      setSizeSq("32.9%");
      return;
    }
    if (sizeBoard === 4) {
      setSizeSq("24.3%");
      return;
    }
    if (sizeBoard === 5) {
      setSizeSq("19.3%");
      return;
    }
  }, [sizeBoard]);

  const klikMusik = async () => {
    if (!mute) dispatch(moveMusicStatus(true));
    return;
  };

  return (
    <View style={styles.conteiner}>
      {gameBoard.map((el, ind) => {
        let up = null;
        const keySq = "key" + el.id;
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
                klikMusik();
              }}
              disabled={btDis}
              style={styles.tothSquer}
            >
              {el.letter === "x" && (
                <Ionicons
                  name="close-outline"
                  size={up ? sizeFont + sizeFontPlus + 5 : sizeFont + 5}
                  color={up ? variableThema.colorWin : variableThema.colorX}
                />
              )}
              {el.letter === "o" && (
                <Ionicons
                  name="ellipse-outline"
                  size={up ? sizeFont + sizeFontPlus : sizeFont}
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
    padding: 0,
    justifyContent: "space-between",
    alignContent: "space-between",
    backgroundColor: "#84bef5",
    // backgroundColor: variableThema.backgroundApp,
    // borderWidth: 2,
    // borderColor: variableThema.backgroundApp,
    shadowColor: "#93cea1",
    width: Dimensions.get("window").width * 0.81,
    height: Dimensions.get("window").width * 0.81,
    // elevation: 5,
  },
  squer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // borderColor: "#979797",
    backgroundColor: variableThema.backgroundApp,
    // borderWidth: 2,
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
