import { Text, StatusBar, Dimensions, StyleSheet } from "react-native";
import { Flex } from "@react-native-material/core";
import { A } from "@expo/html-elements";
import React, { useState, useEffect } from "react";
import { variableThema } from "../helpers/variableThema";
import ButtonCast from "../components/buttonCast/ButtonCast";
import ButSong from "../components/butSong/ButSong";
import { useDispatch } from "react-redux";
import { muteStatus } from "../redux/audioManager";

const HomeScreen = ({ navigation }) => {
  const [music, setMusic] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(muteStatus(!music));
  }, [music]);

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
    paddingTop: Dimensions.get("window").height * 0.07,
  },
  nameApp: {
    fontSize: 40,
    fontWeight: "800",
    color: variableThema.colorX,
    marginBottom: Dimensions.get("window").height * 0.06,
  },
  policy: {
    fontSize: 20,
    fontWeight: "400",
    color: "#3568d4",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: Dimensions.get("window").height * 0.06,
  },
});
export default HomeScreen;
