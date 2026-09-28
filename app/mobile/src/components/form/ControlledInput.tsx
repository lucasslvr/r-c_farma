import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Control, Controller, FieldValues, Path, RegisterOptions } from "react-hook-form";
import { AppTextInput } from "../ui/AppTextInput";
import { colors } from "../../theme/colors";
import { typography } from "../../theme/typography";

type ControlledInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  rules?: RegisterOptions<T>;
  placeholder: string;
  keyboardType?: "default" | "email-address" | "phone-pad" | "number-pad";
  autoCapitalize?: "none" | "words" | "sentences";
};

export function ControlledInput<T extends FieldValues>({
  control,
  name,
  rules,
  placeholder,
  keyboardType = "default",
  autoCapitalize = "sentences",
}: ControlledInputProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <View style={styles.wrapper}>
          <AppTextInput
            placeholder={placeholder}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
          />
          {error && <Text style={styles.errorText}>{error.message}</Text>}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
  },
  errorText: {
    ...typography.link,
    color: "#D64545",
    marginTop: 4,
    marginLeft: 8,
  },
});