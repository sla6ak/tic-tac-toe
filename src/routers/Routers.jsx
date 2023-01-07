import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Image, StyleSheet, Dimensions } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import BotSetting from "../screens/BotSetting";
import StartGamePlayer from "../screens/StartGamePlayer";
import StartGameBot from "../screens/StartGameBot";
import PlayerSetting from "../screens/PlayerSetting";
import { variableThema } from "../helpers/variableThema";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import home from "./images/home.png";
import bot from "./images/manageaccounts.png";
import human from "./images/people.png";
import homeG from "./images/homeG.png";
import botG from "./images/manageaccountsG.png";
import humanG from "./images/peopleG.png";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Routers = () => {
  const BotGame = () => {
    return (
      <Stack.Navigator initialRouteName="HomeB">
        <Stack.Screen
          name="HomeB"
          component={BotSetting}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="StartB"
          component={StartGameBot}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  };
  const HumanGame = () => {
    return (
      <Stack.Navigator initialRouteName="HomeP">
        <Stack.Screen
          name="HomeP"
          component={PlayerSetting}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="StartP"
          component={StartGamePlayer}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            position: "absolute",
            backgroundColor: variableThema.backgroundApp,
            top: 0,
            paddingTop: 10,
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
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Image style={styles.logo} source={homeG} />
              ) : (
                <Image style={styles.logo} source={home} />
              ),
          }}
        />
        <Tab.Screen
          name="Bot"
          component={BotGame}
          options={{
            tabBarLabel: "",
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Image style={styles.logo} source={botG} />
              ) : (
                <Image style={styles.logo} source={bot} />
              ),
          }}
        />
        <Tab.Screen
          name="Player"
          component={HumanGame}
          options={{
            tabBarLabel: "",
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Image style={styles.logo} source={humanG} />
              ) : (
                <Image style={styles.logo} source={human} />
              ),
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
