import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

let storage;

if (Platform.OS === "web") {
  storage = {
    getItem: (key) => {
      if (typeof window !== "undefined") {
        return Promise.resolve(localStorage.getItem(key));
      }
      return Promise.resolve(null);
    },
    setItem: (key, value) => {
      if (typeof window !== "undefined") {
        localStorage.setItem(key, value);
      }
      return Promise.resolve();
    },
    removeItem: (key) => {
      if (typeof window !== "undefined") {
        localStorage.removeItem(key);
      }
      return Promise.resolve();
    },
  };
} else {
  storage = AsyncStorage;
}

export default storage;