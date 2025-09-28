// screens/LoginScreen.js
import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue 👋</Text>
      <Button title="Entrer" onPress={() => navigation.replace("Recipes")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", gap: 16, padding: 24 },
  title: { fontSize: 22, fontWeight: "700", color: "#E5E7EB" },
});
