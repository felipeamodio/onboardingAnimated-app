import { useCallback, useRef } from "react";
import { FlatList, StyleSheet, View, ViewToken } from "react-native";
import data, { OnboardingData } from "../../assets/animation/data/data";
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { RenderItem } from "../../components/RenderItem";

export default function Onboarding() {
  const scrollRef = useAnimatedRef<FlatList<OnboardingData>>();
  const x = useSharedValue(0);
  const scrollIndex = useSharedValue(0);
  const keyExtractor = useCallback(
    (item: any, index: number) => index.toString(),
    []
  );

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });

  const onViewableItemsChanges = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      const firstVisibleItem = viewableItems[0];
      if (
        firstVisibleItem?.index !== null &&
        firstVisibleItem?.index !== undefined
      ) {
        scrollIndex.value = firstVisibleItem.index;
      }
    },
    []
  );

  const viewabilityConfig = useRef({
    minimumViewTime: 300,
    viewAreaCoveragePercentThreshold: 10,
  });

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={data}
        ref={scrollRef}
        horizontal
        pagingEnabled
        bounces={false}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        keyExtractor={keyExtractor}
        renderItem={({ item, index }) => (
          <RenderItem index={index} item={item} x={x} key={index} />
        )}
        onScroll={onScroll}
        onViewableItemsChanged={onViewableItemsChanges}
        viewabilityConfig={viewabilityConfig.current}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
