import { StyleSheet } from "react-native";
import { Text, Flex } from "@react-native-material/core";
import React, { useEffect } from "react";
import { variableThema } from "../../helpers/variableThema";

const HeaderVSbot = ({ lvl, counter }) => {
  return (
    <Flex center>
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
      <Flex direction="row" style={{ marginBottom: 5 }}>
        <Text style={{ fontSize: 18, fontWeight: "600", color: variableThema.titleApp }}>
          match PLAYER:
        </Text>
        <Text
          style={{
            marginLeft: 5,
            fontSize: 20,
            fontWeight: "800",
            color: "#0085c2",
          }}
        >
          {counter.player}
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
            marginLeft: 15,
            color: variableThema.titleApp,
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
