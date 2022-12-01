import { StyleSheet } from "react-native";
import { Text, Flex } from "@react-native-material/core";
import React, { useEffect } from "react";
import { variableThema } from "../../helpers/variableThema";

const HeaderTurnLetter = ({ turnName, turnLetter }) => {
  useEffect(() => {}, [turnName]);
  return (
    <Flex
      direction="row"
      style={{
        marginBottom: 20,
      }}
    >
      <Text
        style={{
          fontSize: 22,
          fontWeight: "800",
          color: "#1f1f1f",
        }}
      >
        Now it's
      </Text>
      <Text
        style={{
          fontSize: 22,
          fontWeight: "800",
          color: "#1f1f1f",
          marginLeft: 5,
          marginRight: 5,
        }}
      >
        {turnName}
      </Text>
      {turnLetter === "x" ? (
        <Text
          style={{
            fontSize: 24,
            fontWeight: "800",
            color: variableThema.colorX,
          }}
        >
          X
        </Text>
      ) : (
        <Text
          style={{
            fontSize: 24,
            fontWeight: "800",
            color: variableThema.colorO,
          }}
        >
          O
        </Text>
      )}
      <Text
        style={{
          fontSize: 22,
          fontWeight: "800",
          color: "#1f1f1f",
          marginLeft: 5,
          marginRight: 5,
        }}
      >
        's turn
      </Text>
    </Flex>
  );
};

export default HeaderTurnLetter;

const styles = StyleSheet.create({});
