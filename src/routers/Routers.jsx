import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import BotSetting from "../screens/BotSetting";
import StartGame from "../screens/StartGame";
import PlayerSetting from "../screens/PlayerSetting";

const Stack = createNativeStackNavigator();

const Routers = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "Tic-tac-toy!",
            headerStyle: {
              backgroundColor: "#353535",
            },
            headerTintColor: "#8fdcff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="Bot"
          component={BotSetting}
          options={{
            title: "Back",
            headerStyle: {
              backgroundColor: "#353535",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="Player"
          component={PlayerSetting}
          options={{
            title: "Back",
            headerStyle: {
              backgroundColor: "#353535",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="Start"
          component={StartGame}
          options={{
            title: "Back",
            headerStyle: {
              backgroundColor: "#353535",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routers;
