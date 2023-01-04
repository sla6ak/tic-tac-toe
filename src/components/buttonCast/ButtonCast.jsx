import { StyleSheet, Text, TouchableOpacity, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import { variableThema } from "../../helpers/variableThema";

const ButtonCast = ({ textBt, onClickBt, small = null }) => {
  const [sizeFont, setSizeFont] = useState(14);

  useEffect(() => {
    const window = Dimensions.get("window");
    if (window.width > 799) {
      setSizeFont(26);
      return;
    }
    if (window.width > 599) {
      setSizeFont(20);
      return;
    }
    if (window.width > 399) {
      setSizeFont(16);
      return;
    }
    return;
  }, []);

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          width: !small
            ? Dimensions.get("window").width * 0.5
            : Dimensions.get("window").width * 0.3,
        },
      ]}
      onPress={onClickBt}
    >
      <Text
        style={[
          styles.textBtn,
          {
            fontSize: sizeFont,
          },
        ]}
      >
        {textBt}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    fontWeight: "800",
    backgroundColor: variableThema.generalBtn,
    borderRadius: Dimensions.get("window").height * 0.01,
    marginBottom: Dimensions.get("window").height * 0.03,
    paddingTop: Dimensions.get("window").height * 0.01,
    paddingBottom: Dimensions.get("window").height * 0.01,
    // minHeight: Dimensions.get("window").height * 0.06,
    paddingLeft: Dimensions.get("window").width * 0.01,
    paddingRight: Dimensions.get("window").width * 0.01,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: Dimensions.get("window").height * 0.015,
  },
  textBtn: {
    fontWeight: "800",
    color: "#fff",
  },
});
export default ButtonCast;
