import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import OnePlGame from "../screens/OnePlGame";
import TwoPlGame from "../screens/TwoPlGame";
import LevelBot from "../screens/LevelBot";

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
          name="GameTwo"
          component={TwoPlGame}
          options={{
            title: "Back to menu",
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
          name="GameOne"
          component={OnePlGame}
          options={{
            title: "Back to lvl",
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
          name="Level"
          component={LevelBot}
          options={{
            title: "Back to menu",
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
