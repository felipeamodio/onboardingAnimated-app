import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  SharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

type DotProps = {
  index: number;
  x: SharedValue<number>;
  activeColor?: string;
  inactiveColor?: string;
  activeSize?: number;
  inactiveSize?: number;
  dotStyle?: object;
  activeDotStyle?: object;
};

export function Dot({
  index,
  x,
  activeColor = "#4527A0",
  activeDotStyle = {},
  activeSize = 20,
  dotStyle = {},
  inactiveColor = "#1995E3",
  inactiveSize = 10,
}: DotProps) {
  const { width: SCREEN_WIDTH } = useWindowDimensions();

  const animationRange = [
    (index - 1) * SCREEN_WIDTH,
    index * SCREEN_WIDTH,
    (index + 1) * SCREEN_WIDTH,
  ];

  const animatedStyle = useAnimatedStyle(() => {
    const sizeAnimation = interpolate(x.value, animationRange, [
      inactiveSize,
      activeSize,
      inactiveSize,
    ]);

    const opacity = interpolate(
      x.value,
      animationRange,
      [0.5, 1, 0.5],
      Extrapolation.CLAMP
    );

    const scale = interpolate(
      x.value,
      animationRange,
      [0.8, 1.2, 0.8],
      Extrapolation.CLAMP
    );

    return {
      width: sizeAnimation,
      height: sizeAnimation,
      opacity: opacity,
      transform: [{ scale: withSpring(scale, { damping: 15 }) }],
    };
  });

  const animatedColor = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      x.value,
      [0, SCREEN_WIDTH, 2 * SCREEN_WIDTH],
      [inactiveColor, activeColor, inactiveColor]
    );
    return {
      backgroundColor: backgroundColor,
    };
  });

  return (
    <Animated.View
      style={[
        styles.dots,
        dotStyle,
        activeDotStyle,
        animatedColor,
        animatedStyle,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  dots: {
    marginHorizontal: 6,
    borderRadius: 50,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
