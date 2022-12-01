import { Text, StatusBar } from "react-native";
import { Button, Box, Flex } from "@react-native-material/core";
import React from "react";
import { StyleSheet } from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <Flex fill center style={styles.conteiner}>
      <Box maxW={"80%"}>
        <Text style={styles.title}>Choose mode:</Text>
        <Button
          color="#9c9c9c"
          style={styles.button}
          title="One player"
          onPress={() => navigation.navigate("Bot")}
        />
        <Button
          color="#9b9b9b"
          style={styles.button}
          title="Two player"
          onPress={() => navigation.navigate("Player")}
        />
        <StatusBar style="auto" />
      </Box>
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
  button: {
    marginBottom: 30,
  },
});
export default HomeScreen;
