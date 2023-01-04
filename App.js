import Routers from "./src/routers/Routers";
import { store } from "./src/redux/store";
import { Provider } from "react-redux";

export default function App() {
  return (
    <Provider store={store}>
      <Routers />
    </Provider>
  );
}
