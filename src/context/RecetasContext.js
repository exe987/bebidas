import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const RecetasContext = createContext();

const RecetasProvider = (props) => {
  //STATE DEL RESULTADO DE BUSQUEDA
  const [recetas, guardarRecetas] = useState([]);
  //STATE DE BUSQUEDA DE USUARIO
  const [busqueda, buscarRecetas] = useState({
    nombre: "",
    categoria: "",
  });
  //STATE DE LA CONSULTA
  const [consulta, guardarConsulta] = useState(false);

  //EXTRAEMOS VALORES DE BUSQUEDA

  const { nombre, categoria } = busqueda;

  //CUANDO EXISTA UNA BUSQUEDA CONSULTAR A API
  useEffect(() => {
    const obtenerRecetas = async () => {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${nombre}&c=${categoria}`;
      const respuesta = await axios.get(url);
      guardarRecetas(respuesta.data.drinks);
    };
    if (consulta) {
      obtenerRecetas();
    }
    // eslint-disable-next-line
  }, [busqueda]);

  return (
    <RecetasContext.Provider
      value={{
        recetas,
        buscarRecetas,
        guardarConsulta,
      }}
    >
      {props.children}
    </RecetasContext.Provider>
  );
};

export default RecetasProvider;
