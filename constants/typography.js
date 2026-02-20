import { Dimensions, PixelRatio, Platform } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

// Base screen width (iPhone 14 / standard reference)
const BASE_WIDTH = 375;

// Scale factor based on screen width
const scale = SCREEN_WIDTH / BASE_WIDTH;

// Clamp scale so fonts don't go crazy
const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const responsiveSize = (size) => {
  const newSize = size * scale;

  return Math.round(
    PixelRatio.roundToNearestPixel(
      clamp(
        Platform.OS === "ios" ? newSize : newSize * 0.95,
        size * 0.85,
        size * 1.25
      )
    )
  );
};

export const TYPOGRAPHY = {
  // ===== HEADINGS =====
  h1: {
    fontSize: responsiveSize(32),
    lineHeight: responsiveSize(40),
    fontWeight: "700",
  },
  h2: {
    fontSize: responsiveSize(28),
    lineHeight: responsiveSize(36),
    fontWeight: "600",
  },
  h3: {
    fontSize: responsiveSize(24),
    lineHeight: responsiveSize(32),
    fontWeight: "600",
  },
  h4: {
    fontSize: responsiveSize(20),
    lineHeight: responsiveSize(28),
    fontWeight: "500",
  },
  h5: {
    fontSize: responsiveSize(18),
    lineHeight: responsiveSize(26),
    fontWeight: "500",
  },

  // ===== BODY =====
  bodyLarge: {
    fontSize: responsiveSize(16),
    lineHeight: responsiveSize(24),
    fontWeight: "400",
  },
  body: {
    fontSize: responsiveSize(14),
    lineHeight: responsiveSize(22),
    fontWeight: "400",
  },
  bodySmall: {
    fontSize: responsiveSize(12),
    lineHeight: responsiveSize(18),
    fontWeight: "400",
  },

  // ===== UI =====
  button: {
    fontSize: responsiveSize(16),
    lineHeight: responsiveSize(20),
    fontWeight: "600",
  },
  label: {
    fontSize: responsiveSize(13),
    lineHeight: responsiveSize(18),
    fontWeight: "500",
  },
  caption: {
    fontSize: responsiveSize(12),
    lineHeight: responsiveSize(16),
    fontWeight: "400",
  },
  overline: {
    fontSize: responsiveSize(10),
    lineHeight: responsiveSize(14),
    fontWeight: "500",
    textTransform: "uppercase",
  },
};
