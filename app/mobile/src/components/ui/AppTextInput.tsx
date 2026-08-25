import React from "react";
import { TextInput, StyleSheet, TextInputProps } from "react-native";
import { colors } from "../../theme/colors";
import { typography } from "../../theme/typography";

type AppTextInputProps = TextInputProps & {
  // espaço reservado pra props futuras (ex: mensagem de erro) sem quebrar
  // quem já está usando o componente
};

/**
 * Chamado AppTextInput (não só TextInput) pra não colidir com o componente
 * nativo do React Native e ficar claro que é a nossa versão estilizada.
 */
export function AppTextInput(props: AppTextInputProps) {
  return (
    <TextInput
      placeholderTextColor={colors.placeholder}
      style={styles.input}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.inputBackground,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontSize: typography.body.fontSize,
    color: colors.textPrimary,
  },
});
