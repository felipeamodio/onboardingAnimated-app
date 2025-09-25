import {
  Alert,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import Animated, {
  AnimatedRef,
  interpolateColor,
  runOnJS,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { OnboardingData } from "../assets/animation/data/data";

type ButtonProps = {
  dataLength: number;
  scrollIndex: SharedValue<number>;
  scrollRef: AnimatedRef<FlatList<OnboardingData>>;
  x: SharedValue<number>;
  onFinish?: () => void;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function Button({
  dataLength,
  scrollIndex,
  scrollRef,
  x,
  onFinish,
}: ButtonProps) {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const buttonScale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    const isLastIndex = scrollIndex.value === dataLength - 1;

    return {
      width: isLastIndex ? withSpring(140) : withSpring(60),
      height: 60,
      transform: [{ scale: buttonScale.value }],
      backgroundColor: interpolateColor(
        x.value,
        [0, SCREEN_WIDTH, 2 * SCREEN_WIDTH],
        ["#1995E3", "#4527A0", "#0D47A1"]
      ),
    };
  });

  const textStyle = useAnimatedStyle(() => {
    const isLastIndex = scrollIndex.value === dataLength - 1;
    return {
      opacity: isLastIndex ? withTiming(1) : withTiming(0),
      transform: [
        { translateX: isLastIndex ? withTiming(0) : withTiming(-100) },
      ],
    };
  });

  const iconStyle = useAnimatedStyle(() => {
    const isLastIndex = scrollIndex.value === dataLength - 1;
    return {
      width: 35,
      height: 35,
      opacity: isLastIndex ? withTiming(0) : withTiming(1),
      transform: [
        { translateX: isLastIndex ? withTiming(100) : withTiming(0) },
      ],
    };
  });

  const handlePress = () => {
    const isLastIndex = scrollIndex.value === dataLength - 1;

    if (!isLastIndex) {
      scrollRef.current?.scrollToIndex({
        index: scrollIndex.value + 1,
        animated: true,
      });
    } else {
      if (onFinish) {
        runOnJS(onFinish)();
      } else {
        Alert.alert("Finish");
      }
    }
  };

  const handleButton = () => {
    buttonScale.value = withSpring(0.9, {}, () => {
      (buttonScale.value = withSpring(1)), runOnJS(handlePress)();
    });
  };

  return (
    <View style={styles.container}>
      <AnimatedPressable onPress={handleButton}>
        <Animated.View style={[styles.button, animatedStyle]}>
          <Animated.Text style={[styles.text, textStyle]}>
            Get Started
          </Animated.Text>
          <Animated.Image
            source={require("../assets/images/right.png")}
            style={[styles.image, iconStyle]}
          />
        </Animated.View>
      </AnimatedPressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    padding: 10,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  text: {
    color: "#FFFFFF",
    fontSize: 16,
    position: "absolute",
    fontWeight: "bold",
  },
  image: {
    position: "absolute",
  },
});
