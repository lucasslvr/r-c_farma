import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { FontAwesome, AntDesign } from "@expo/vector-icons";

type Provider = "facebook" | "google";

type SocialLoginButtonProps = {
  provider: Provider;
  onPress: () => void;
};

const PROVIDER_CONFIG: Record<Provider, { label: string; bg: string }> = {
  facebook: { label: "Facebook", bg: "#FFFFFF" },
  google: { label: "Google", bg: "#FFFFFF" },
};

export function SocialLoginButton({ provider, onPress }: SocialLoginButtonProps) {
  const config = PROVIDER_CONFIG[provider];

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.circle,
        { backgroundColor: config.bg },
        pressed && styles.pressed,
      ]}
      accessibilityRole="button"
      accessibilityLabel={`Entrar com ${config.label}`}
    >
      {provider === "facebook" ? (
        <FontAwesome name="facebook" size={24} color="#1877F2" />
      ) : (
        <AntDesign name="google" size={22} color="#EA4335" />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  circle: {
    width: 52,
    height: 52,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  pressed: {
    opacity: 0.8,
  },
});
