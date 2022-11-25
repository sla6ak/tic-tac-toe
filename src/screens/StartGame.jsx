import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button, Box, Text } from "@react-native-material/core";
import { Flex } from "react-native-flex-layout";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { variableThema } from "../helpers/variableThema";
import { Timer } from "../components/timer/Timer";

const StartGame = ({ route, lvl = null, sizeBoard = 3, timer = "", navigation }) => {
  const [turnLetter, setTurnLetter] = useState("x"); // кто ходит? 'player "X"' или 'player "O"'
  return (
    <Flex fill center style={styles.conteiner}>
      {lvl ? (
        <Text style={{ fontSize: 22, fontWeight: "800", color: "#1d1d1d", marginBottom: 15 }}>
          Game vs
          <Text style={{ fontSize: 22, fontWeight: "800", color: colorLvlBot(), marginBottom: 20 }}>
            {lvl.toUpperCase()}
          </Text>
          bot
        </Text>
      ) : (
        <Text style={{ fontSize: 22, fontWeight: "800", color: "#161616", marginBottom: 20 }}>
          Two Player Game
        </Text>
      )}
      <Text style={styles.title}>
        Now it's player
        {turnLetter === "x" ? (
          <Text
            style={{
              fontSize: 22,
              fontWeight: "800",
              color: variableThema.colorO,
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
            }}
          >
            O
          </Text>
        )}
        's turn
      </Text>
      <GameBoard turnLetter />
      {timer !== "" ? <Timer timer={timer} /> : null}
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

export default StartGame;
