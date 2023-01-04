import { Flex, Text } from "@react-native-material/core";
import React, { useEffect, useState } from "react";
import { StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { variableThema } from "../helpers/variableThema";
import ButtonCast from "../components/buttonCast/ButtonCast";

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

  return (
    <Flex fill center style={styles.conteiner}>
      <Flex center>
        <Text style={styles.titleSet}>Adjust the bot level</Text>
        <Flex direction="row" style={styles.boxLvl}>
          <Flex style={styles.buttonSet}>
            <TouchableOpacity
              style={[
                styles.buttonCircle,
                {
                  backgroundColor: lvl === "easy" ? variableThema.easy : "#777",
                },
              ]}
              onPress={() => setLvl("easy")}
            />
            <Text
              variant="body2"
              style={[
                styles.butSetText,
                {
                  fontSize: sizeFont,
                  color: variableThema.easy,
                },
              ]}
            >
              easy
            </Text>
          </Flex>
          <Flex style={styles.buttonSet}>
            <TouchableOpacity
              style={[
                styles.buttonCircle,
                {
                  backgroundColor:
                    lvl === "normal" ? variableThema.normal : "#777",
                },
              ]}
              onPress={() => setLvl("normal")}
            />
            <Text
              variant="body2"
              style={[
                styles.butSetText,
                {
                  fontSize: sizeFont,
                  color: variableThema.normal,
                },
              ]}
            >
              normal
            </Text>
          </Flex>
          <Flex style={styles.buttonSet}>
            <TouchableOpacity
              style={[
                styles.buttonCircle,
                {
                  backgroundColor: lvl === "hard" ? variableThema.hard : "#777",
                },
              ]}
              onPress={() => setLvl("hard")}
            />
            <Text
              style={[
                styles.butSetText,
                {
                  fontSize: sizeFont,
                  color: variableThema.hard,
                },
              ]}
            >
              hard
            </Text>
          </Flex>
          <Flex style={styles.buttonSet}>
            <TouchableOpacity
              style={[
                styles.buttonCircle,
                {
                  backgroundColor:
                    lvl === "impossible" ? variableThema.impossible : "#777",
                },
              ]}
              onPress={() => setLvl("impossible")}
            />
            <Text
              variant="body2"
              style={[
                styles.butSetText,
                {
                  fontSize: sizeFont,
                  color: variableThema.impossible,
                },
              ]}
            >
              impossible
            </Text>
          </Flex>
        </Flex>

        <Text style={styles.titleSet}>Adjust the timer</Text>

        <Flex direction="row" style={styles.boxLvl}>
          <Flex style={styles.buttonSet}>
            <TouchableOpacity
              style={[
                styles.buttonCircle,
                {
                  backgroundColor: timer === "" ? variableThema.easy : "#777",
                },
              ]}
              onPress={() => setTimer("")}
            />
            <Text
              style={[
                styles.butSetText,
                {
                  fontSize: sizeFont,
                  color: variableThema.easy,
                },
              ]}
            >
              no timer
            </Text>
          </Flex>

          <Flex style={styles.buttonSet}>
            <TouchableOpacity
              style={[
                styles.buttonCircle,
                {
                  backgroundColor:
                    timer === "5s" ? variableThema.normal : "#777",
                },
              ]}
              onPress={() => setTimer("5s")}
            />
            <Text
              style={[
                styles.butSetText,
                {
                  fontSize: sizeFont,
                  color: variableThema.normal,
                },
              ]}
            >
              5s
            </Text>
          </Flex>

          <Flex style={styles.buttonSet}>
            <TouchableOpacity
              style={[
                styles.buttonCircle,
                {
                  backgroundColor: timer === "3s" ? variableThema.hard : "#777",
                },
              ]}
              onPress={() => setTimer("3s")}
            />
            <Text
              style={[
                styles.butSetText,
                {
                  fontSize: sizeFont,
                  color: variableThema.hard,
                },
              ]}
            >
              3s
            </Text>
          </Flex>

          <Flex style={styles.buttonSet}>
            <TouchableOpacity
              style={[
                styles.buttonCircle,
                {
                  backgroundColor:
                    timer === "2s" ? variableThema.impossible : "#777",
                },
              ]}
              onPress={() => setTimer("2s")}
            />
            <Text
              style={[
                styles.butSetText,
                {
                  fontSize: sizeFont,
                  color: variableThema.impossible,
                },
              ]}
            >
              2s
            </Text>
          </Flex>
        </Flex>
      </Flex>

      <Flex center>
        <Text style={styles.start}>Start game</Text>
        <ButtonCast
          textBt={"board 3*3"}
          onClickBt={() =>
            navigation.navigate("StartB", {
              lvl,
              sizeBoard: 3,
              startTimer: timer,
            })
          }
        />
        <ButtonCast
          textBt={"board 4*4"}
          onClickBt={() => {
            navigation.navigate("StartB", {
              lvl,
              sizeBoard: 4,
              startTimer: timer,
            });
          }}
        />
        <ButtonCast
          textBt={"board 5*5"}
          onClickBt={() =>
            navigation.navigate("StartB", {
              lvl,
              sizeBoard: 5,
              startTimer: timer,
            })
          }
        />
      </Flex>
    </Flex>
  );
};
const styles = StyleSheet.create({
  conteiner: {
    backgroundColor: variableThema.backgroundApp,
    paddingTop: Dimensions.get("window").height * 0.08,
  },
  titleSet: {
    fontSize: 18,
    fontWeight: "800",
    color: variableThema.titleApp,
    marginBottom: Dimensions.get("window").height * 0.02,
  },
  buttonSet: {
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
    marginBottom: Dimensions.get("window").height * 0.015,
  },
  buttonCircle: {
    width: Dimensions.get("window").width * 0.07,
    height: Dimensions.get("window").width * 0.07,
    borderRadius: Dimensions.get("window").width * 0.05,
    borderColor: "#444",
    borderWidth: Dimensions.get("window").width * 0.01,
  },
  boxLvl: {
    marginBottom: Dimensions.get("window").height * 0.01,
    width: Dimensions.get("window").width * 0.85,
  },
  butSetText: {
    textAlign: "center",
    fontWeight: "600",
  },
  start: {
    fontSize: 22,
    fontWeight: "800",
    color: variableThema.colorX,
    marginBottom: Dimensions.get("window").height * 0.015,
  },
});

export default BotSetting;
