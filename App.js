// App.js
import { useEffect, useMemo } from "react";
import { Platform } from "react-native";
import { Provider } from "react-redux";
import Toast from "react-native-toast-message";
import Purchases from "react-native-purchases";
import { store } from "./store/store";
import MainNavigator from "./navigation/MainNavigator";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SubscriptionProvider } from "./contexts/SubscriptionContext";

export default function App() {
  const queryClient = useMemo(() => new QueryClient(), []);
  const REVENUECAT_API_KEY =
    Platform.OS === "ios"
      ? process.env.EXPO_PUBLIC_REVENUECAT_IOS_KEY
      : process.env.EXPO_PUBLIC_REVENUECAT_ANDROID_KEY;

  useEffect(() => {
    if (!REVENUECAT_API_KEY) {
      console.warn(
        `RevenueCat API key is missing for ${Platform.OS}. Check your .env keys.`
      );
      return;
    }

    Purchases.configure({ apiKey: REVENUECAT_API_KEY });
  }, [REVENUECAT_API_KEY]);

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <SubscriptionProvider>
          <MainNavigator />
        </SubscriptionProvider>
        <Toast />
      </Provider>
    </QueryClientProvider>
  );
}
