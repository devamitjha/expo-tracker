import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const AppHeader = ({
  logo,
  onSearchPress,
  onBellPress,
}) => {
  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      <View style={styles.container}>
        {/* LEFT - LOGO */}
        <View style={styles.left}>
          {logo ? (
            <Image source={logo} style={styles.logo} />
          ) : (
            <Text style={styles.logoText}>MyApp</Text>
          )}
        </View>

        {/* RIGHT - ICONS */}
        <View style={styles.right}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={onSearchPress}
          >
            <Ionicons name="search-outline" size={22} color="#111827" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconButton}
            onPress={onBellPress}
          >
            <Ionicons name="notifications-outline" size={22} color="#111827" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#FFFFFF",
  },

  container: {
    height: 60,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    backgroundColor: "#FFFFFF",

    // Soft bottom shadow
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
  },

  logo: {
    width: 36,
    height: 36,
    resizeMode: "contain",
  },

  logoText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },

  right: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconButton: {
    marginLeft: 18,
  },
});