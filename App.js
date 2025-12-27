import { useEffect } from "react";
import { Provider } from "react-redux";
import Toast from "react-native-toast-message";
import Purchases from "react-native-purchases";
import { store } from "./store/store";
import MainNavigator from "./navigation/MainNavigator";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SubscriptionProvider } from "./contexts/SubscriptionContext";

export default function App() {
  const queryClient = new QueryClient();

  useEffect(() => {
    Purchases.configure({ apiKey: "appl_HNJcBiJHdDhNgQbYIscztdPntYy" });
  });

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
