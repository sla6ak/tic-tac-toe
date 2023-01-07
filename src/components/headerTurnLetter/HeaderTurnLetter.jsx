import { StyleSheet, View, Dimensions } from "react-native";
import { Text, Flex } from "@react-native-material/core";
import React, { useEffect } from "react";
import { variableThema } from "../../helpers/variableThema";

const HeaderTurnLetter = ({ result, turnName, turnLetter }) => {
  useEffect(() => {}, [turnName]);
  return (
    <Flex direction="row">
      {result === "" ? (
        <Flex
          direction="row"
          center
          style={{ width: Dimensions.get("window").width }}
        >
          <Text
            style={{
              fontSize: 22,
              fontWeight: "800",
              color: variableThema.titleApp,
            }}
          >
            Now it's
          </Text>
          <Text
            style={{
              fontSize: 22,
              fontWeight: "800",
              color: variableThema.titleApp,
              marginLeft: 5,
              marginRight: 5,
            }}
          >
            {turnName}
          </Text>
          {turnLetter === "x" ? (
            <Text
              style={{
                fontSize: 22,
                fontWeight: "800",
                color: variableThema.colorX,
              }}
            >
              X
            </Text>
          ) : (
            <Text
              style={{
                fontSize: 22,
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
              color: variableThema.titleApp,
              marginLeft: 5,
              marginRight: 5,
            }}
          >
            's turn
          </Text>
        </Flex>
      ) : (
        <Text
          style={{
            fontSize: 22,
            fontWeight: "800",
            color: variableThema.titleApp,
          }}
        >
          Game end
        </Text>
      )}
    </Flex>
  );
};

export default HeaderTurnLetter;

const styles = StyleSheet.create({});
