import { StyleSheet, TouchableOpacity, Dimensions, Image } from "react-native";
import React from "react";
import OnV from "./musicOn.png";
import OffV from "./music.png";

const ButSong = ({ music, setMusic }) => {
  return (
    <TouchableOpacity
      style={styles.btStyle}
      onPress={() => {
        setMusic(!music);
      }}
    >
      {music ? (
        <Image style={styles.logo} source={OnV} />
      ) : (
        <Image style={styles.logo} source={OffV} />
      )}
    </TouchableOpacity>
  );
};

export default ButSong;

const styles = StyleSheet.create({
  logo: {
    width: Dimensions.get("window").height * 0.05,
    height: Dimensions.get("window").height * 0.05,
  },
  btStyle: { marginTop: Dimensions.get("window").height * 0.02 },
});
