import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../redux/store";
import { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      setReady(true);
      await SplashScreen.hideAsync();
    };

    prepare();
  }, []);

  if (!ready) return null;

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Stack screenOptions={{ headerShown: false, animation: "slide_from_right", }} />
      </PersistGate>
    </Provider>
  );
}