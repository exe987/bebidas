import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

//CREAMOS EL CONTEXT

export const CategoriasContext = createContext();

//PROVIDER DONDE VAN A ESTAR EL ESTADO Y SU FUNCION

const CategoriasProvider = (props) => {
  //STATE DE CONTEXT
  const [categorias, saveCategorias] = useState([]);
  //LLAMADO A API
  useEffect(() => {
    //OBTENER CATEGORIAS
    const obtenerCategorias = async () => {
        const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

        const respuesta = await axios.get(url);
        
        saveCategorias(respuesta.data.drinks);
       
    }
    obtenerCategorias();

  }, [] );
 
  return (
    <CategoriasContext.Provider
      value={{
        categorias
      }}
    >
      {props.children}
    </CategoriasContext.Provider>
  );
};

export default CategoriasProvider;
