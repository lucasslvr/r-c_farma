import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";

import { colors } from "../theme/colors";
import { typography } from "../theme/typography";
import { AppTextInput } from "../components/ui/AppTextInput";
import { PasswordInput } from "../components/ui/PasswordInput";
import { PrimaryButton } from "../components/ui/PrimaryButton";
import { TextLink } from "../components/ui/TextLink";
import { SocialLoginButton } from "../components/auth/SocialLoginButton";


export function LoginScreen() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function handleAcessar() {
    console.log("Acessar pressionado", { email, senha });
  }

  function handleCriarConta() {
    console.log("Criar conta pressionado");
  }

  function handleEsqueciSenha() {
    console.log("Esqueci minha senha pressionado");
  }

  function handleSocialLogin(provider: "facebook" | "google") {
    console.log("Login social pressionado:", provider);
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Glow verde no topo — aproximação do radial do Figma usando gradiente linear */}
      <LinearGradient
        colors={[colors.primary, "rgba(52,199,89,0)"]}
        style={styles.topGlow}
        pointerEvents="none"
      />
      {/* Glow verde no rodapé */}
      <LinearGradient
        colors={["rgba(52,199,89,0)", colors.primary]}
        style={styles.bottomGlow}
        pointerEvents="none"
      />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.brandTitle}>FARMÁCIA</Text>

          <Image
            source={require("../../assets/logo.png")}
            style={styles.logo}
            resizeMode="contain"
            accessibilityLabel="Logo R&C Farma"
          />

          <Text style={styles.welcome}>Seja bem vindo!</Text>
          <Text style={styles.loginPrompt}>Efetue seu login:</Text>

          <View style={styles.socialRow}>
            <SocialLoginButton
              provider="facebook"
              onPress={() => handleSocialLogin("facebook")}
            />
            <SocialLoginButton
              provider="google"
              onPress={() => handleSocialLogin("google")}
            />
          </View>

          <View style={styles.form}>
            <AppTextInput
              placeholder="E-mail"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              accessibilityLabel="Campo de e-mail"
            />
            <PasswordInput
              placeholder="Senha"
              value={senha}
              onChangeText={setSenha}
              accessibilityLabel="Campo de senha"
            />
             <PrimaryButton label="Acessar" onPress={handleAcessar} />
          </View>

          <TextLink
            label="Criar conta"
            onPress={handleCriarConta}
            color={colors.textPrimary}
            style={styles.criarConta}
          />

          <View style={styles.forgotRow}>
            <Text style={styles.forgotText}>Esqueceu sua senha? </Text>
            <TextLink
              label="Clique aqui"
              onPress={handleEsqueciSenha}
              color={colors.linkAccent}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const GLOW_HEIGHT = 190;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  topGlow: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: GLOW_HEIGHT,
  },
  bottomGlow: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 0,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    paddingHorizontal: 28,
    paddingTop: 48,
    paddingBottom: 32,
  },
  brandTitle: {
    ...typography.title,
    color: colors.textOnPrimary,
    letterSpacing: 1,
    marginBottom: 12,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  welcome: {
    ...typography.title,
    color: colors.primary,
    marginBottom: 8,
  },
  loginPrompt: {
    ...typography.subtitle,
    color: colors.textPrimary,
    marginBottom: 20,
  },
  socialRow: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 28,
  },
  form: {
    width: "100%",
    gap: 14,
    marginBottom: 24,
  },
  criarConta: {
    marginTop: 16,
    marginBottom: 24,
  },
  forgotRow: {
    flexDirection: "row",
    marginTop: "auto",
  },
  forgotText: {
    ...typography.link,
    color: colors.textMuted,
  },
});
