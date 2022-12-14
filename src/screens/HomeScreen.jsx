import { Text, StatusBar, TouchableOpacity, Dimensions, StyleSheet } from "react-native";
import { Flex } from "@react-native-material/core";
import { A } from "@expo/html-elements";
import React from "react";
import { variableThema } from "../helpers/variableThema";

const HomeScreen = ({ navigation }) => {
  return (
    <Flex fill center style={styles.conteiner}>
      <Text style={styles.nameApp}>Tic-tac-toy!</Text>
      <Text style={styles.title}>Choose mode:</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Bot")}>
        <Text style={styles.textBtn}>One player</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Player")}>
        <Text style={styles.textBtn}>Two player</Text>
      </TouchableOpacity>
      <Text style={styles.titleL}>Links:</Text>
      <A style={styles.policy} href="https://sla6ak.github.io/tic-tac-toe-privacy-policy/">
        *privacy policy
      </A>
      <StatusBar style="auto" />
    </Flex>
  );
};
const styles = StyleSheet.create({
  conteiner: { backgroundColor: variableThema.backgroundApp },
  nameApp: {
    fontSize: 32,
    fontWeight: "800",
    color: variableThema.colorX,
    marginBottom: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: variableThema.titleApp,
    marginBottom: 20,
  },
  titleL: {
    fontSize: 22,
    fontWeight: "800",
    color: "#47cfb275",
    marginBottom: 20,
    marginTop: Dimensions.get("window").height * 0.1,
  },
  policy: {
    fontSize: 16,
    fontWeight: "400",
    color: "#3568d4",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 10,
  },
  button: {
    fontWeight: "800",
    backgroundColor: variableThema.generalBtn,
    borderRadius: 5,
    marginBottom: 30,
    minWidth: Dimensions.get("window").width * 0.5,
    minHeight: Dimensions.get("window").height * 0.06,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  textBtn: {
    fontWeight: "800",
    fontSize: 18,
    color: "#fff",
  },
});
export default HomeScreen;
