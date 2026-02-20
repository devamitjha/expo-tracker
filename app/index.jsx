import { Redirect } from "expo-router";
import { useSelector } from "react-redux";

export default function Index() {
  const user = useSelector((state) => state.user.user);

  return user ? (
    <Redirect href="/(tabs)" />
  ) : (
    <Redirect href="/(auth)/login" />
  );
}