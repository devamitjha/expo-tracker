import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
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
} from "react-native-reanimated";
import { TYPOGRAPHY } from "@/constants/typography";
import AppHeader from "@/components/AppHeader";
import StockCard from "@/components/StockCard";
import StockData from "@/constants/data.json"

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.5;


  const SectionHeader = ({ title }) => (
    <View style={styles.titleContainer}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

export default function Index() {
  const topGainers = StockData.data.filter(s => s.change > 0);
  const topLosers = StockData.data.filter(s => s.change < 0);

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

 

  return (
    <LinearGradient
      colors={["#F9FAFB", "#F3F4F6"]}
      style={{ flex: 1 }}
    >
      <AppHeader
        onSearchPress={() => console.log("Search")}
        onBellPress={() => console.log("Bell")}
      />
      <Animated.FlatList
        data={StockData.data}
        keyExtractor={(item) => item.symbol}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
        
        ListHeaderComponent={
          <>
            {/* SUMMARY */}
            <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
              <BlurView intensity={90} tint="dark" style={styles.glassCard}>
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
                    <Animated.Text style={[styles.profit, animatedColor]}>
                      {isProfit ? "+" : "-"}
                      {formatCurrency(animatedValue.value)} (
                      {isProfit ? "+" : "-"}
                      {Math.abs(pnlPercent)}%)
                    </Animated.Text>
                  </View>
                </View>
              </BlurView>
            </View>

            {/* TOP GAINER */}
            <View style={{marginTop:30}}>
              <SectionHeader title="Top Gainer" />
              <FlatList
                data={topGainers}
                horizontal
                keyExtractor={(item) => item.symbol}
                renderItem={({ item }) => (
                  <StockCard item={item} CARD_WIDTH={CARD_WIDTH} />
                )}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{marginBottom: 20, paddingHorizontal: 20, gap: 18 }}
              />
            </View>

            {/* TOP LOSER */}
            <View style={{marginTop:20}}>
              <SectionHeader title="Top Loser" />
              <FlatList
                data={topLosers}
                horizontal
                keyExtractor={(item) => item.symbol}
                renderItem={({ item }) => (
                  <StockCard item={item} CARD_WIDTH={CARD_WIDTH} />
                )}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ marginBottom:20, paddingHorizontal: 20, gap: 18 }}
              />
            </View>

            <View style={{marginTop:20}}>
              <SectionHeader title="All Stocks" />
            </View>
          </>
        }

        renderItem={({ item }) => (
          <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
            <StockCard item={item} CARD_WIDTH={width - 40} />
          </View>
        )}
        ListFooterComponent={
            <View style={{marginTop:20}}>
              <SectionHeader title="Test Component" />
            </View>
          }
        />
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
  titleContainer:{
    paddingHorizontal:20,
    marginBottom:20
  },
  title:{
    ...TYPOGRAPHY.h5,
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