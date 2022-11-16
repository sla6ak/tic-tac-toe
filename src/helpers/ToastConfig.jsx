import Toast from "react-native-toast-message";
import { View, Text } from "react-native";

const toastConfig = {
  BlackToast: ({ text1, text2 }) => (
    <View
      style={{
        minHeight: 50,
        width: "80%",
        backgroundColor: "#202020",
        borderRadius: 3,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
      }}
    >
      <Text
        style={{
          color: "#ff6638",
          fontSize: 14,
          fontWeight: "bold",
          paddingLeft: 30,
        }}
      >
        {text1}
      </Text>
      <Text
        style={{
          color: "#fff",
          textAlign: "center",
          fontSize: 18,
          fontWeight: "600",
        }}
      >
        {text2}
      </Text>
    </View>
  ),
};

const ToastConfig = () => {
  return <Toast visibilityTime={3000} config={toastConfig} />;
};

export default ToastConfig;
