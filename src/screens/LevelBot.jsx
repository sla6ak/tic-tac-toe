import { Button, Box, Text } from "@react-native-material/core";
import { Flex } from "react-native-flex-layout";
import React from "react";
import { StyleSheet } from "react-native";

const LevelBot = ({ navigation }) => {
  return (
    <Flex fill center style={styles.conteiner}>
      <Text style={styles.title}>Choose lvl:</Text>
      <Button
        color="#9c9c9c"
        style={styles.button}
        title="Ease lvl"
        onPress={() => navigation.navigate("GameOne", { lvl: "ease" })}
      />
      <Button
        color="#9b9b9b"
        style={styles.button}
        title="Hard lvl"
        onPress={() => navigation.navigate("GameOne", { lvl: "hard" })}
      />
      <Button
        style={styles.buttonHard}
        title="Very hard lvl"
        onPress={() => navigation.navigate("GameOne", { lvl: "veryHard" })}
      />
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
  buttonHard: {
    marginBottom: 30,
    backgroundColor: "#614e4e",
  },
});
export default LevelBot;
