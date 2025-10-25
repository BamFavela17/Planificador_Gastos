import { StyleSheet, Text, View } from "react-native";
import Gasto from "./Gasto";

const ListadoGastos = ({
  gastos,
  setModal,
  setGasto,
  filtro,
  gastosFiltrados,
}) => {
  return (
    <View style={style.contenido}>
      <Text style={style.titulo}>Gastos</Text>

      {filtro
        ? gastosFiltrados.map((gasto) => (
            <Gasto
              key={gasto.id}
              gasto={gasto}
              setModal={setModal}
              setGasto={setGasto}
            />
          ))
        : gastos.map((gasto) => (
            <Gasto
              key={gasto.id}
              gasto={gasto}
              setModal={setModal}
              setGasto={setGasto}
            />
          ))}

      {(gastos.length === 0 || (gastosFiltrados.length === 0 && !!filtro)) && (
        <Text style={style.gastos}>No hay gastos</Text>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  contenido: {
    marginTop: 20,
    marginBottom: 100,
  },
  titulo: {
    color: "#64748B",
    marginTop: 20,
    fontSize: 30,
    textAlign: "center",
    fontWeight: "700",
  },
  gastos: {
    marginVertical: 20,
    textAlign: "center",
    fontSize: 20,
  },
});

export default ListadoGastos;
