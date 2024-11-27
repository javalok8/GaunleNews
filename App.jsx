import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./src/navigation/AuthStack";

//for styles
import EStyleSheet from "react-native-extended-stylesheet";

//for redux toolkit
import { Provider } from "react-redux";
import { store } from "./src/ReduxTool/store";

export default function App() {
  useEffect(() => {
    EStyleSheet.build();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
    </Provider>
  );
}
