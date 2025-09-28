// App.js
import * as React from "react";
import { Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "./screens/LoginScreen";
import RecipesScreen from "./screens/RecipesScreen";
import RecipeForm from "./screens/RecipeForm";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#111827" },
          headerTintColor: "#E5E7EB",
          contentStyle: { backgroundColor: "#0F172A" },
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "Login" }}
        />

        <Stack.Screen
          name="Recipes"
          component={RecipesScreen}
          options={({ navigation }) => ({
            title: "Recipes",
            headerBackVisible: false,
            gestureEnabled: false,
            headerRight: () => (
              <Button
                title="Log out"
                onPress={() => navigation.replace("Login")}
              />
            ),
          })}
        />

        <Stack.Screen
          name="RecipeForm"
          component={RecipeForm}
          options={{ title: "Recipe" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
