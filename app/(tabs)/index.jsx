import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl,
  Dimensions,
  FlatList,
  Image,
} from "react-native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolateColor,
  useAnimatedScrollHandler,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";
import { TYPOGRAPHY } from "../../constants/typography";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.5;

//////////////////////////////////////////////////////////////////////////////////////
// ✅ Stock Card Component (HOOKS MUST BE INSIDE COMPONENT)
//////////////////////////////////////////////////////////////////////////////////////

const StockCard = ({ item }) => {
  const isPositive = item.change >= 0;

  return (
    <View style={styles.stockCard}>
      {/* LEFT SIDE */}
      <View style={{ flex: 1 }}>
        {/* Change Pill */}
        <View style={styles.pill}>
          <Text
            style={[
              styles.pillText,
              { color: isPositive ? "#16A34A" : "#DC2626" },
            ]}
          >
            {isPositive ? "+" : ""}
            {item.change.toFixed(2)}
          </Text>
        </View>

        {/* Price */}
        <Text style={styles.stockPrice}>
          ${item.price.toLocaleString()}
        </Text>

        {/* Name */}
        <Text style={styles.stockName}>{item.name}</Text>
      </View>

      {/* Floating Icon */}
      <View style={styles.iconOuter}>
        <View style={styles.iconWrapper}>
          <Image source={{ uri: item.logo }} style={styles.logo} />
        </View>
      </View>
    </View>
  );
};
//////////////////////////////////////////////////////////////////////////////////////
// ✅ MAIN SCREEN
//////////////////////////////////////////////////////////////////////////////////////

export default function Index() {
  const [refreshing, setRefreshing] = useState(false);

  const currentValue = 433321;
  const investedAmount = 360549;
  const pnl = currentValue - investedAmount;
  const pnlPercent = ((pnl / investedAmount) * 100).toFixed(2);
  const isProfit = pnl >= 0;

  // ===== Animated PNL Counter =====
  const animatedValue = useSharedValue(0);

  useEffect(() => {
    animatedValue.value = withSpring(pnl, { damping: 15 });
  }, []);

  const animatedColor = useAnimatedStyle(() => {
    return {
      color: interpolateColor(
        animatedValue.value,
        [-100000, 0, 100000],
        ["#D32F2F", "#FFFFFF", "#1DB954"]
      ),
    };
  });

  const formatCurrency = (num) =>
    "₹" + Math.abs(Math.round(num)).toLocaleString("en-IN");

  // ===== Pull To Refresh =====
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      animatedValue.value = withSpring(
        Math.random() > 0.5 ? pnl + 5000 : pnl - 5000
      );
      setRefreshing(false);
    }, 1500);
  };

  // ===== Scroll Animation Value =====
  const scrollX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollX.value = event.contentOffset.x;
  });

  const stockData = [
    {
      id: "1",
      name: "Apple",
      price: 172.32,
      change: 2.45,
      logo: "https://logo.clearbit.com/apple.com",
    },
    {
      id: "2",
      name: "Tesla",
      price: 245.91,
      change: -1.12,
      logo: "https://logo.clearbit.com/tesla.com",
    },
    {
      id: "3",
      name: "Google",
      price: 132.88,
      change: 4.25,
      logo: "https://logo.clearbit.com/google.com",
    },
  ];

  const chartPath =
    "M0 80 Q 40 60 80 70 T 160 50 T 240 60 T 320 30 T 400 50";

  return (
    <LinearGradient
      colors={["#F9FAFB", "#F3F4F6"]}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{ marginTop: 20 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={{ paddingHorizontal:20 }}>
          {/* ===== Glass Card ===== */}
          <BlurView intensity={60} tint="dark" style={styles.glassCard}>
            <Text style={styles.label}>Current Value</Text>

            <Text style={styles.currentValue}>
              ₹{currentValue.toLocaleString("en-IN")}
            </Text>

            <View style={styles.divider} />

            <View style={styles.row}>
              <View>
                <Text style={styles.subLabel}>Invested Amount</Text>
                <Text style={styles.invested}>
                  ₹{investedAmount.toLocaleString("en-IN")}
                </Text>
              </View>

              <View style={{ alignItems: "flex-end" }}>
                <Text style={styles.subLabel}>Total P&amp;L</Text>

                <Animated.Text
                  style={[styles.profit, animatedColor]}
                >
                  {isProfit ? "+" : "-"}
                  {formatCurrency(animatedValue.value)} (
                  {isProfit ? "+" : "-"}
                  {Math.abs(pnlPercent)}%)
                </Animated.Text>
              </View>
            </View>
          </BlurView>

          {/* ===== Chart ===== */}
          <View style={{ marginTop: 30 }}>
            <Svg height="120" width={width - 40}>
              <Path
                d={chartPath}
                stroke={isProfit ? "#1DB954" : "#D32F2F"}
                strokeWidth="3"
                fill="none"
              />
            </Svg>
          </View>
        </View>

        {/* ===== Horizontal Stocks ===== */}
        <Animated.FlatList
          data={stockData}
          horizontal
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <StockCard
              item={item}
              index={index}
              scrollX={scrollX}
            />
          )}
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH + 16}
          decelerationRate="fast"
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          contentContainerStyle={{ marginVertical: 30, paddingHorizontal: 20, gap:18 }}
        />
      </ScrollView>
    </LinearGradient>
  );
}

//////////////////////////////////////////////////////////////////////////////////////
// ✅ Styles
//////////////////////////////////////////////////////////////////////////////////////

const styles = StyleSheet.create({
  glassCard: {
    borderRadius: 24,
    padding: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },

  label: {
    ...TYPOGRAPHY.body,
    color: "#DDD",
    textAlign: "center",
  },

  currentValue: {
    ...TYPOGRAPHY.h2,
    color: "#FFF",
    textAlign: "center",
    marginTop: 6,
  },

  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.2)",
    marginVertical: 16,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  subLabel: {
    ...TYPOGRAPHY.bodySmall,
    color: "#CCC",
  },

  invested: {
    ...TYPOGRAPHY.h5,
    color: "#FFF",
    marginTop: 4,
  },

  profit: {
    ...TYPOGRAPHY.h5,
    marginTop: 4,
  },

  stockCard: {
    width: CARD_WIDTH,
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 12 },
    elevation: 4,
    position: "relative",
  },

  pill: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 14,
    backgroundColor: "#FFFFFF",
  },

  pillText: {
    fontSize: 12,
    fontWeight: "500",
  },

  stockPrice: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
  },

  stockName: {
    fontSize: 15,
    color: "#6B7280",
    marginTop: 6,
    fontWeight: "500",
  },

  // Outer soft circle (same as screen bg)
  iconOuter: {
    position: "absolute",
    top: -18,
    right: -18,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },

  // Inner white floating circle
  iconWrapper: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 5,
  },

  logo: {
    width: 28,
    height: 28,
    resizeMode: "contain",
  },
});