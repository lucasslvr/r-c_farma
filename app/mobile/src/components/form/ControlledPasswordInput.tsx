import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Control, Controller, FieldValues, Path, RegisterOptions } from "react-hook-form";
import { PasswordInput } from "../ui/PasswordInput";
import { typography } from "../../theme/typography";

type ControlledPasswordInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  rules?: RegisterOptions<T>;
  placeholder: string;
};

export function ControlledPasswordInput<T extends FieldValues>({
  control,
  name,
  rules,
  placeholder,
}: ControlledPasswordInputProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <View style={styles.wrapper}>
          <PasswordInput
            placeholder={placeholder}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
          />
          {error && <Text style={styles.errorText}>{error.message}</Text>}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  wrapper: { width: "100%" },
  errorText: {
    ...typography.link,
    color: "#D64545",
    marginTop: 4,
    marginLeft: 8,
  },
});