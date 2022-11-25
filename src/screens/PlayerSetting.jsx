import { Button, Box, Text } from "@react-native-material/core";
import { Flex } from "react-native-flex-layout";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { variableThema } from "../helpers/variableThema";

const PlayerSetting = ({ navigation }) => {
  return (
    <Flex fill center style={styles.conteiner}>
      <Text style={styles.title}>Choose the game board:</Text>

      <Text style={styles.title}>Start game:</Text>
      <Button
        color="#9c9c9c"
        style={styles.button}
        title="board 3*3"
        onPress={() => navigation.navigate("Start", { sizeBoard: 3 })}
      />
      <Button
        color="#9b9b9b"
        style={styles.button}
        title="board 4*4"
        onPress={() => navigation.navigate("Start", { sizeBoard: 4 })}
      />
      <Button
        color="#9b9b9b"
        style={styles.button}
        title="board 5*5"
        onPress={() => navigation.navigate("Start", { sizeBoard: 5 })}
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
  helperText: {},
  button: {
    marginBottom: 30,
  },
});
export default PlayerSetting;
