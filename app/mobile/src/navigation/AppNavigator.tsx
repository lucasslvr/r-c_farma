import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { LoginScreen } from "../screens/LoginScreen";
import { CriarContaScreen } from "../screens/CriarContaScreen";
import { ConfirmarCodigoScreen } from "../screens/ConfirmarCodigoScreen";

import { EsqueciSenhaScreen } from "../screens/EsqueciSenhaScreen";
import { NovaSenhaScreen } from "../screens/NovaSenhaScreen";
import { MainTabNavigator } from "./MainTabNavigator";

export type RootStackParamList = {
    Login: undefined;
    CriarConta: undefined;
    EsqueciSenha: undefined;
    ConfirmarCodigo: { email: string; codigoEsperado: string; origem: "cadastro" | "resetSenha" };
    NovaSenha: { email: string };
    Main: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="CriarConta" component={CriarContaScreen} />
        <Stack.Screen name="ConfirmarCodigo" component={ConfirmarCodigoScreen} />
        <Stack.Screen name="EsqueciSenha" component={EsqueciSenhaScreen} />
        <Stack.Screen name="NovaSenha" component={NovaSenhaScreen} />
        <Stack.Screen name="Main" component={MainTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}