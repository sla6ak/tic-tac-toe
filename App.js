import ToastConfig from "./src/helpers/ToastConfig";
import Routers from "./src/routers/Routers";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <Routers />
      <ToastConfig />
    </Provider>
  );
}
