import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParamList } from "../navigation/AppNavigator";
import { colors } from "../theme/colors";
import { typography } from "../theme/typography";
import { ControlledInput } from "../components/form/ControlledInput";
import { PrimaryButton } from "../components/ui/PrimaryButton";

type FormData = { email: string };
type NavigationProp = NativeStackNavigationProp<RootStackParamList, "EsqueciSenha">;

export function EsqueciSenhaScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { control, handleSubmit } = useForm<FormData>({ defaultValues: { email: "" } });

  function onSubmit(data: FormData) {
    const codigoGerado = Math.floor(100000 + Math.random() * 900000).toString();
    console.log("Código de reset (mock):", codigoGerado);

    navigation.navigate("ConfirmarCodigo", {
      email: data.email,
      codigoEsperado: codigoGerado,
      origem: "resetSenha",
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Esqueceu sua senha?</Text>
      <Text style={styles.subtitle}>
        Digite seu e-mail cadastrado pra receber um código de confirmação.
      </Text>

      <View style={styles.form}>
        <ControlledInput
          control={control}
          name="email"
          placeholder="E-mail"
          keyboardType="email-address"
          autoCapitalize="none"
          rules={{
            required: "E-mail é obrigatório",
            pattern: { value: /\S+@\S+\.\S+/, message: "E-mail inválido" },
          }}
        />
        <PrimaryButton label="Enviar código" onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 28,
    paddingTop: 80,
    alignItems: "center",
  },
  title: { ...typography.title, color: colors.primary, marginBottom: 8, textAlign: "center" },
  subtitle: { ...typography.body, color: colors.textMuted, textAlign: "center", marginBottom: 32 },
  form: { width: "100%", gap: 14 },
});