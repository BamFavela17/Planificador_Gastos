import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import ControlPresupuesto from "./src/components/ControlPresupuesto";
import FormularioGastos from "./src/components/FormularioGasto";
import Header from "./src/components/Header";
import ListadoGastos from "./src/components/ListadoGastos";
import NuevoPresupuesto from "./src/components/NuevoPresupuesto";

import Filtro from "./src/components/Filtro";
import { generarID } from "./src/helpers/index";

const App = () => {
  const [isValidPresupuesto, setisValidPresupuesto] = useState(false); // cambiar a false
  const [presupuesto, setPresupuesto] = useState(0);
  const [gastos, setGastos] = useState([]);
  const [modal, setModal] = useState(false);
  const [gasto, setGasto] = useState({});
  const [filtro, setFiltro] = useState("");
  const [gastosFiltrados, setGastosFiltrados] = useState([]);

  useEffect(() => {
    const obtenerPresupuestoStorage = async () => {
      try {
        const presupuestoStorage =
          (await AsyncStorage.getItem("planificador_presupuesto")) ?? 0;
        if (presupuestoStorage > 0) {
          setPresupuesto(presupuestoStorage);
          setisValidPresupuesto(true);
        }
      } catch (err) {
        console.log(err);
      }
    };
    obtenerPresupuestoStorage();
  }, []);

  useEffect(() => {
    if (isValidPresupuesto) {
      const guardarPresupuestoStorage = async () => {
        try {
          await AsyncStorage.setItem("planificador_presupuesto", presupuesto);
        } catch (err) {
          console.log(err);
        }
      };
      guardarPresupuestoStorage();
    }
  }, [isValidPresupuesto]);

  useEffect(() => {
    const obtenerGastosStorage = async () => {
      try {
        const gastosStorage = await AsyncStorage.getItem("planificador_gastos");
        setGastos(gastosStorage ? JSON.parse(gastosStorage) : []);
      } catch (err) {
        console.log(err);
      }
    };
    obtenerGastosStorage();
  }, []);

  useEffect(() => {
    const guardarGastosStorage = async () => {
      try {
        await AsyncStorage.setItem(
          "planificador_gastos",
          JSON.stringify(gastos)
        );
      } catch (err) {
        console.log(err);
      }
    };
    guardarGastosStorage();
  }, [gastos]);

  const handelNuevoPresupuesto = (presupuesto) => {
    if (Number(presupuesto) > 0) {
      setisValidPresupuesto(true);
      console.log("presupuesto valido", isValidPresupuesto);
      return;
    }
    Alert.alert("Error", "El presupuesto no puede ser menor a 0");
  };

  const handleGasto = (gasto) => {
    if ([gasto.nombre, gasto.cantidad, gasto.categoria].includes("")) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }
    if (gasto.id) {
      // editar los registros
      const gastosActualizados = gastos.map((gastoState) =>
        gastoState.id === gasto.id ? gasto : gastoState
      );
      setGastos(gastosActualizados);
    } else {
      // añadier el nuevo gasto al State
      gasto.id = generarID();
      gasto.fecha = Date.now();

      setGastos([...gastos, gasto]);
    }
    setModal(!modal);
  };

  const eliminarGasto = (id) => {
    Alert.alert(
      "¿Deseas eliminar este gasto?",
      "Un gasto eliminado no se puede recuperar.",
      [
        { text: "No", style: "cancel" },
        {
          text: "Si, eliminar",
          onPress: () => {
            //console.log("Eliminando...", id);
            const gastosAcyualizados = gastos.filter(
              (gastoState) => gastoState.id !== id
            );

            setGastos(gastosAcyualizados);
            setModal(false);
            setGasto({});
          },
        },
      ]
    );
  };

  const resetearApp = () => {
    Alert.alert(
      "Deseas resetear la app?",
      "Esto eliminara presupuesto y gastos.",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Si, Eliminar",
          onPress: async () => {
            try {
              await AsyncStorage.clear();

              setisValidPresupuesto(false);
              setPresupuesto(0);
              setFiltro("");
              setGastos([]);
            } catch (err) {
              console.log(err);
            }
          },
        },
      ]
    );
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Header />
          {isValidPresupuesto ? (
            <ControlPresupuesto
              resetearApp={resetearApp}
              presupuesto={presupuesto}
              gastos={gastos}
            />
          ) : (
            <NuevoPresupuesto
              presupuesto={presupuesto}
              setPresupuesto={setPresupuesto}
              handelNuevoPresupuesto={handelNuevoPresupuesto}
            />
          )}
        </View>

        {isValidPresupuesto && (
          <>
            <Filtro
              gastos={gastos}
              setGastosFiltrados={setGastosFiltrados}
              filtro={filtro}
              setFiltro={setFiltro}
            />

            <ListadoGastos
              gastos={gastos}
              setModal={setModal}
              setGasto={setGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </>
        )}
      </ScrollView>
      {isValidPresupuesto && (
        <Pressable style={styles.pressable} onPressIn={() => setModal(!modal)}>
          <Image
            style={styles.imagen}
            source={require("./src/img/nuevo-gasto.png")}
          />
        </Pressable>
      )}

      {modal && (
        <Modal animationType="slide" visible={modal}>
          <FormularioGastos
            setModal={setModal}
            handleGasto={handleGasto}
            setGasto={setGasto}
            gasto={gasto}
            eliminarGasto={eliminarGasto}
          />
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#dddadaff",
    flex: 1,
  },
  header: {
    backgroundColor: "#3B82F6",
  },
  pressable: {
    width: 60,
    height: 60,
    position: "absolute",
    bottom: 40,
    right: 30,
  },
  imagen: {
    width: 60,
    height: 60,
  },
});

export default App;
