import { Text } from "@react-native-material/core";
import { Flex } from "react-native-flex-layout";
import React from "react";
import { StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { variableThema } from "../helpers/variableThema";

const PlayerSetting = ({ navigation }) => {
  return (
    <Flex fill center style={styles.conteiner}>
      <Text style={styles.title}>Choose the game board</Text>

      <Text style={styles.start}>Start game:</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Start", { lvl: null, sizeBoard: 3, startTimer: "" })}
      >
        <Text style={styles.textBtn}>board 3*3</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("Start", { lvl: null, sizeBoard: 4, startTimer: "" });
        }}
      >
        <Text style={styles.textBtn}>board 4*4</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Start", { lvl: null, sizeBoard: 5, startTimer: "" })}
      >
        <Text style={styles.textBtn}>board 5*5</Text>
      </TouchableOpacity>
    </Flex>
  );
};
const styles = StyleSheet.create({
  conteiner: { backgroundColor: variableThema.backgroundApp },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: variableThema.titleApp,
    marginBottom: 20,
  },
  start: {
    fontSize: 22,
    fontWeight: "800",
    color: variableThema.colorX,
    marginBottom: 20,
  },
  textBtn: {
    fontWeight: "800",
    fontSize: 18,
    color: "#fff",
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
});
export default PlayerSetting;
