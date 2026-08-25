import React, { useState } from "react";
import { View, TextInput, Pressable, StyleSheet, TextInputProps } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../theme/colors";
import { typography } from "../../theme/typography";

type PasswordInputProps = Omit<TextInputProps, "secureTextEntry">;

export function PasswordInput(props: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.wrapper}>
      <TextInput
        placeholderTextColor={colors.placeholder}
        secureTextEntry={!visible}
        style={styles.input}
        {...props}
      />
      <Pressable
        onPress={() => setVisible((v) => !v)}
        style={styles.toggle}
        accessibilityRole="button"
        accessibilityLabel={visible ? "Ocultar senha" : "Mostrar senha"}
        hitSlop={8}
      >
        <Ionicons
          name={visible ? "eye-off-outline" : "eye-outline"}
          size={20}
          color={colors.textMuted}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.inputBackground,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: 24,
    paddingHorizontal: 20,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: typography.body.fontSize,
    fontFamily: typography.body.fontFamily,
    color: colors.textPrimary,
  },
  toggle: {
    paddingLeft: 8,
  },
});