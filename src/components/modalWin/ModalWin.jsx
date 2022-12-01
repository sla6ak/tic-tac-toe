import React from "react";
import { Text, Button } from "@react-native-material/core";
import { Flex } from "react-native-flex-layout";
import { StyleSheet, Dimensions } from "react-native";

export const ModalWin = ({ winGame, restart, navigation }) => {
  return (
    <Flex center style={styles.conteiner}>
      {winGame.result === "win" && (
        <Text style={winGame.nameWin === "bot" ? styles.loser : styles.win}>
          {winGame.nameWin.toUpperCase()}: {winGame.winLetter.toUpperCase()} won!
        </Text>
      )}
      {winGame.result === "drow" && <Text style={styles.drow}>It's a draw</Text>}
      <Flex style={styles.butBox}>
        <Button
          tintColor="#ffffff"
          title="Restart"
          color="#006141ae"
          style={styles.button}
          onPress={restart}
        />
        <Button
          title="Show me reclama!"
          tintColor="#ffffff"
          color="#007888a7"
          style={styles.button}
          onPress={() => {}}
        />
      </Flex>
      <Text style={styles.please}>* Please watch more reclams to help developer game!</Text>
    </Flex>
  );
};

const styles = StyleSheet.create({
  conteiner: {
    paddingBottom: 10,
    position: "absolute",
    backgroundColor: "#d1d1d12b",
    borderColor: "#004615",
    borderWidth: 1,
    borderRadius: 10,
    width: Dimensions.get("window").width * 0.85,
    height: Dimensions.get("window").width * 0.25,
    flexDirection: "column",
  },
  please: {
    textAlign: "center",
    width: "100%",
    fontSize: 16,
    fontWeight: "400",
    color: "#292929",
    marginTop: 10,
  },
  button: {
    borderColor: "#999",
    borderWidth: 1,
  },
  butBox: { flexDirection: "row", justifyContent: "space-around", width: "100%" },
  drow: { fontSize: 22, fontWeight: "800", color: "#202020", marginBottom: 10 },
  loser: { fontSize: 22, fontWeight: "800", color: "#680000", marginBottom: 10 },
  win: { fontSize: 22, fontWeight: "800", color: "#00ff9d", marginBottom: 10 },
});
