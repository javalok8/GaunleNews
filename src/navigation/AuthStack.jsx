import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../screens/SplashScreen";
import Tabs from "./Tabs";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Onboarding from "../screens/Onboarding";
import NewsDetail from "../screens/NewsDetail";
import CategoryList from "../screens/CategoryList";
import About from "../screens/About";

import AppUi from "../ReduxTool/AppUi";
import { TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import SearchNews from "../screens/SearchNews";

const AuthStack = () => {
  const navigation = useNavigation();
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
      <Stack.Screen name="CategoryList" component={CategoryList} />
      <Stack.Screen name="About" component={About} />
      <Stack.Screen
        name="SearchNews"
        component={SearchNews}
        options={{
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={22} />
            </TouchableOpacity>
          ),

          title: "Search",
        }}
      />
      <Stack.Screen name="AppUi" component={AppUi} />
    </Stack.Navigator>
  );
};

export default AuthStack;
