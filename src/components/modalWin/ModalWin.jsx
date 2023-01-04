import React, { useEffect, useRef } from "react";
import { Text, Button } from "@react-native-material/core";
import { Flex } from "react-native-flex-layout";
import { StyleSheet, Dimensions, Animated, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { setSounds } from "../../redux/audioManager";
import AudioManager from "../../helpers/AudioManager";

export const ModalWin = ({ winGame, navigation }) => {
  const shown = new Animated.Value(0);
  // musics *******************************
  const dispatch = useDispatch();
  const music = useSelector((state) => state.muteState);

  useEffect(() => {
    dispatch(setSounds({ homeMusic: false }));
    return () => dispatch(setSounds({ homeMusic: true }));
  }, []);

  useEffect(() => {
    if (!music) return;
    // ничья
    if (winGame.result === "drow") {
      AudioManager.playAsync("drawMusic", false, 0.3);
      return () => AudioManager.stopAsync("drawMusic");
    }
    if (winGame.result === "win") {
      // поражение
      if (winGame.nameWin === "bot" || winGame.nameWin === "player2") {
        AudioManager.playAsync("looseMusic", false, 0.3);
        return () => AudioManager.stopAsync("looseMusic");
      }
      // победа
      AudioManager.playAsync("winMusic", false, 0.3);
      return () => AudioManager.stopAsync("winMusic");
    }
  }, [music]);

  // *****************************************
  useEffect(() => {
    Animated.timing(shown, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [winGame]);

  // opacity: shown
  return (
    <Flex center style={styles.conteiner}>
      {winGame.result === "win" && (
        <Animated.View
          style={{ opacity: shown, transform: [{ scale: shown }] }}
        >
          <Text
            style={
              winGame.nameWin === "bot" || winGame.nameWin === "player2"
                ? styles.loser
                : styles.win
            }
          >
            {winGame.nameWin.toUpperCase()}: {winGame.winLetter.toUpperCase()}{" "}
            won!
          </Text>
        </Animated.View>
      )}
      {winGame.result === "drow" && (
        <Animated.View
          style={{ opacity: shown, transform: [{ scale: shown }] }}
        >
          <Text style={styles.drow}>It's a draw</Text>
        </Animated.View>
      )}
    </Flex>
  );
};

const styles = StyleSheet.create({
  conteiner: {
    paddingBottom: 10,
    position: "absolute",
    backgroundColor: "transparent",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    flexDirection: "column",
    backgroundColor: "#aaaaaa67",
  },
  please: {
    textAlign: "center",
    width: "100%",
    fontSize: 16,
    fontWeight: "400",
    color: "#44006b",
    marginTop: Dimensions.get("window").height * 0.09,
  },
  drow: { fontSize: 32, fontWeight: "800", color: "#0b58cc", marginBottom: 30 },
  loser: {
    fontSize: 32,
    fontWeight: "800",
    color: "#f8306c",
    marginBottom: 30,
  },
  win: { fontSize: 32, fontWeight: "800", color: "#01915a", marginBottom: 30 },
});
