// SubscriptionContext.js
import React, { createContext, useState, useEffect } from "react";
import Purchases from "react-native-purchases";

export const SubscriptionContext = createContext();

export const SubscriptionProvider = ({ children }) => {
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    async function fetchCustomerInfo() {
      try {
        const customerInfo = await Purchases.getCustomerInfo();
        setIsPremium(!!customerInfo.entitlements.active.premium);
      } catch (e) {
        console.warn("Error fetching customer info:", e);
      }
    }
    fetchCustomerInfo();

    // Optional: listener for subscription updates
    const listener = Purchases.addCustomerInfoUpdateListener((info) => {
      setIsPremium(!!info.entitlements.active.premium);
    });

    return () => {
      Purchases.removeCustomerInfoUpdateListener(listener);
    };
  }, []);

  return (
    <SubscriptionContext.Provider value={{ isPremium, setIsPremium }}>
      {children}
    </SubscriptionContext.Provider>
  );
};
