import React from "react";
import { Text, Pressable, StyleSheet, StyleProp, TextStyle } from "react-native";
import { colors } from "../../theme/colors";
import { typography } from "../../theme/typography";

type TextLinkProps = {
  label: string;
  onPress: () => void;
  color?: string;
  style?: StyleProp<TextStyle>;
};

export function TextLink({ label, onPress, color, style }: TextLinkProps) {
  return (
    <Pressable onPress={onPress} hitSlop={8} accessibilityRole="link">
      <Text style={[styles.text, { color: color ?? colors.textOnPrimary }, style]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  text: {
    ...typography.link,
    textAlign: "center",
  },
});
