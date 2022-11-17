import React, { useEffect, useState } from "react";
import { Text } from "@react-native-material/core";
import { Flex } from "react-native-flex-layout";
import { StyleSheet, Dimensions } from "react-native";

export const Timer = ({ setTimeMove, timeMove, timerStop }) => {
  const [ping, setPing] = useState(null);
  const [colorTime, setColorTime] = useState("#fff");

  useEffect(() => {
    if (!timerStop) {
      return;
    }
    clearTimeout(ping);
    setPing(0);
  }, [timerStop]);

  useEffect(() => {
    if (timeMove < 1) {
      return;
    }
    if (ping) {
      clearTimeout(ping);
    }
    let newPing = setTimeout(() => {
      setTimeMove(timeMove - 1);
    }, 1000);
    setPing(newPing);
  }, [timeMove]);

  useEffect(() => {
    if (timeMove < 2) {
      setColorTime("#cc403b");
      return;
    }
    if (timeMove < 3) {
      setColorTime("#f86604");
      return;
    }
    if (timeMove < 4) {
      setColorTime("#f3c21f");
      return;
    }
    if (timeMove < 5) {
      setColorTime("#a2e22c");
      return;
    }
    if (timeMove < 6) {
      setColorTime("#22da4a");
      return;
    }
    if (timeMove < 7) {
      setColorTime("#80f794");
      return;
    }
    if (timeMove < 8) {
      setColorTime("#b1ffbe");
      return;
    }
    if (timeMove > 7) {
      setColorTime("#beffff");
      return;
    }
  }, [timeMove]);

  return (
    <Flex center style={styles.conteiner}>
      <Text style={{ fontSize: 38, fontWeight: "800", color: colorTime }}>0{timeMove} :left</Text>
    </Flex>
  );
};

const styles = StyleSheet.create({
  conteiner: {
    flexDirection: "row",
    backgroundColor: "#555",
  },
  title: {},
});
