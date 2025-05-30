import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/axios";
import useAuth from "../hooks/useAuth";

const PacientesContext = createContext();

export const PacientesProvider = ({ children }) => {
  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState({});
  const { auth } = useAuth();

  useEffect(() => {
    const obtenerPacientes = async () => {
      if (!auth._id) return;
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("No hay token disponible");
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const { data } = await clienteAxios("/pacientes", config);
        setPacientes(data);
      } catch (error) {
        console.log(error?.reponse?.data?.msg);
      }
    };
    obtenerPacientes([auth]);
  }, [auth]);

  const guardarPaciente = async (paciente) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No hay token disponible");
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    if (paciente.id) {
      try {
        const { data } = await clienteAxios.put(
          `/pacientes/${paciente.id}`,
          paciente,
          config
        );

        const pacientesActualizados = pacientes.map((pacienteState) => {
          return pacienteState._id === data._id ? data : pacienteState;
        });

        setPacientes(pacientesActualizados);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const { data } = await clienteAxios.post(
          "/pacientes",
          paciente,
          config
        );

        const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = data;
        setPacientes([pacienteAlmacenado, ...pacientes]);
      } catch (error) {
        console.log(error.response.data.msg);
      }
    }

    // nuevo
  };

  const setEdicion = (paciente) => {
    setPaciente(paciente);
  };

  const eliminarPaciente = async (id) => {
    const confirmar = confirm("¿Seguro que deseas eliminar?");

    if (confirmar) {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.log("No hay token disponible");
          return;
        }

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await clienteAxios.delete(`/pacientes/${id}`, config);
        const pacientesActualizado = pacientes.filter(
          (pacientesState) => pacientesState._id !== id
        );
        setPacientes(pacientesActualizado);
      } catch (error) {
        console.log(error.response.data.msg);
      }
    }
    console.log(pacientes);
  };

  return (
    <PacientesContext.Provider
      value={{
        pacientes,
        guardarPaciente,
        setEdicion,
        paciente,
        eliminarPaciente,
      }}
    >
      {children}
    </PacientesContext.Provider>
  );
};

export default PacientesContext;
