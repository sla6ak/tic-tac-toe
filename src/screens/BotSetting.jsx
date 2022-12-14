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
      <Flex center>
        <Text style={styles.titleSet}>Adjust the bot level</Text>
        <Flex direction="row" style={styles.boxLvl}>
          <Flex style={styles.buttonSet}>
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
          <Flex style={styles.buttonSet}>
            <TouchableOpacity
              style={{
                width: 35,
                height: 35,
                backgroundColor: lvl === "normal" ? variableThema.normal : "#444",
                borderRadius: 20,
                borderColor: "#777",
                borderWidth: 5,
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
          <Flex style={styles.buttonSet}>
            <TouchableOpacity
              style={{
                width: 35,
                height: 35,
                backgroundColor: lvl === "hard" ? variableThema.hard : "#444",
                borderRadius: 20,
                borderColor: "#777",
                borderWidth: 5,
              }}
              onPress={() => setLvl("hard")}
            />
            <Text
              variant="body2"
              style={{
                textAlign: "center",
                fontSize: sizeFont,
                fontWeight: "600",
                color: "#eeab1b",
              }}
            >
              hard
            </Text>
          </Flex>
          <Flex style={styles.buttonSet}>
            <TouchableOpacity
              style={{
                width: 35,
                height: 35,
                backgroundColor: lvl === "impossible" ? variableThema.impossible : "#444",
                borderRadius: 20,
                borderColor: "#777",
                borderWidth: 5,
              }}
              onPress={() => setLvl("impossible")}
            />
            <Text
              variant="body2"
              style={{
                textAlign: "center",
                fontSize: sizeFont,
                fontWeight: "600",
                color: variableThema.impossible,
              }}
            >
              impossible
            </Text>
          </Flex>
        </Flex>

        <Text style={styles.titleSet}>Adjust the timer</Text>

        <Flex direction="row" style={styles.boxLvl}>
          <Flex style={styles.buttonSet}>
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

          <Flex style={styles.buttonSet}>
            <TouchableOpacity
              style={{
                width: 35,
                height: 35,
                backgroundColor: timer === "5s" ? variableThema.normal : "#444",
                borderRadius: 20,
                borderColor: "#777",
                borderWidth: 5,
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

          <Flex style={styles.buttonSet}>
            <TouchableOpacity
              style={{
                width: 35,
                height: 35,
                backgroundColor: timer === "3s" ? variableThema.hard : "#444",
                borderRadius: 20,
                borderColor: "#777",
                borderWidth: 5,
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

          <Flex style={styles.buttonSet}>
            <TouchableOpacity
              style={{
                width: 35,
                height: 35,
                backgroundColor: timer === "2s" ? variableThema.impossible : "#444",
                borderRadius: 20,
                borderColor: "#777",
                borderWidth: 5,
              }}
              onPress={() => setTimer("2s")}
            />
            <Text
              style={{
                textAlign: "center",
                fontSize: sizeFont,
                fontWeight: "600",
                color: variableThema.impossible,
              }}
            >
              2s
            </Text>
          </Flex>
        </Flex>
      </Flex>

      <Flex center>
        <Text style={styles.start}>Start game</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Start", { lvl, sizeBoard: 3, startTimer: timer })}
        >
          <Text style={styles.textBtn}>board 3*3</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("Start", { lvl, sizeBoard: 4, startTimer: timer });
          }}
        >
          <Text style={styles.textBtn}>board 4*4</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Start", { lvl, sizeBoard: 5, startTimer: timer })}
        >
          <Text style={styles.textBtn}>board 5*5</Text>
        </TouchableOpacity>
      </Flex>
    </Flex>
  );
};
const styles = StyleSheet.create({
  conteiner: { backgroundColor: variableThema.backgroundApp },
  titleSet: {
    fontSize: 18,
    fontWeight: "800",
    color: variableThema.titleApp,
    marginBottom: 5,
  },
  buttonSet: { justifyContent: "center", flex: 1, alignItems: "center" },

  button: {
    fontWeight: "800",
    backgroundColor: variableThema.generalBtn,
    borderRadius: 5,
    marginBottom: 30,
    minWidth: Dimensions.get("window").width * 0.5,
    minHeight: Dimensions.get("window").height * 0.06,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  textBtn: {
    fontWeight: "800",
    fontSize: 18,
    color: "#fff",
  },
  boxLvl: {
    marginBottom: Dimensions.get("window").height * 0.01,
    minWidth: Dimensions.get("window").width * 0.7,
    minHeight: Dimensions.get("window").height * 0.15,
  },
  start: {
    fontSize: 22,
    fontWeight: "800",
    color: variableThema.colorX,
    marginBottom: 20,
  },
});

export default BotSetting;
