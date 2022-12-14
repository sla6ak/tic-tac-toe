import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Image, StyleSheet, Dimensions } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import BotSetting from "../screens/BotSetting";
import StartGame from "../screens/StartGame";
import PlayerSetting from "../screens/PlayerSetting";
import { variableThema } from "../helpers/variableThema";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import home from "./images/home.png";
import bot from "./images/manageaccounts.png";
import human from "./images/people.png";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Routers = () => {
  const BotGame = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={BotSetting} options={{ headerShown: false }} />
        <Stack.Screen name="Start" component={StartGame} options={{ headerShown: false }} />
      </Stack.Navigator>
    );
  };
  const HumanGame = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={PlayerSetting} options={{ headerShown: false }} />
        <Stack.Screen name="Start" component={StartGame} options={{ headerShown: false }} />
      </Stack.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            position: "absolute",
            backgroundColor: variableThema.backgroundApp,
            top: 0,
            height: Dimensions.get("window").height * 0.08,
          },
          headerStyle: {},
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: "",
            tabBarActiveTintColor: {},
            tabBarIconStyle: {},
            tabBarIcon: ({ focused: boolean, color: string, size: number }) => (
              <Image style={styles.logo} source={home} />
            ),
          }}
        />
        <Tab.Screen
          name="Bot"
          component={BotGame}
          options={{
            tabBarLabel: "",
            tabBarIcon: () => <Image style={styles.logo} source={bot} />,
          }}
        />
        <Tab.Screen
          name="Player"
          component={HumanGame}
          options={{
            tabBarLabel: "",
            tabBarIcon: () => <Image style={styles.logo} source={human} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: Dimensions.get("window").height * 0.05,
    height: Dimensions.get("window").height * 0.05,
  },
});
export default Routers;
