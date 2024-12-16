import { TouchableOpacity, StyleSheet, View, ViewStyle } from "react-native";
import { Text } from "@ui-kitten/components";

import { useTheme } from "@ui-kitten/components";

export const ButtonList = ({ data, header, style, borderTop, marginTop }) => {
  const theme = useTheme();
  const getListHeaderComponent = () => {
    if (!header) return null;

    return (
      <View style={[styles.headerContainer, { marginTop: marginTop ? 35 : 0 }]}>
        <Text style={styles.headerText}>{header}</Text>
      </View>
    );
  };

  return (
    <View
      style={[styles.container, style, { borderTopWidth: borderTop ? 1 : 0 }]}
    >
      {getListHeaderComponent()}
      {data.map((item, index) => (
        <TouchableOpacity
          key={item.label}
          onPress={item.onPress}
          style={({ pressed }) => {
            let arr = [
              styles.option,
              {
                backgroundColor: pressed ? theme["color-gray"] : "#f2f2f2",
              },
            ];

            if (index !== data.length - 1) arr.push(styles.container);

            return arr;
          }}
        >
          <Text category={"c4"}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: "#d3d3d3",
    borderBottomWidth: 1,
  },
  headerContainer: {
    paddingVertical: 12,
    backgroundColor: "#f1f7e5",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
  },
  headerText: { fontWeight: "600", marginLeft: 18 },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 18,
  },
});
