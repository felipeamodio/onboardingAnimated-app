import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { SharedValue } from "react-native-reanimated";
import { OnboardingData } from "../assets/animation/data/data";

type RenderItemProps = {
  index: number;
  x: SharedValue<number>;
  item: OnboardingData;
};

export function RenderItem({ index, x, item }: RenderItemProps) {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const circleSize = SCREEN_WIDTH;
  const lottieSize = SCREEN_WIDTH * 0.9;
  const circleRedius = SCREEN_WIDTH / 2;

  return (
    <View style={[styles.itemContainer, { width: SCREEN_WIDTH }]}>
      <Text>RenderItem</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 120,
  },
});
