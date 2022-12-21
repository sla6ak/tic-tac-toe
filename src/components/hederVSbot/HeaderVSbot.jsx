import { StyleSheet, Dimensions } from "react-native";
import { Text, Flex } from "@react-native-material/core";
import React, { useEffect } from "react";
import { variableThema } from "../../helpers/variableThema";

const HeaderVSbot = ({ lvl, counter }) => {
  return (
    <Flex center>
      {lvl ? (
        <Text
          style={{
            fontSize: 22,
            fontWeight: "800",
            color: variableThema[lvl],
            marginBottom: Dimensions.get("window").height * 0.015,
          }}
        >
          {lvl.toUpperCase()}
        </Text>
      ) : (
        <Text
          style={{
            fontSize: 22,
            fontWeight: "800",
            color: "#161616",
            marginBottom: Dimensions.get("window").height * 0.015,
          }}
        >
          Two Player Game
        </Text>
      )}
      <Flex direction="row" style={{ marginBottom: 5 }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
            marginRight: 10,
            color: variableThema.titleApp,
          }}
        >
          match
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
            color: variableThema.titleApp,
          }}
        >
          {lvl ? "PLAYER:" : "PLAYER1:"}
        </Text>
        <Text
          style={{
            marginLeft: 5,
            fontSize: 20,
            fontWeight: "800",
            color: "#0085c2",
          }}
        >
          {lvl ? counter.player : counter.player1}
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
            marginLeft: 15,
            color: variableThema.titleApp,
          }}
        >
          {lvl ? "BOT:" : "PLAYER2:"}
        </Text>
        <Text
          style={{
            marginLeft: 5,
            fontWeight: "800",
            fontSize: 20,
            color: "#fa3c3c",
          }}
        >
          {lvl ? counter.bot : counter.player2}
        </Text>
      </Flex>
    </Flex>
  );
};

export default HeaderVSbot;

const styles = StyleSheet.create({});
