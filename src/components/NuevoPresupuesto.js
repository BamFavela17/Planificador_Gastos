import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import globalStyles from "../styles";

const NuevoPresupuesto = ({
  presupuesto,
  setPresupuesto,
  handelNuevoPresupuesto,
}) => {
  useEffect(() => {
    
   
  }, []);
  return (
    <View style={style.contenedor}>
      <Text style={style.label}>Definir Presupuesto</Text>
      <TextInput
        keyboardType="numeric"
        style={style.input}
        placeholder="Agrega el presupuesto ej. 300"
        value={presupuesto.toString()}
        onChangeText={setPresupuesto}
      />
      <Pressable
        style={style.boton}
        onPress={() => {
          handelNuevoPresupuesto(presupuesto);
        }}
      >
        <Text style={style.botonTexto}>Agregar Presupuesto</Text>
      </Pressable>
    </View>
  );
};

const style = StyleSheet.create({
  contenedor: {
    ...globalStyles.contenedor,
  },
  label: {
    textAlign: "center",
    fontSize: 30,
    color: "#00a7f5ff",
  },
  input: {
    backgroundColor: "#F5F5F5",
    padding: 10,
    borderRadius: 10,
    textAlign: "center",
    marginTop: 30,
  },
  boton: {
    marginTop: 30,
    backgroundColor: "#1048A4",
    padding: 10,
    borderRadius: 10,
  },
  botonTexto: {
    textAlign: "center",
    color: "#fff",
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});

export default NuevoPresupuesto;
