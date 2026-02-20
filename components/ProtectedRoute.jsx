import { Redirect } from "expo-router";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ children }) {
  const user = useSelector((state) => state.user.user);

  if (!user) {
    return <Redirect href="/(auth)/login" />;
  }

  return children;
}