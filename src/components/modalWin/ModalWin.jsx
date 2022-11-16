import React from "react";
import { Text, Button } from "@react-native-material/core";
import { Flex } from "react-native-flex-layout";
import { StyleSheet, Dimensions } from "react-native";

export const ModalWin = ({ winGame, restart, navigation, letterWin, whoWin }) => {
  return (
    <Flex center style={styles.conteiner}>
      {winGame === "1" && (
        <Text style={whoWin === "player" ? styles.win : styles.loser}>
          {whoWin ? whoWin.toUpperCase() : letterWin.toUpperCase()} won!
        </Text>
      )}
      {winGame === "0.5" && <Text style={styles.title}>It's a draw</Text>}
      <Flex style={styles.butBox}>
        <Button title="Restart" color="#9b9b9b" style={styles.button} onPress={restart} />
        <Button
          title="Back to menu"
          color="#9b9b9b"
          style={styles.button}
          onPress={() => navigation.navigate("Home")}
        />
      </Flex>
    </Flex>
  );
};

const styles = StyleSheet.create({
  conteiner: {
    top: -110,
    position: "absolute",
    backgroundColor: "#d1d1d1",
    borderColor: "#004615",
    borderWidth: 1,
    borderRadius: 10,
    width: Dimensions.get("window").width * 0.85,
    height: Dimensions.get("window").width * 0.25,
    flexDirection: "column",
  },
  butBox: { flexDirection: "row", justifyContent: "space-around", width: "100%" },
  button: {
    backgroundColor: "#747474",
    borderColor: "#999",
    borderWidth: 1,
  },
  title: { fontSize: 22, fontWeight: "800", color: "#292929", marginBottom: 20 },
  loser: { fontSize: 22, fontWeight: "800", color: "#680000", marginBottom: 20 },
  win: { fontSize: 22, fontWeight: "800", color: "#008f53", marginBottom: 20 },
});
