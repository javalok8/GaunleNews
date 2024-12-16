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

import HomeTabs from "./HomeTabs";
import HomeDetailScreen from "../ghar/screens/HomeDetailScreen";
import ReviewScreen from "../ghar/screens/ReviewScreen";

const AuthStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={"SplashScreen"}
    >
      {/* news navigation  */}
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="Tab" component={Tabs} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="NewsDetail" component={NewsDetail} />
      <Stack.Screen name="SearchNews" component={SearchNews} />

      <Stack.Screen name="AppUi" component={AppUi} />
      <Stack.Screen name="HomeTabs" component={HomeTabs} />
      <Stack.Screen name="HomeDetailScreen" component={HomeDetailScreen} />
      <Stack.Screen name="ReviewScreen" component={ReviewScreen} />

      {/* Home Stay navigation  */}
    </Stack.Navigator>
  );
};

export default AuthStack;
