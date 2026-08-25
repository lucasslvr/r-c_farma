import React from "react";
import {
  Pressable,
  Text,
  StyleSheet,
  ActivityIndicator,
  GestureResponderEvent,
} from "react-native";
import { colors } from "../../theme/colors";
import { typography } from "../../theme/typography";

type PrimaryButtonProps = {
  label: string;
  onPress: (event: GestureResponderEvent) => void;
  loading?: boolean;
  disabled?: boolean;
};

/**
 * Botão principal do app (ex: "Acessar").
 * Mantido genérico em ui/ porque outras telas (checkout, cadastro etc.)
 * também vão precisar de um CTA no mesmo estilo.
 */
export function PrimaryButton({
  label,
  onPress,
  loading = false,
  disabled = false,
}: PrimaryButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.button,
        (disabled || loading) && styles.buttonDisabled,
        pressed && styles.buttonPressed,
      ]}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      {loading ? (
        <ActivityIndicator color={colors.textOnPrimary} />
      ) : (
        <Text style={styles.label}>{label}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 28,
    paddingVertical: 14,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonPressed: {
    opacity: 0.85,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  label: {
    color: colors.textOnPrimary,
    ...typography.button,
  },
});
