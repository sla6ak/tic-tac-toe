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
    </Flex>
  );
};

const styles = StyleSheet.create({
  conteiner: {
    paddingBottom: 10,
    position: "absolute",
    backgroundColor: "transparent",
    width: Dimensions.get("window").width * 0.85,
    height: Dimensions.get("window").height * 0.17,
    flexDirection: "column",
  },
  please: {
    textAlign: "center",
    width: "100%",
    fontSize: 16,
    fontWeight: "400",
    color: "#44006b",
    marginTop: Dimensions.get("window").height * 0.09,
  },
  button: {
    borderColor: "#999",
    borderWidth: 1,
  },
  butBox: { flexDirection: "row", justifyContent: "space-around", width: "100%" },
  drow: { fontSize: 28, fontWeight: "800", color: "#202020", marginBottom: 30 },
  loser: { fontSize: 28, fontWeight: "800", color: "#ff3370", marginBottom: 30 },
  win: { fontSize: 28, fontWeight: "800", color: "#00ff9d", marginBottom: 30 },
});
