import React, { useContext } from "react";
import Receta from "./Receta";
import { RecetasContext } from "../context/RecetasContext";

const ListaRecetas = () => {
  //NOS TRAEMOS LAS LAS PROPS DE LOS CONTEXT

  const { recetas } = useContext(RecetasContext);

  return (
    <div className="row mt-5">
      {recetas.map((receta) => (
        <Receta receta={receta} key={receta.idDrink} />
      ))}
    </div>
  );
};

export default ListaRecetas;
