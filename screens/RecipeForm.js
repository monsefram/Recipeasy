// screens/RecipeForm.js
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";

export default function RecipeForm({ route, navigation }) {
  const { mode = "add", recipe } = route.params || {};
  const isView = mode === "view"; // consultation en “édition” (sans sauvegarde)

  // Préremplissage
  const [category, setCategory] = useState(recipe ? String(recipe.category) : "");
  const [name, setName] = useState(recipe?.name ?? "");
  const [hours, setHours] = useState(recipe ? String(recipe.durationHours) : "0");
  const [minutes, setMinutes] = useState(recipe ? String(recipe.durationMinutes) : "0");
  const [description, setDescription] = useState(recipe?.description ?? "");

  const validate = () => {
    const cat = parseInt(category, 10);
    const h = parseInt(hours, 10);
    const m = parseInt(minutes, 10);

    if (Number.isNaN(cat)) return "Catégorie requise (nombre).";
    if (!name || name.trim().length === 0) return "Nom requis.";
    if (Number.isNaN(h) || h < 0 || h > 12) return "Heures entre 0 et 12.";
    if (Number.isNaN(m) || m < 0 || m > 59) return "Minutes entre 0 et 59.";
    if (h === 0 && m === 0) return "Durée totale doit être > 0.";
    return null;
  };

  const onSave = () => {
    const error = validate();
    if (error) {
      Alert.alert("Erreur de validation", error);
      return;
    }

    const newRecipe = {
      category: parseInt(category, 10),
      name: name.trim(),
      durationHours: parseInt(hours, 10),
      durationMinutes: parseInt(minutes, 10),
      description: description?.trim() ?? "",
    };

    // Retourner la nouvelle recette vers la liste
    navigation.navigate("Recipes", { newRecipe });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isView ? "Détail d'une recette" : "Ajouter une recette"}
      </Text>

      <Text style={styles.label}>Catégorie</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={category}
        onChangeText={setCategory}
        placeholder="ex: 1"
        editable={!isView} // ❗ non-éditable en consultation
      />

      <Text style={styles.label}>Nom</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="ex: Pizza"
        editable={!isView}
      />

      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <Text style={styles.label}>Heures (0–12)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={hours}
            onChangeText={setHours}
            placeholder="0"
            editable={!isView}
          />
        </View>
        <View style={{ width: 12 }} />
        <View style={{ flex: 1 }}>
          <Text style={styles.label}>Minutes (0–59)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={minutes}
            onChangeText={setMinutes}
            placeholder="30"
            editable={!isView}
          />
        </View>
      </View>

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, { height: 96 }]}
        multiline
        value={description}
        onChangeText={setDescription}
        placeholder="Courte description"
        editable={!isView}
      />

      {/* Save : uniquement en ajout */}
      {!isView && <Button title="Save" onPress={onSave} />}

      {/* Delete : uniquement en consultation — retourne à la liste, sans supprimer */}
      {isView && (
        <View style={{ marginTop: 12 }}>
          <Button title="Delete" onPress={() => navigation.goBack()} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12 },
  title: { fontSize: 20, fontWeight: "700", marginBottom: 12 },
  label: { fontWeight: "600", marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    backgroundColor: "#fff",
  },
  row: { flexDirection: "row" },
});
