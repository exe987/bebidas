import React, { useContext, useState } from "react";
import { CategoriasContext } from "../context/CategoriasContext";
import { RecetasContext } from "../context/RecetasContext";

const Formulario = () => {
  //NOS TRAEMOS LAS LAS PROPS DE LOS CONTEXT
  const { categorias } = useContext(CategoriasContext);
  const { buscarRecetas, guardarConsulta } = useContext(RecetasContext);

  //STATE DE LO QUE SELECCIONA EL USUARIO- EN ESTE CASO TIENEN QUE COINCIDIR CON LAS CLAVES DEL STATE
  //DE RECETAS QUE VIENE DEL CONTEXT

  const [busqueda, guardarBusqueda] = useState({
    nombre: "",
    categoria: "",
  });

  //FUNCION QUE COLOCA LOS ELEMENTOS EN EL STATE
  const handleChange = (e) => {
    //ACTUALIZA EL STATE
    guardarBusqueda({
      ...busqueda,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form
      className="col-12"
      onSubmit={(e) => {
        e.preventDefault();
        buscarRecetas(busqueda);
        guardarConsulta(true)
      }}
    >
      <fieldset className="text-center">
        <legend>BUSCA BEBIDAS POR CATEGORIA O INGREDIENTES</legend>
      </fieldset>
      <div className="row mt-4">
        <div className="col-md-4">
          <input
            name="nombre"
            className="form-control"
            type="text"
            placeholder="BUSCA POR INGREDIENTES"
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4">
          <select
            className="form-control"
            name="categoria"
            onChange={handleChange}
          >
            <option value="">---SELECCIONE CATEGORIA---</option>
            {categorias.map((categoria) => (
              <option value={categoria.strCategory} key={categoria.strCategory}>
                {categoria.strCategory}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-4">
          <input
            type="submit"
            className="btn btn-block btn-dark"
            value="BUSCAR"
          />
        </div>
      </div>
    </form>
  );
};

export default Formulario;
