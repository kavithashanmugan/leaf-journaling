import React, { useEffect, useState, useContext, useMemo } from "react";
import {
  View,
  Text,
  Button,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import Purchases from "react-native-purchases";
import { SubscriptionContext } from "../contexts/SubscriptionContext";

export default function PaywallScreen({ navigation }) {
  const [currentOffering, setCurrentOffering] = useState(null);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);


  const { isPremium, refreshSubscriptionStatus } = useContext(SubscriptionContext);

  // ✅ IMPORTANT: set this to your RevenueCat entitlement IDENTIFIER (usually "premium" or "pro")
  const ENTITLEMENT_ID = "Leaf and Pixel Pro";

  const packages = useMemo(
    () => currentOffering?.availablePackages ?? [],
    [currentOffering]
  );

  useEffect(() => {
    let mounted = true;

    async function loadOfferings() {
      try {
        const offerings = await Purchases.getOfferings();

        if (!mounted) return;

        if (
          offerings?.current &&
          offerings.current.availablePackages &&
          offerings.current.availablePackages.length > 0
        ) {
          setCurrentOffering(offerings.current);
        } else {
          setCurrentOffering(null);
        }
      } catch (e) {
        console.warn("Error fetching offerings:", e);
        if (mounted) setCurrentOffering(null);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadOfferings();
    return () => {
      mounted = false;
    };
  }, []);

  const hasEntitlement = (customerInfo) =>
    !!customerInfo?.entitlements?.active?.[ENTITLEMENT_ID];

  async function purchasePackage(pkg) {
    try {
      setPurchasing(true);

      const { customerInfo } = await Purchases.purchasePackage(pkg);

      const unlocked = hasEntitlement(customerInfo);

      // If your context has a refresh function, call it so the whole app updates instantly.
      if (typeof refreshSubscriptionStatus === "function") {
        await refreshSubscriptionStatus();
      }

      if (unlocked) {
        Alert.alert("Success", "🎉 Welcome to Premium!");
        navigation.goBack();
      } else {
        Alert.alert(
          "Purchase completed",
          "Your purchase went through, but Premium is not active yet. Try Restore Purchases."
        );
      }
    } catch (e) {
      if (!e?.userCancelled) {
        console.warn("Purchase failed:", e);
        Alert.alert("Purchase failed", e?.message ?? "Please try again.");
      }
    } finally {
      setPurchasing(false);
    }
  }

  async function restorePurchases() {
    try {
      setPurchasing(true);

      const customerInfo = await Purchases.restorePurchases();
      const unlocked = hasEntitlement(customerInfo);

      if (typeof refreshSubscriptionStatus === "function") {
        await refreshSubscriptionStatus();
      }

      if (unlocked) {
        Alert.alert("Restored", "Purchases restored!");
        navigation.goBack();
      } else {
        Alert.alert(
          "No active subscription",
          "No active Premium subscription was found for this account."
        );
      }
    } catch (e) {
      console.warn("Restore error:", e);
      Alert.alert("Restore failed", e?.message ?? "Please try again.");
    } finally {
      setPurchasing(false);
    }
  }

  const storeHint =
    Platform.OS === "ios"
      ? "Make sure you're using a Sandbox Apple ID on a real device (or a proper dev build)."
      : "Make sure your Play Store test account + license tester is set up (and you're using a dev build).";

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
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Unlock Premium</Text>
      <Text style={styles.subtitle}>Get access to:</Text>

      <View style={styles.benefits}>
        <Text>✅ Unlimited access to all content</Text>
        <Text>✅ Exclusive premium features</Text>
        <Text>✅ Support future updates</Text>
      </View>

      {purchasing && <ActivityIndicator style={{ marginVertical: 12 }} />}

      {packages.length === 0 ? (
        <View style={{ marginBottom: 16 }}>
          <Text style={{ textAlign: "center" }}>
            No subscription packages found.
          </Text>
          <Text style={{ textAlign: "center", marginTop: 8, fontSize: 12, opacity: 0.7 }}>
            Tip: In RevenueCat, set an Offering as “Current” and attach products/packages.
          </Text>
          <Text style={{ textAlign: "center", marginTop: 6, fontSize: 12, opacity: 0.7 }}>
            {storeHint}
          </Text>
        </View>
      ) : (
        packages.map((pkg) => (
          <View key={pkg.identifier} style={styles.package}>
            <Button
              disabled={purchasing}
              title={`${pkg.product.title} • ${pkg.product.priceString}`}
              onPress={() => purchasePackage(pkg)}
            />
          </View>
        ))
      )}

      <View style={{ marginTop: 10 }}>
        <Button disabled={purchasing} title="Restore Purchases" onPress={restorePurchases} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#007AFF",
  },
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
