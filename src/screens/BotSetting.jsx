import { Button, Box, Text } from "@react-native-material/core";
import { Flex } from "react-native-flex-layout";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

const BotSetting = ({ navigation }) => {
  const [timer, setTimer] = useState("");
  const [lvl, setLvl] = useState(arrLvls[0]);

  return (
    <Flex fill center style={styles.conteiner}>
      <Text style={styles.title}>Adjust the game level:</Text>
      <Flex direction="row" style={styles.boxLvl}>
        <TouchableOpacity
          style={{
            width: 30,
            height: 30,
            backgroundColor: lvl === "ease" ? "#59fc74" : "#444",
            borderRadius: 20,
            borderColor: "#777",
            borderWidth: 5,
          }}
          onPress={() => setLvl("easy")}
        />
        <TouchableOpacity
          style={{
            width: 30,
            height: 30,
            backgroundColor: lvl === "ease" ? "#59fc74" : "#444",
            borderRadius: 20,
            borderColor: "#777",
            borderWidth: 5,
            marginLeft: 40,
          }}
          onPress={() => setLvl("normal")}
        />
        <TouchableOpacity
          style={{
            width: 30,
            height: 30,
            backgroundColor: lvl === "ease" ? "#59fc74" : "#444",
            borderRadius: 20,
            borderColor: "#777",
            borderWidth: 5,
            marginLeft: 40,
          }}
          onPress={() => setLvl("hard")}
        />
        <TouchableOpacity
          style={{
            width: 30,
            height: 30,
            backgroundColor: lvl === "ease" ? "#59fc74" : "#444",
            borderRadius: 20,
            borderColor: "#777",
            borderWidth: 5,
            marginLeft: 40,
          }}
          onPress={() => setLvl("very hard")}
        />
      </Flex>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "800",
          color: timer ? "#ffaaaa" : "#a3fc9b",
          marginBottom: 20,
        }}
      >
        <Text style={styles.title}>Adjust the timer:</Text>
        {timer === "1s" && "With a this timer, the bot won't give you a chance"}
        {timer === "3s" && "The timer for profesionals"}
        {timer === "5s" && "The timer for lazy temp"}
        {timer === "" && "The timer is off, you can think and even sleep"}
      </Text>
      <Flex direction="row" style={styles.boxLvl}>
        <TouchableOpacity
          style={{
            width: 30,
            height: 30,
            backgroundColor: lvl === "ease" ? "#59fc74" : "#444",
            borderRadius: 20,
            borderColor: "#777",
            borderWidth: 5,
          }}
          onPress={() => setTimer("")}
        />
        <TouchableOpacity
          style={{
            width: 30,
            height: 30,
            backgroundColor: lvl === "ease" ? "#59fc74" : "#444",
            borderRadius: 20,
            borderColor: "#777",
            borderWidth: 5,
            marginLeft: 40,
          }}
          onPress={() => setTimer("5s")}
        />
        <TouchableOpacity
          style={{
            width: 30,
            height: 30,
            backgroundColor: lvl === "ease" ? "#59fc74" : "#444",
            borderRadius: 20,
            borderColor: "#777",
            borderWidth: 5,
            marginLeft: 40,
          }}
          onPress={() => setTimer("3s")}
        />
        <TouchableOpacity
          style={{
            width: 30,
            height: 30,
            backgroundColor: lvl === "ease" ? "#59fc74" : "#444",
            borderRadius: 20,
            borderColor: "#777",
            borderWidth: 5,
            marginLeft: 40,
          }}
          onPress={() => setTimer("1s")}
        />
      </Flex>

      <Text style={styles.title}>Start game:</Text>
      <Button
        color="#9c9c9c"
        style={styles.button}
        title="board 3*3"
        onPress={() => navigation.navigate("GameOne", { lvl, sizeBoard: 3, startTimer: timer })}
      />
      <Button
        color="#9b9b9b"
        style={styles.button}
        title="board 4*4"
        onPress={() => {
          navigation.navigate("GameOne", { lvl, sizeBoard: 4, startTimer: timer });
        }}
      />
      <Button
        color="#9b9b9b"
        style={styles.button}
        title="board 5*5"
        onPress={() => navigation.navigate("GameOne", { lvl, sizeBoard: 5, startTimer: timer })}
      />
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
  helperText: {},
  button: {
    marginBottom: 30,
  },
  boxLvl: {
    marginBottom: 30,
  },
});
export default BotSetting;
