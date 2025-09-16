import React from "react";
import { SafeAreaView, View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";
import RadioGroup from 'react-native-radio-buttons-group';
import { Picker } from '@react-native-picker/picker';

export default function App() {
  return (
    <SafeAreaView style={styles.page}>
      {/* <LoginScreen /> */}
      {/* <SignupScreen /> */}
      <RecipeFormScreen />
    </SafeAreaView>
  );
}

/* ------------ Login --------------- */
function LoginScreen() {
  return (
    <View style={styles.centerWrap}>
      <TextInput placeholder="Username" placeholderTextColor="#CFE3E0" style={styles.input} />
      <TextInput placeholder="Password" placeholderTextColor="#CFE3E0" secureTextEntry style={styles.input} />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.link}>Sign up!</Text>
    </View>
  );
}

/* ------------ Signup --------------- */
function SignupScreen() {
  return (
    <View style={styles.centerWrap}>
      <TextInput placeholder="Username" placeholderTextColor="#CFE3E0" style={styles.input} />
      <TextInput placeholder="Password" placeholderTextColor="#CFE3E0" secureTextEntry style={styles.input} />
      <TextInput placeholder="Password confirmation" placeholderTextColor="#CFE3E0" secureTextEntry style={styles.input} />

      <TouchableOpacity style={styles.buttonWide}>
        <Text style={styles.buttonText}>Create my account</Text>
      </TouchableOpacity>
    </View>
  );
}

/* ------------ Recipe Form --------------- */
function RecipeFormScreen() {

  const radioButtons = [
    { id: "breakfast", label: "Breakfast", value: "1" },
    { id: "lunch", label: "Lunch", value: "2" },
    { id: "dinner", label: "Dinner", value: "3" },
  ];
  return (
    <View style={styles.formWrap}>

      <RadioGroup
        radioButtons={radioButtons}
        layout="row"
      />
      {/* Name */}
      <TextInput
        placeholder="Name"
        placeholderTextColor="#CFE3E0"
        style={styles.inputFull}
      />

      {/* Duration */}
      <View style={styles.durationRow}>
        <Text style={styles.durationLabel}>Duration</Text>

        {/* Heures */}
        <View style={styles.pickerContainer} >
          <Picker style={styles.picker}>
            <Picker.Item label="0h" value="1" />
          </Picker>
        </View>

        <Text style={styles.colon}> : </Text>

        {/* Minutes */}
        <View style={styles.pickerContainer} >
          <Picker style={styles.picker}>
            <Picker.Item label="0m" value="1" />
          </Picker>
        </View>
      </View>


      {/* Description */}
      <TextInput
        placeholder="Description"
        placeholderTextColor="#CFE3E0"
        multiline
        style={styles.textAreaFull}
      />

      {/* Save en bas */}
      <TouchableOpacity style={styles.buttonSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#7d2e75ff",
    paddingHorizontal: 20,
  },

  /* Login / Signup centrés */
  centerWrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  /* Recipe form aligné haut avec bouton en bas */
  formWrap: {
    flex: 1,
    padding: 14,
  },

  /* Inputs (Login/Signup) */
  input: {
    width: "80%",
    borderWidth: 1,
    borderColor: "#BFD5D2",
    padding: 10,
    marginBottom: 15,
    borderRadius: 4,
    color: "white",
    backgroundColor: "transparent",
  },

  /* Input pleine largeur (Recipe) */
  inputFull: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#BFD5D2",
    padding: 10,
    marginTop: 10,
    marginBottom: 12,
    borderRadius: 4,
    color: "white",
    backgroundColor: "transparent",
  },

  /* TextArea pleine largeur et haute (Recipe) */
  textAreaFull: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#BFD5D2",
    padding: 10,
    borderRadius: 4,
    color: "white",
    backgroundColor: "transparent",
    textAlignVertical: "top",
    marginTop: 8,
    height: '450'

  },

  /* Boutons */
  button: {
    backgroundColor: "#F4A300",
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 10,
  },
  buttonWide: {
    backgroundColor: "#F4A300",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 10,
    width: 220,
  },
  buttonSave: {
    backgroundColor: "#F4A300",
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: "center",
    alignSelf: "center",
    marginTop: "auto",
    marginBottom: 8,
    width: 90,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },

  link: {
    color: "blue",
    marginTop: 20,
    textDecorationLine: "underline",
  },

  /* Radios (visuels) */
  radioRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    padding: 24,
  },
  radioItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 28,
  },
  radioCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: "#E4ECEB",
    marginRight: 8,
  },
  radioLabel: {
    color: "#E4ECEB",
    fontSize: 16,
  },

  /* Duration (visuel statique) */
  durationRow: {
    flexDirection: "row",
    alignItems: "center",
    height: 40,
  },
  durationLabel: {
    color: "white",
    marginRight: 10,
  },
  pickerContainer: {
    minWidth: 120, // structure <View><Picker/></View>
    marginHorizontal: 4,
  },
  picker: {
    color: "white",
  },
  colon: {
    color: "white",
    marginHorizontal: 4,
  },
});