import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const ModalContext = createContext();

const ModalProvider = (props) => {
  //STATE DEL PROVIDER
  const [idreceta, saveIdReceta] = useState(null);

  //STATE DE EL COMPONENTE DE LA RECETA PARA MOSTRARLA EN UN COMPONENTE MAS DESARROLLADO
  const [informacion, guardarReceta] = useState({});
  
  //UNA VEZ QUE TENEMOS EL ID LLAMAMOS A LA API

  useEffect(() => {
    const obtenerReceta = async () => {
      if (!idreceta) return null;

      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idreceta}`;

      const respuesta = await axios.get(url);

      guardarReceta(respuesta.data.drinks[0]);
    };
    obtenerReceta();
  }, [idreceta]);

  return (
    <ModalContext.Provider
      value={{
        informacion,
        saveIdReceta,
        guardarReceta,
      }}
    >
      {props.children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
