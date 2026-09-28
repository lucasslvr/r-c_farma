import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParamList } from "../navigation/AppNavigator";
import { colors } from "../theme/colors";
import { typography } from "../theme/typography";
import { AppTextInput } from "../components/ui/AppTextInput";
import { PrimaryButton } from "../components/ui/PrimaryButton";

type RouteProps = RouteProp<RootStackParamList, "ConfirmarCodigo">;
type NavigationProp = NativeStackNavigationProp<RootStackParamList, "ConfirmarCodigo">;

export function ConfirmarCodigoScreen() {
  const route = useRoute<RouteProps>();
  const navigation = useNavigation<NavigationProp>();
  const { email, codigoEsperado } = route.params;

  const [codigoDigitado, setCodigoDigitado] = useState("");
  const [erro, setErro] = useState<string | null>(null);

  function handleConfirmar() {
    if (codigoDigitado === codigoEsperado) {
      setErro(null);
      if (route.params.origem === "cadastro") {
        console.log("Código confirmado! Conta criada com sucesso.");
        navigation.navigate("Main");
      } else {
        navigation.navigate("NovaSenha", { email });
      }
    } else {
      setErro("Código incorreto. Confira e tente novamente.");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirme seu e-mail</Text>
      <Text style={styles.subtitle}>
        Enviamos um código de 6 dígitos para {email}
      </Text>

      <AppTextInput
        placeholder="000000"
        value={codigoDigitado}
        onChangeText={setCodigoDigitado}
        keyboardType="number-pad"
        maxLength={6}
        style={styles.codeInput}
      />

      {erro && <Text style={styles.errorText}>{erro}</Text>}

      <PrimaryButton label="Confirmar" onPress={handleConfirmar} />
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
  title: {
    ...typography.title,
    color: colors.primary,
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    ...typography.body,
    color: colors.textMuted,
    textAlign: "center",
    marginBottom: 32,
  },
  codeInput: {
    textAlign: "center",
    letterSpacing: 8,
    fontSize: 20,
    marginBottom: 12,
    width: "100%",
  },
  errorText: {
    ...typography.link,
    color: "#D64545",
    marginBottom: 16,
  },
});