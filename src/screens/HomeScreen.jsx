import { Text, StatusBar, Dimensions, StyleSheet } from "react-native";
import { Flex } from "@react-native-material/core";
import { A } from "@expo/html-elements";
import React, { useState, useEffect } from "react";
import { variableThema } from "../helpers/variableThema";
import ButtonCast from "../components/buttonCast/ButtonCast";
import ButSong from "../components/butSong/ButSong";
import AudioManager from "../helpers/AudioManager";
import { useSelector, useDispatch } from "react-redux";
import { setMute } from "../redux/muteState";

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const music = useSelector((state) => state.muteState);
  const homeMusic = useSelector((state) => state.audioManager.homeMusic);

  const setMusic = () => {
    dispatch(setMute(!music));
  };

  useEffect(() => {
    if (!music || !homeMusic) {
      return () => AudioManager.stopAsync("homeMusic");
    }
    AudioManager.playAsync("homeMusic", true, 1);
    return () => AudioManager.stopAsync("homeMusic");
  }, [music, homeMusic]);

  return (
    <Flex fill center style={styles.conteiner}>
      <Text style={styles.nameApp}>Tic-tac-toe!</Text>
      <ButtonCast
        textBt={"One player"}
        onClickBt={() => navigation.navigate("Bot")}
      />
      <ButtonCast
        textBt={"Two player"}
        onClickBt={() => navigation.navigate("Player")}
      />
      <ButSong music={music} setMusic={setMusic} />
      <Text style={styles.titleL}>Links:</Text>
      <A
        style={styles.policy}
        href="https://sla6ak.github.io/tic-tac-toe-privacy-policy/"
      >
        *privacy policy
      </A>
      <StatusBar style="auto" />
    </Flex>
  );
};
const styles = StyleSheet.create({
  conteiner: {
    backgroundColor: variableThema.backgroundApp,
    paddingTop: Dimensions.get("window").height * 0.05,
  },
  nameApp: {
    fontSize: 32,
    fontWeight: "800",
    color: variableThema.colorX,
    marginBottom: Dimensions.get("window").height * 0.05,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: variableThema.titleApp,
    marginBottom: Dimensions.get("window").height * 0.03,
  },
  titleL: {
    fontSize: 22,
    fontWeight: "800",
    color: "#47cfb275",
    marginBottom: Dimensions.get("window").height * 0.03,
    marginTop: Dimensions.get("window").height * 0.03,
  },
  policy: {
    fontSize: 18,
    fontWeight: "400",
    color: "#3568d4",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: Dimensions.get("window").height * 0.01,
  },
});
export default HomeScreen;
