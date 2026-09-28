import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import { SearchScreen } from "../screens/main/SearchScreen";
import { PedidosScreen } from "../screens/main/PedidosScreen";
import { HomeScreen } from "../screens/main/HomeScreen";
import { QuemSomosScreen } from "../screens/main/QuemSomosScreen";
import { PerfilScreen } from "../screens/main/PerfilScreen";
import { colors } from "../theme/colors";
import { typography } from "../theme/typography";

export type MainTabParamList = {
  Search: undefined;
  Pedidos: undefined;
  Home: undefined;
  QuemSomos: undefined;
  Perfil: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

function TabBarIcon({
  focused,
  label,
  renderIcon,
}: {
  focused: boolean;
  label: string;
  renderIcon: (color: string, size: number) => React.ReactNode;
}) {
  if (focused) {
    return (
      <View style={styles.activeWrapper}>
        <View style={styles.activeCircle}>{renderIcon("#FFFFFF", 22)}</View>
        <Text style={styles.activeLabel} numberOfLines={1}>
          {label}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.inactiveWrapper}>
      {renderIcon(colors.textMuted, 22)}
      <Text style={styles.inactiveLabel} numberOfLines={1}>
        {label}
      </Text>
    </View>
  );
}

export function MainTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarIconStyle: { width: "100%" },
      }}
    >
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              label="Buscar"
              renderIcon={(color, size) => (
                <Ionicons name="search-outline" size={size} color={color} />
              )}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Pedidos"
        component={PedidosScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              label="Pedidos"
              renderIcon={(color, size) => (
                <MaterialCommunityIcons name="moped" size={size} color={color} />
              )}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              label="Home"
              renderIcon={(color, size) => (
                <Ionicons name="home-outline" size={size} color={color} />
              )}
            />
          ),
        }}
      />
      <Tab.Screen
        name="QuemSomos"
        component={QuemSomosScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              label="Quem somos?"
              renderIcon={(color, size) => (
                <Ionicons name="storefront-outline" size={size} color={color} />
              )}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={PerfilScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              label="Perfil"
              renderIcon={(color, size) => (
                <Ionicons name="person-outline" size={size} color={color} />
              )}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: Platform.OS === "ios" ? 24 : 16,
    height: 68,
    borderRadius: 24,
    backgroundColor: colors.background,
    borderTopWidth: 0,
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    paddingTop: 10,
  },
  activeWrapper: { alignItems: "center", justifyContent: "flex-start" },
  activeCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -26,
    shadowColor: colors.primary,
    shadowOpacity: 0.35,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 6,
  },
  activeLabel: {
    ...typography.link,
    fontSize: 11,
    color: colors.primary,
    marginTop: 4,
  },
  inactiveWrapper: { alignItems: "center", justifyContent: "center", gap: 2 },
  inactiveLabel: {
    ...typography.link,
    fontSize: 11,
    color: colors.textMuted,
  },
});