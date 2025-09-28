// screens/RecipesScreen.js
import React, { useMemo, useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, ScrollView } from "react-native";

export default function RecipesScreen({ navigation, route }) {
  const [recipes, setRecipes] = useState([
    {
      category: 1,
      name: "Pizza",
      durationHours: 0,
      durationMinutes: 30,
      description: "Cheese & Tomato",
    },
    {
      category: 2,
      name: "Pasta",
      durationHours: 0,
      durationMinutes: 20,
      description: "Carbonara",
    },
    {
      category: 3,
      name: "Burger",
      durationHours: 0,
      durationMinutes: 15,
      description: "Classic",
    },
  ]);

  // Écouter une nouvelle recette venant de RecipeForm
  useEffect(() => {
    if (route.params?.newRecipe) {
      setRecipes((prev) => [...prev, route.params.newRecipe]);
      navigation.setParams({ newRecipe: undefined }); // éviter doublons
    }
  }, [route.params?.newRecipe]);

  // Tri par nom
  const sorted = useMemo(() => {
    return [...recipes].sort((a, b) => a.name.localeCompare(b.name));
  }, [recipes]);

  // Ouvrir une recette aléatoire
  const openRandomRecipe = () => {
    if (recipes.length === 0) return;
    const idx = Math.floor(Math.random() * recipes.length);
    navigation.navigate("RecipeForm", { mode: "view", recipe: recipes[idx] });
  };

  // Aller en mode ajout
  const openAdd = () => {
    navigation.navigate("RecipeForm", { mode: "add" });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Liste des recettes</Text>

      <View style={styles.row}>
        <Button title="View (random)" onPress={openRandomRecipe} />
        <Button title="Add" onPress={openAdd} />
      </View>

      <Text style={styles.jsonTitle}>JSON (trié par nom) :</Text>
      <Text style={styles.jsonBlock}>{JSON.stringify(sorted, null, 2)}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 12, color: "rgba(255, 255, 255, 1)" },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 12,
  },
  jsonTitle: { marginTop: 12, fontWeight: "600", color: "#dbdadaff" },
  jsonBlock: { fontFamily: "monospace", color: "#f0efefff", marginTop: 6 },
});
