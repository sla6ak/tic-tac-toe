import Routers from "./src/routers/Routers";
import "react-native-gesture-handler";
import SoundsInit from "./src/musics/SoundsInit";
import { store } from "./src/redux/store";
import { Provider } from "react-redux";
import { StatusBar } from "react-native";

export default function App() {
  return (
    <Provider store={store}>
      <SoundsInit>
        <Routers />
      </SoundsInit>
      <StatusBar backgroundColor="#777" translucent hidden={false} />
    </Provider>
  );
}
