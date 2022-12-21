import { Text, StatusBar, Dimensions, StyleSheet } from "react-native";
import { Flex } from "@react-native-material/core";
import { A } from "@expo/html-elements";
import React from "react";
import { variableThema } from "../helpers/variableThema";
import ButtonCast from "../components/buttonCast/ButtonCast";

const HomeScreen = ({ navigation }) => {
  return (
    <Flex fill center style={styles.conteiner}>
      <Text style={styles.nameApp}>Tic-tac-toy!</Text>
      <Text style={styles.title}>Choose mode:</Text>
      <ButtonCast
        textBt={"One player"}
        onClickBt={() => navigation.navigate("Bot")}
      />
      <ButtonCast
        textBt={"Two player"}
        onClickBt={() => navigation.navigate("Player")}
      />
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
    paddingTop: Dimensions.get("window").height * 0.08,
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
    marginTop: Dimensions.get("window").height * 0.1,
  },
  policy: {
    fontSize: 16,
    fontWeight: "400",
    color: "#3568d4",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: Dimensions.get("window").height * 0.01,
  },
});
export default HomeScreen;
