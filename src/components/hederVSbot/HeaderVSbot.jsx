import { StyleSheet } from "react-native";
import { Text, Flex } from "@react-native-material/core";
import React, { useEffect } from "react";
import { variableThema } from "../../helpers/variableThema";

const HeaderVSbot = ({ lvl, counter }) => {
  return (
    <Flex>
      <Text style={{ fontSize: 22, fontWeight: "800", color: "#1d1d1d", marginBottom: 10 }}>
        Game vs_
        <Text
          style={{
            fontSize: 22,
            fontWeight: "800",
            color: variableThema[lvl],
            marginBottom: 20,
          }}
        >
          {lvl.toUpperCase()}
        </Text>
        _bot
      </Text>
      <Flex direction="row" style={{ marginBottom: 5 }}>
        <Text style={{ fontSize: 18, fontWeight: "600", color: "#252525" }}>match PLAYER:</Text>
        <Text
          style={{
            marginLeft: 5,
            fontSize: 20,
            fontWeight: "800",
            color: "#00c241",
          }}
        >
          {counter.player}
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
            marginLeft: 15,
            color: "#252525",
          }}
        >
          BOT:
        </Text>
        <Text
          style={{
            marginLeft: 5,
            fontWeight: "800",
            fontSize: 20,
            color: "#fa3c3c",
          }}
        >
          {counter.bot}
        </Text>
      </Flex>
    </Flex>
  );
};

export default HeaderVSbot;

const styles = StyleSheet.create({});
