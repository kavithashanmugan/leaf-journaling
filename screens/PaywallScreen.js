// PaywallScreen.js
import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  Button,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import Purchases from "react-native-purchases";
import { SubscriptionContext } from "../contexts/SubscriptionContext";

export default function PaywallScreen({ navigation }) {
  const [offerings, setOfferings] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isPremium } = useContext(SubscriptionContext);

  useEffect(() => {
    async function loadOfferings() {
      try {
        const offerings = await Purchases.getOfferings();
        if (offerings.current) {
          setOfferings(offerings.current);
        }
      } catch (e) {
        console.warn("Error fetching offerings:", e);
      } finally {
        setLoading(false);
      }
    }
    loadOfferings();
  }, []);

  console.log(offerings);

  async function purchasePackage(pkg) {
    try {
      const { customerInfo } = await Purchases.purchasePackage(pkg);
      if (customerInfo.entitlements.active.premium) {
        alert("🎉 Welcome to Premium!");
        navigation.goBack();
      }
    } catch (e) {
      if (!e.userCancelled) {
        console.warn("Purchase failed:", e);
      }
    }
  }

  async function restorePurchases() {
    try {
      const customerInfo = await Purchases.restorePurchases();
      if (customerInfo.entitlements.active.premium) {
        alert("✅ Purchases restored!");
        navigation.goBack();
      } else {
        alert("No active subscriptions found.");
      }
    } catch (e) {
      console.warn("Restore error:", e);
    }
  }

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} />;
  }

  if (isPremium) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>You’re already Premium 🎉</Text>
        <Button title="Go back" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Unlock Premium</Text>
      <Text style={styles.subtitle}>Get access to:</Text>
      <View style={styles.benefits}>
        <Text>✅ Unlimited access to all content</Text>
        <Text>✅ Exclusive premium features</Text>
        <Text>✅ Support future updates</Text>
      </View>

      {offerings?.availablePackages.map((pkg) => (
        <View key={pkg.identifier} style={styles.package}>
          <Button
            title={`Subscribe ${pkg.product.title} - ${pkg.product.priceString}`}
            onPress={() => purchasePackage(pkg)}
          />
        </View>
      ))}

      <Button title="Restore Purchases" onPress={restorePurchases} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: { fontSize: 18, textAlign: "center", marginBottom: 20 },
  benefits: { marginBottom: 20 },
  package: { marginVertical: 10 },
});
