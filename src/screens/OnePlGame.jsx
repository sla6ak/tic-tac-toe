import { Button, Box, Text } from "@react-native-material/core";
import { Flex } from "react-native-flex-layout";
import React from "react";
import { StyleSheet } from "react-native";
import { GameBoardBot } from "../components/gameBoardBot/GameBoardBot";

const OnePlGame = ({ route, navigation }) => {
  const { lvl } = route.params;
  return (
    <Flex fill center style={styles.conteiner}>
      <Text style={styles.title}>Game vs {lvl.toUpperCase()} bot</Text>
      <GameBoardBot lvl={lvl} navigation={navigation} />
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
export default OnePlGame;
