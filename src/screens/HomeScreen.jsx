import { Text, StatusBar, TouchableOpacity, Dimensions, StyleSheet } from "react-native";
import { Button, Box, Flex } from "@react-native-material/core";
import { A } from "@expo/html-elements";
import React from "react";

const HomeScreen = ({ navigation }) => {
  return (
    <Flex fill center style={styles.conteiner}>
      <Text style={styles.title}>Choose mode:</Text>
      {/* <Button
          color="#9c9c9c"
          style={styles.button}
          title="One player"
          onPress={() => navigation.navigate("Bot")}
        />
        <Button
          color="#9b9b9b"
          style={styles.button}
          title="Two player"
          onPress={() => navigation.navigate("Player")}
        /> */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Bot")}>
        <Text>One player</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Player")}>
        <Text>Two player</Text>
      </TouchableOpacity>
      <Text style={styles.titleL}>Links:</Text>
      <A style={styles.policy} href="https://sla6ak.github.io/tic-tac-toe-privacy-policy/">
        *privacy policy
      </A>
      {/* <A
        style={styles.goooglePlay}
        href="https://play.google.com/store/apps/details?id=tictactoe.slabakxaker"
      >
        do you like TicTacToe?
      </A> */}
      <StatusBar style="auto" />
    </Flex>
  );
};
const styles = StyleSheet.create({
  conteiner: { backgroundColor: "#555" },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#89dbc9",
    marginBottom: 20,
  },
  titleL: {
    fontSize: 22,
    fontWeight: "800",
    color: "#89dbc9",
    marginBottom: 20,
    marginTop: Dimensions.get("window").height * 0.1,
  },
  goooglePlay: {
    fontSize: 16,
    fontWeight: "400",
    color: "#77a2ff",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 30,
  },
  policy: {
    fontSize: 16,
    fontWeight: "400",
    color: "#77a2ff",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 10,
  },
  button: {
    fontWeight: "800",
    backgroundColor: "#9b9b9b",
    borderRadius: 5,
    marginBottom: 30,
    minWidth: Dimensions.get("window").width * 0.5,
    minHeight: Dimensions.get("window").height * 0.06,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
export default HomeScreen;
