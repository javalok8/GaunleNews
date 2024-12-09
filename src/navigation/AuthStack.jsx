import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../news/screens/SplashScreen";
import Tabs from "./Tabs";
import Login from "../news/screens/Login";
import Register from "../news/screens/Register";
import Onboarding from "../news/screens/Onboarding";
import NewsDetail from "../news/screens/NewsDetail";

import AppUi from "../ReduxTool/AppUi";
import SearchNews from "../news/screens/SearchNews";

const AuthStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={"SplashScreen"}
    >
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="Tab" component={Tabs} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="NewsDetail" component={NewsDetail} />
      <Stack.Screen name="SearchNews" component={SearchNews} />

      <Stack.Screen name="AppUi" component={AppUi} />
    </Stack.Navigator>
  );
};

export default AuthStack;
