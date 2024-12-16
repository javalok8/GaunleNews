import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./src/navigation/AuthStack";

//for redux toolkit
import { Provider } from "react-redux";
import { store } from "./src/ReduxTool/store";

//for ui kitten
import * as eva from "@eva-design/eva";
import { ApplicationProvider, Layout, Text } from "@ui-kitten/components";
import { theme } from "./theme";

export default function App() {
  return (
    <ApplicationProvider {...eva} theme={theme}>
      <Provider store={store}>
        <NavigationContainer>
          <AuthStack />
        </NavigationContainer>
      </Provider>
    </ApplicationProvider>
  );
}
