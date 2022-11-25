import { Button, Box, Text } from "@react-native-material/core";
import { Flex } from "react-native-flex-layout";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import StartGame from "./StartGame";
import { variableThema } from "../helpers/variableThema";

const TwoPlGame = ({ navigation }) => {
  const [turnLetter, setTurnLetter] = useState("x"); // кто ходит? 'player "X"' или 'player "O"'

  return (
    <Flex fill center style={styles.conteiner}>
      <Text style={{ fontSize: 22, fontWeight: "800", color: "#161616", marginBottom: 20 }}>
        Two Player Game
      </Text>
      <Text style={styles.title}>
        Now it's player
        {turnLetter === "x" ? (
          <Text
            style={{
              fontSize: 22,
              fontWeight: "800",
              color: variableThema.colorO,
              marginBottom: 20,
            }}
          >
            X
          </Text>
        ) : (
          <Text
            style={{
              fontSize: 22,
              fontWeight: "800",
              color: variableThema.colorX,
              marginBottom: 20,
            }}
          >
            O
          </Text>
        )}
        's turn
      </Text>
      <StartGame setTurnLetter={setTurnLetter} turnLetter={turnLetter} navigation={navigation} />
    </Flex>
  );
};
const styles = StyleSheet.create({
  conteiner: { backgroundColor: "#555" },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#ffffff",
    marginBottom: 20,
  },
  button: {
    marginBottom: 30,
  },
});
export default TwoPlGame;
