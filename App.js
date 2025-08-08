import { Provider } from "react-redux";
import Toast from "react-native-toast-message";

import { store } from "./store/store";
import MainNavigator from "./navigation/MainNavigator";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <MainNavigator />
        <Toast />
      </Provider>
    </QueryClientProvider>
  );
}
