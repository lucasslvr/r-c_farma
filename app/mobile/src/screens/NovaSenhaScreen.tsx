import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useForm } from "react-hook-form";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParamList } from "../navigation/AppNavigator";
import { colors } from "../theme/colors";
import { typography } from "../theme/typography";
import { ControlledPasswordInput } from "../components/form/ControlledPasswordInput";
import { PrimaryButton } from "../components/ui/PrimaryButton";

type FormData = { novaSenha: string; confirmarNovaSenha: string };
type NavigationProp = NativeStackNavigationProp<RootStackParamList, "NovaSenha">;
type RouteProps = RouteProp<RootStackParamList, "NovaSenha">;

export function NovaSenhaScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProps>();
  const { control, handleSubmit, watch } = useForm<FormData>({
    defaultValues: { novaSenha: "", confirmarNovaSenha: "" },
  });

  function onSubmit(data: FormData) {
    console.log("Nova senha definida para:", route.params.email, data.novaSenha);
    navigation.navigate("Login");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nova senha</Text>
      <View style={styles.form}>
        <ControlledPasswordInput
          control={control}
          name="novaSenha"
          placeholder="Nova senha"
          rules={{ required: "Senha é obrigatória", minLength: { value: 6, message: "Mínimo de 6 caracteres" } }}
        />
        <ControlledPasswordInput
          control={control}
          name="confirmarNovaSenha"
          placeholder="Confirmar nova senha"
          rules={{
            required: "Confirme sua senha",
            validate: (value) => value === watch("novaSenha") || "As senhas não coincidem",
          }}
        />
        <PrimaryButton label="Salvar" onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, paddingHorizontal: 28, paddingTop: 80, alignItems: "center" },
  title: { ...typography.title, color: colors.primary, marginBottom: 24, textAlign: "center" },
  form: { width: "100%", gap: 14 },
});