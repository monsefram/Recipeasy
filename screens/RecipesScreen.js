// screens/RecipesScreen.js
import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  TouchableOpacity,
} from "react-native";

/** Icône simple par catégorie (pas de dépendance externe) */
const CATEGORY_ICON = {
  0: "☕️", // boisson / entrée
  1: "🥗", // salade
  2: "🍔", // plat
  3: "🍰", // dessert
  4: "🍝", // pâtes
};

const pad2 = (n) => String(n).padStart(2, "0");
const formatDuration = (h, m) => `${h}h${pad2(m)}`;

/** Seeds de départ pour tester l'affichage */
const SEEDS = [
  //A*
  { category: 0, name: "A0", durationHours: 0, durationMinutes: 4, description: "aa aaa aaaaaaa" },
  { category: 0, name: "A1", durationHours: 0, durationMinutes: 4, description: "aa aaa aaaaaaa" },
  { category: 0, name: "A2", durationHours: 0, durationMinutes: 4, description: "aa aaa aaaaaaa" },
  { category: 0, name: "A3", durationHours: 0, durationMinutes: 4, description: "aa aaa aaaaaaa" },
  // B*
  { category: 2, name: "B0", durationHours: 1, durationMinutes: 30, description: "bb bbbb b bbb b bbbbh" },
  { category: 2, name: "B1", durationHours: 1, durationMinutes: 30, description: "bb bbbb b bbb b bbbbh" },
  { category: 2, name: "B2", durationHours: 1, durationMinutes: 30, description: "bb bbbb b bbb b bbbbh" },
  { category: 2, name: "B3", durationHours: 1, durationMinutes: 30, description: "bb bbbb b bbb b bbbbh" },
  // C*
  { category: 4, name: "C0", durationHours: 1, durationMinutes: 30, description: "cccccccc c cccccccccc cc cc c ccc c cccccc c c c" },
  { category: 4, name: "C1", durationHours: 1, durationMinutes: 30, description: "cccccccc c cccccccccc cc cc c ccc c cccccc c c c" },
];

export default function RecipesScreen({ navigation, route }) {
  const [recipes, setRecipes] = useState(SEEDS);

  // Mise à jour de la liste lors d'un ajout (depuis RecipeForm)
  useEffect(() => {
    if (route?.params?.newRecipe) {
      setRecipes((prev) => [...prev, route.params.newRecipe]);
      navigation.setParams({ newRecipe: undefined }); // éviter les doublons au retour
    }
  }, [route?.params?.newRecipe]);

  // Tri par nom (ordre croissant) comme demandé au début du TP
  const sorted = useMemo(
    () => [...recipes].sort((a, b) => a.name.localeCompare(b.name)),
    [recipes]
  );

  const openAdd = () => navigation.navigate("RecipeForm", { mode: "add" });

  const openDetail = (item) =>
    navigation.navigate("RecipeForm", { mode: "view", recipe: item });

  const renderItem = ({ item }) => {
    const icon = CATEGORY_ICON[item.category] ?? "🍽️";
    return (
      <Pressable
        onPress={() => openDetail(item)}
        android_ripple={{ color: "#eee" }}
        style={({ pressed }) => [
          styles.row,
          pressed && { backgroundColor: "#f2f2f2" },
        ]}
      >
        <View style={styles.iconBox}>
          <Text style={styles.icon}>{icon}</Text>
        </View>

        <View style={{ flex: 1 }}>
          <View style={styles.rowTop}>
            <Text style={styles.duration}>
              {formatDuration(item.durationHours, item.durationMinutes)}
            </Text>
            <Text style={styles.name}>{item.name}</Text>
          </View>
          <Text style={styles.desc} numberOfLines={1}>
            {item.description}
          </Text>
        </View>
      </Pressable>
    );
  };

  const Separator = () => <View style={styles.separator} />;

  const Empty = () => (
    <View style={styles.emptyWrap}>
      <Text style={styles.emptyText}>No recipes yet...</Text>
      <TouchableOpacity style={styles.fab} onPress={openAdd} activeOpacity={0.8}>
        <Text style={styles.fabPlus}>＋</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.screen}>
      <FlatList
        data={sorted}
        keyExtractor={(_, idx) => String(idx)}
        renderItem={renderItem}
        ItemSeparatorComponent={Separator}
        ListEmptyComponent={Empty}
        contentContainerStyle={sorted.length === 0 && { flex: 1 }}
      />

      {/* FAB Add quand la liste n’est pas vide */}
      {sorted.length > 0 && (
        <TouchableOpacity style={styles.fab} onPress={openAdd} activeOpacity={0.8}>
          <Text style={styles.fabPlus}>＋</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#0f9a94" }, // vert/teal comme la maquette
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: "transparent",
  },
  iconBox: {
    width: 34,
    height: 34,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    backgroundColor: "rgba(0,0,0,0.06)",
  },
  icon: { fontSize: 16 },
  rowTop: { flexDirection: "row", alignItems: "baseline", gap: 8 },
  duration: { fontSize: 12, fontWeight: "700", color: "#0a0a0a" },
  name: { fontSize: 16, fontWeight: "800", color: "#0a0a0a" },
  desc: { fontSize: 12, color: "#162a2a", marginTop: 2 },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "rgba(0,0,0,0.2)",
    marginLeft: 60, // laisse l’icône “hors” du trait comme sur la maquette
  },
  emptyWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 40,
  },
  emptyText: { color: "rgba(255,255,255,0.85)", fontSize: 18, fontWeight: "700" },
  fab: {
    position: "absolute",
    right: 18,
    bottom: 18,
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "#ffa412", // orange comme la maquette
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },
  fabPlus: { fontSize: 28, color: "#fff", lineHeight: 28 },
});
