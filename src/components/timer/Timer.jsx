import React from "react";
import { Text } from "@react-native-material/core";
import { Flex } from "react-native-flex-layout";
import { StyleSheet, Dimensions } from "react-native";

export const Timer = ({}) => {
  return (
    <Flex center style={styles.conteiner}>
      <Text style={styles.title}>03</Text>
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
  title: { fontSize: 32, fontWeight: "800", color: "#cfcfcf", marginBottom: 20 },
});
