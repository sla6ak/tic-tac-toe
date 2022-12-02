import { Flex, Text } from "@react-native-material/core";
import React, { useEffect, useState } from "react";
import { StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { variableThema } from "../helpers/variableThema";

const BotSetting = ({ navigation }) => {
  const [timer, setTimer] = useState("");
  const [lvl, setLvl] = useState("easy");
  const [sizeFont, setSizeFont] = useState(16);
  useEffect(() => {
    const window = Dimensions.get("window");
    if (window.width < 430) {
      setSizeFont(12);
    }
  }, []);

  const colorTimer = () => {
    if (timer === "5s") {
      return variableThema.normal;
    }
    if (timer === "3s") {
      return variableThema.hard;
    }
    if (timer === "1s") {
      return variableThema.imposible;
    }
    return variableThema.easy;
  };

  return (
    <Flex fill center style={styles.conteiner}>
      <Text style={styles.title}>Adjust the bot level:</Text>
      <Flex direction="row" style={styles.boxLvl}>
        <Flex center fill>
          <TouchableOpacity
            style={{
              width: 35,
              height: 35,
              backgroundColor: lvl === "easy" ? variableThema.easy : "#444",
              borderRadius: 20,
              borderColor: "#777",
              borderWidth: 5,
            }}
            onPress={() => setLvl("easy")}
          />
          <Text
            variant="body2"
            style={{
              textAlign: "center",
              fontSize: sizeFont,
              fontWeight: "600",
              color: variableThema.easy,
            }}
          >
            easy
          </Text>
        </Flex>
        <Flex center fill>
          <TouchableOpacity
            style={{
              width: 35,
              height: 35,
              backgroundColor: lvl === "normal" ? variableThema.normal : "#444",
              borderRadius: 20,
              borderColor: "#777",
              borderWidth: 5,
              marginLeft: 40,
            }}
            onPress={() => setLvl("normal")}
          />
          <Text
            variant="body2"
            style={{
              textAlign: "center",
              fontSize: sizeFont,
              fontWeight: "600",
              color: variableThema.normal,
            }}
          >
            normal
          </Text>
        </Flex>
        <Flex center fill>
          <TouchableOpacity
            style={{
              width: 35,
              height: 35,
              backgroundColor: lvl === "hard" ? variableThema.hard : "#444",
              borderRadius: 20,
              borderColor: "#777",
              borderWidth: 5,
              marginLeft: 40,
            }}
            onPress={() => setLvl("hard")}
          />
          <Text
            variant="body2"
            style={{
              textAlign: "center",
              fontSize: sizeFont,
              fontWeight: "600",
              color: variableThema.hard,
            }}
          >
            hard
          </Text>
        </Flex>
        <Flex center fill>
          <TouchableOpacity
            style={{
              width: 35,
              height: 35,
              backgroundColor: lvl === "impossible" ? variableThema.imposible : "#444",
              borderRadius: 20,
              borderColor: "#777",
              borderWidth: 5,
              marginLeft: 40,
            }}
            onPress={() => setLvl("impossible")}
          />
          <Text
            variant="body2"
            style={{
              textAlign: "center",
              fontSize: sizeFont,
              fontWeight: "600",
              color: variableThema.imposible,
            }}
          >
            impossible
          </Text>
        </Flex>
      </Flex>

      <Text style={styles.title}>Adjust the timer:</Text>
      {/* <Text
        style={{
          fontSize: 18,
          fontWeight: "800",
          color: colorTimer(),
          marginBottom: 20,
        }}
      >
        {timer === "1s" && "With a this timer, the bot won't give you a chance"}
        {timer === "3s" && "The timer for profesionals"}
        {timer === "5s" && "The timer for lazy temp"}
        {timer === "" && "The timer is off, you can think and even sleep"}
      </Text> */}
      <Flex direction="row" style={styles.boxLvl}>
        <Flex center fill>
          <TouchableOpacity
            style={{
              width: 35,
              height: 35,
              backgroundColor: timer === "" ? variableThema.easy : "#444",
              borderRadius: 20,
              borderColor: "#777",
              borderWidth: 5,
            }}
            onPress={() => setTimer("")}
          />
          <Text
            style={{
              textAlign: "center",
              fontSize: sizeFont,
              fontWeight: "600",
              color: variableThema.easy,
            }}
          >
            no timer
          </Text>
        </Flex>

        <Flex center fill>
          <TouchableOpacity
            style={{
              width: 35,
              height: 35,
              backgroundColor: timer === "5s" ? variableThema.normal : "#444",
              borderRadius: 20,
              borderColor: "#777",
              borderWidth: 5,
              marginLeft: 40,
            }}
            onPress={() => setTimer("5s")}
          />
          <Text
            style={{
              textAlign: "center",
              fontSize: sizeFont,
              fontWeight: "600",
              color: variableThema.normal,
            }}
          >
            5s
          </Text>
        </Flex>

        <Flex center fill>
          <TouchableOpacity
            style={{
              width: 35,
              height: 35,
              backgroundColor: timer === "3s" ? variableThema.hard : "#444",
              borderRadius: 20,
              borderColor: "#777",
              borderWidth: 5,
              marginLeft: 40,
            }}
            onPress={() => setTimer("3s")}
          />
          <Text
            style={{
              textAlign: "center",
              fontSize: sizeFont,
              fontWeight: "600",
              color: variableThema.hard,
            }}
          >
            3s
          </Text>
        </Flex>

        <Flex center fill>
          <TouchableOpacity
            style={{
              width: 35,
              height: 35,
              backgroundColor: timer === "1s" ? variableThema.imposible : "#444",
              borderRadius: 20,
              borderColor: "#777",
              borderWidth: 5,
              marginLeft: 40,
            }}
            onPress={() => setTimer("1s")}
          />
          <Text
            style={{
              textAlign: "center",
              fontSize: sizeFont,
              fontWeight: "600",
              color: variableThema.imposible,
            }}
          >
            1s
          </Text>
        </Flex>
      </Flex>

      <Text style={styles.start}>Start game:</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Start", { lvl, sizeBoard: 3, startTimer: timer })}
      >
        <Text>board 3*3</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("Start", { lvl, sizeBoard: 4, startTimer: timer });
        }}
      >
        <Text>board 4*4</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Start", { lvl, sizeBoard: 5, startTimer: timer })}
      >
        <Text>board 5*5</Text>
      </TouchableOpacity>
    </Flex>
  );
};
const styles = StyleSheet.create({
  conteiner: { backgroundColor: "#555" },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#89dbc9",
    marginBottom: 20,
  },
  helperText: {},

  button: {
    fontWeight: "800",
    backgroundColor: "#9b9b9b",
    borderRadius: 5,
    marginBottom: 30,
    minWidth: Dimensions.get("window").width * 0.5,
    minHeight: Dimensions.get("window").width * 0.07,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  boxLvl: {
    marginBottom: 30,
    minWidth: Dimensions.get("window").width * 0.7,
    minHeight: Dimensions.get("window").width * 0.15,
  },
  start: {
    fontSize: 22,
    fontWeight: "800",
    color: "#e788ff",
    marginBottom: 20,
  },
});

export default BotSetting;
