import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import {
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import globalStyles from "../styles";

const FormularioGastos = ({
  setModal,
  handleGasto,
  setGasto,
  gasto,
  eliminarGasto,
}) => {
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [categoria, setCategoria] = useState("");
  const [id, setId] = useState("");
  const [fecha, setFecha] = useState("");

  useEffect(() => {
    if (gasto?.nombre) {
      setNombre(gasto.nombre);
      setCantidad(gasto.cantidad);
      setCategoria(gasto.categoria);
      setId(gasto.id);
      setFecha(gasto.fecha);
    }
  }, [gasto]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={style.contenedor}>
        <View style={style.contenedorBotones}>
          <Pressable
            onLongPress={() => {
              setModal(false);
              setGasto({});
            }}
            style={[style.btn, style.btnCancelar]}
          >
            <Text style={style.btnTexto}>Cancelar</Text>
          </Pressable>

          {!!id && (
            <Pressable
              onLongPress={() => {
                eliminarGasto(id);
              }}
              style={[style.btn, style.btnEliminar]}
            >
              <Text style={style.btnTexto}>Eliminar</Text>
            </Pressable>
          )}
        </View>

        <View style={style.formulario}>
          <Text style={style.titulo}>
            {" "}
            {gasto?.nombre ? "Editar Gasto" : "Nuevo Gasto"}{" "}
          </Text>

          <View style={style.campo}>
            <Text style={style.label}>Nombre Gasto:</Text>
            <TextInput
              style={style.input}
              placeholder="Nombre del gasto ej. comida"
              value={nombre}
              onChangeText={setNombre}
            />
          </View>

          <View style={style.campo}>
            <Text style={style.label}>Cantidad Gasto:</Text>
            <TextInput
              style={style.input}
              placeholder="Cantidad del gasto ej. 300"
              keyboardType="numeric"
              value={cantidad}
              onChangeText={setCantidad}
            />
          </View>

          <View style={style.campo}>
            <Text style={style.label}>Categoria Gasto:</Text>
            <Picker
              style={style.input}
              selectedValue={categoria}
              onValueChange={(valor) => {
                setCategoria(valor);
              }}
            >
              <Picker.Item label="-- Seleccione --" value="" />
              <Picker.Item label="Ahorro" value="ahorro" />
              <Picker.Item label="Comida" value="comida" />
              <Picker.Item label="Casa" value="casa" />
              <Picker.Item label="Gastos varios" value="gastos" />
              <Picker.Item label="Ocio" value="ocio" />
              <Picker.Item label="Salud" value="salud" />
              <Picker.Item label="Suscripciones" value="suscripciones" />
            </Picker>
          </View>
          <Pressable
            onPress={() => {
              handleGasto({ nombre, cantidad, categoria, id, fecha });
              setGasto({});
            }}
            style={style.submitBtn}
          >
            <Text style={style.submitBtnTexto}>
              {" "}
              {gasto?.nombre ? "Editar Gasto" : "Agregar Gasto"}
            </Text>
          </Pressable>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const style = StyleSheet.create({
  contenedor: {
    backgroundColor: "#1E40AF",
    flex: 1,
  },
  contenedorBotones: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btn: {
    padding: 10,
    marginTop: 30,
    marginHorizontal: 10,
    borderRadius: 10,
    flex: 1,
  },
  btnCancelar: {
    backgroundColor: "#DB2777",
  },
  btnEliminar: {
    backgroundColor: "red",
  },
  btnTexto: {
    textAlign: "center",
    textTransform: "uppercase",
    fontWeight: "bold",
    color: "#fff",
  },
  formulario: {
    ...globalStyles.contenedor,
  },
  titulo: {
    textAlign: "center",
    fontSize: 28,
    marginBottom: 30,
    color: "#64748B",
  },
  campo: {
    marginVertical: 10,
  },
  label: {
    color: "#64748B",
    textTransform: "uppercase",
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#F5F5F5",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  submitBtn: {
    backgroundColor: "#3B82F6",
    padding: 10,
    marginTop: 20,
    borderRadius: 10,
  },
  submitBtnTexto: {
    textAlign: "center",
    color: "#fff",
    textTransform: "uppercase",
  },
});

export default FormularioGastos;
