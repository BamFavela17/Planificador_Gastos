import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import globalStyles from "../styles";
import { formatearCantidad, formatearFecha } from "../helpers";

const diccionarioIconos = {
  ahorro: require("../img/icono_ahorro.png"),
  comida: require("../img/icono_comida.png"),
  casa: require("../img/icono_casa.png"),
  gastos: require("../img/icono_gastos.png"),
  ocio: require("../img/icono_ocio.png"),
  salud: require("../img/icono_salud.png"),
  suscripciones: require("../img/icono_suscripciones.png"),
};

const Gasto = ({ gasto, setModal, setGasto }) => {
  const { nombre, categoria, cantidad, fecha } = gasto;

  const handleAcciones = () => {
    setModal(true);
    setGasto(gasto);
  };

  return (
    <Pressable onLongPress={handleAcciones}>
      <View style={style.contenedor}>
        <View style={style.contenido}>
          <View style={style.contenedorImagen}>
            <Image style={style.imagen} source={diccionarioIconos[categoria]} />
            <View style={style.contenedorTexto}>
              <Text style={style.categoria}>{categoria}</Text>
              <Text style={style.nombre}>{nombre}</Text>
              <Text style={style.fecha}>{formatearFecha(fecha)}</Text>
            </View>
            <Text style={style.cantidad}>{formatearCantidad(cantidad)}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const style = StyleSheet.create({
  contenedor: {
    ...globalStyles.contenedor,
    marginBottom: 20,
  },
  contenido: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  contenedorImagen: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  imagen: {
    width: 80,
    height: 80,
    marginRight: 20,
  },
  contenedorTexto: {
    flex: 1,
  },
  categoria: {
    color: "#94A3B8",
    fontSize: 16,
    fontWeight: "700",
    textTransform: "uppercase",
    marginBottom: 5,
  },
  nombre: {
    fontSize: 22,
    color: "#64748B",
    marginBottom: 5,
  },
  cantidad: {
    fontSize: 20,
    fontWeight: "700",
  },
  fecha: {
    fontWeight: "700",
    color: "#DB2777",
  },
});
export default Gasto;
