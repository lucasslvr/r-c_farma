import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParamList } from "../navigation/AppNavigator";
import { colors } from "../theme/colors";
import { typography } from "../theme/typography";
import { ControlledInput } from "../components/form/ControlledInput";
import { ControlledPasswordInput } from "../components/form/ControlledPasswordInput";
import { PrimaryButton } from "../components/ui/PrimaryButton";

type FormData = {
  nome: string;
  sobrenome: string;
  email: string;
  senha: string;
  confirmarSenha: string;
  cep: string;
  rua: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  celular: string;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "CriarConta">;

export function CriarContaScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { control, handleSubmit, watch, setValue } = useForm<FormData>({
    defaultValues: {
      nome: "",
      sobrenome: "",
      email: "",
      senha: "",
      confirmarSenha: "",
      cep: "",
      rua: "",
      numero: "",
      complemento: "",
      bairro: "",
      cidade: "",
      estado: "",
      celular: "",
    },
  });

  const [buscandoCep, setBuscandoCep] = useState(false);
  const [erroCep, setErroCep] = useState<string | null>(null);
  const cepDigitado = watch("cep");

  useEffect(() => {
    const cepLimpo = cepDigitado?.replace(/\D/g, "");
    if (cepLimpo?.length === 8) {
      buscarEnderecoPorCep(cepLimpo);
    }
  }, [cepDigitado]);

  async function buscarEnderecoPorCep(cep: string) {
    setBuscandoCep(true);
    setErroCep(null);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (data.erro) {
        setErroCep("CEP não encontrado");
        return;
      }
      setValue("rua", data.logradouro);
      setValue("bairro", data.bairro);
      setValue("cidade", data.localidade);
      setValue("estado", data.uf);
    } catch {
      setErroCep("Erro ao buscar CEP. Confira sua conexão.");
    } finally {
      setBuscandoCep(false);
    }
  }

  function onSubmit(data: FormData) {
    // TODO: quando o backend existir, essa função vira uma chamada de API
    // (POST /auth/register) que devolve confirmação de que o código foi enviado.
    const codigoGerado = Math.floor(100000 + Math.random() * 900000).toString();
    console.log("Código de confirmação (mock):", codigoGerado);

    navigation.navigate("ConfirmarCodigo", {
      email: data.email,
      codigoEsperado: codigoGerado,
      origem: "cadastro",
    });
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Criar conta</Text>

        <View style={styles.form}>
          <ControlledInput
            control={control}
            name="nome"
            placeholder="Nome"
            autoCapitalize="words"
            rules={{ required: "Nome é obrigatório" }}
          />
          <ControlledInput
            control={control}
            name="sobrenome"
            placeholder="Sobrenome"
            autoCapitalize="words"
            rules={{ required: "Sobrenome é obrigatório" }}
          />
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
          <ControlledPasswordInput
            control={control}
            name="senha"
            placeholder="Senha"
            rules={{
              required: "Senha é obrigatória",
              minLength: { value: 6, message: "Mínimo de 6 caracteres" },
            }}
          />
          <ControlledPasswordInput
            control={control}
            name="confirmarSenha"
            placeholder="Confirmar senha"
            rules={{
              required: "Confirme sua senha",
              validate: (value) => value === watch("senha") || "As senhas não coincidem",
            }}
          />

          <ControlledInput
            control={control}
            name="cep"
            placeholder="CEP"
            keyboardType="number-pad"
            rules={{ required: "CEP é obrigatório" }}
          />
          {buscandoCep && <Text style={styles.infoText}>Buscando endereço...</Text>}
          {erroCep && <Text style={styles.errorText}>{erroCep}</Text>}

          <ControlledInput
            control={control}
            name="rua"
            placeholder="Rua"
            autoCapitalize="words"
            rules={{ required: "Rua é obrigatória" }}
          />
          <ControlledInput
            control={control}
            name="numero"
            placeholder="Número"
            keyboardType="number-pad"
            rules={{ required: "Número é obrigatório" }}
          />
          <ControlledInput
            control={control}
            name="complemento"
            placeholder="Complemento (opcional)"
            autoCapitalize="words"
          />
          <ControlledInput
            control={control}
            name="bairro"
            placeholder="Bairro"
            autoCapitalize="words"
            rules={{ required: "Bairro é obrigatório" }}
          />
          <ControlledInput
            control={control}
            name="cidade"
            placeholder="Cidade"
            autoCapitalize="words"
            rules={{ required: "Cidade é obrigatória" }}
          />
          <ControlledInput
            control={control}
            name="estado"
            placeholder="Estado"
            autoCapitalize="words"
            rules={{ required: "Estado é obrigatório" }}
          />

          <ControlledInput
            control={control}
            name="celular"
            placeholder="Número de celular"
            keyboardType="phone-pad"
            rules={{ required: "Celular é obrigatório" }}
          />

          <PrimaryButton label="Continuar" onPress={handleSubmit(onSubmit)} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: {
    flexGrow: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 28,
    paddingTop: 48,
    paddingBottom: 32,
    alignItems: "center",
  },
  title: {
    ...typography.title,
    color: colors.primary,
    marginBottom: 24,
  },
  form: {
    width: "100%",
    gap: 14,
  },
  infoText: {
    ...typography.link,
    color: colors.textMuted,
    marginTop: -8,
    marginBottom: 4,
  },
  errorText: {
    ...typography.link,
    color: "#D64545",
    marginTop: -8,
    marginBottom: 4,
  },
});