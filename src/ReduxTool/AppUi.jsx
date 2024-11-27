import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, selectCount } from "./counterSlice";
import { View, Text, Button } from "react-native";

const AppUi = ({ navigation }) => {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();

  const goHome = () => {
    navigation.navigate("Home");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Redux Example</Text>
      <Text>Count: {count}</Text>
      <Button title="Increment" onPress={() => dispatch(increment())} />
      <Button title="Decrement" onPress={() => dispatch(decrement())} />

      <Button title="Go Home" onPress={goHome} />
    </View>
  );
};

export default AppUi;
