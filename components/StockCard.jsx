import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const StockCard = ({ item, CARD_WIDTH }) => {
  const isPositive = item.change >= 0;

  return (
    <View style={[styles.stockCard, { width: CARD_WIDTH }]}>
      <View style={{ flex: 1 }}>
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

        <Text style={styles.stockPrice}>
          ${item.lastPrice.toLocaleString()}
        </Text>

        <Text style={styles.stockName}>{item.symbol}</Text>
      </View>

      <View style={styles.iconOuter}>
        <View style={styles.iconWrapper}>
          <Image source={{ uri: item.chartTodayPath }} style={styles.logo} />
        </View>
      </View>
    </View>
  );
};

export default StockCard;

const styles = StyleSheet.create({
  stockCard: {
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