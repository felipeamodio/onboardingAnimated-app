import { StyleSheet, View } from "react-native";
import { OnboardingData } from "../assets/animation/data/data";
import { SharedValue } from "react-native-reanimated";
import { Dot } from "./Dot";

type PaginationProps = {
  data: OnboardingData[];
  x: SharedValue<number>;
  dotColor?: string;
  activeDotColor?: string;
  dotSize?: number;
  activeDotSize?: number;
  containerStyle?: object;
};

export function Pagination({
  data,
  x,
  activeDotColor = "#4527A0",
  activeDotSize = 30,
  containerStyle = {},
  dotColor = "#1995E3",
  dotSize = 10,
}: PaginationProps) {
  return (
    <View style={[styles.paginationContainer, containerStyle]}>
      {data.map((_, index) => {
        return (
          <Dot
            index={index}
            x={x}
            key={index}
            inactiveColor={dotColor}
            activeColor={activeDotColor}
            inactiveSize={dotSize}
            activeSize={activeDotSize}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: "row",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
});
