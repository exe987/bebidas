import React, { useContext, useState } from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { ModalContext } from "../context/ModalContext";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 300,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    overflow: 'scroll',
    height: '100%',
    maxHeight: 500,
    display: 'block'
    },
    header: {
    padding: '12px 0',
    borderBottom: '1px solid darkgrey'
    },
    content: {
    padding: "12px 0",
    overflow: 'scroll'
    }
}));

const Receta = ({ receta }) => {
  //EXTRAEMOS FUNCION DEL CONTEXT PARA GUARDAR ID
  const { informacion, saveIdReceta, guardarReceta } = useContext(ModalContext);

  //CONFIGURACION DEL MODAL DE MATERIAL UI
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //MOSTRAR INGREDIENTES
  const muestraIngredientes = (a) => {
    let ingredientes = [];
    for (var i = 1; i < 16; i++) {
      if (a[`strIngredient${i}`]) {
        ingredientes.push(
          <li>
            {a[`strIngredient${i}`]} {a[`strMeasure${i}`]}{" "}
          </li>
        );
      }
    }
    return ingredientes;
  };

  return (
    <div className="col-md-4 mb-3">
      <div className="card">
        <h2 className="card-header">{receta.strDrink}</h2>
        <img
          src={receta.strDrinkThumb}
          alt={`Imagen de ${receta.strDrink}`}
          className="heightcard"
        />
        <div className="card-body">
          <button
            type="button"
            className="btn btn-block btn-primary"
            onClick={() => {
              saveIdReceta(receta.idDrink);
              handleOpen();
            }}
          >
            VER RECETA
          </button>
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={open}
            onClose={() => {
              handleClose();
              saveIdReceta(null);
              guardarReceta({});
            }}
          >
            <div style={modalStyle} className={classes.paper}>
              <h2 id="simple-modal-title">{informacion.strDrink}</h2>
              <h3 className="mt-4">INTRUCCIONES</h3>
              <p id="simple-modal-description">{informacion.strInstructions}</p>
              <img className="img-fluid my-4" src={informacion.strDrinkThumb} alt={`Imagen de ${informacion.strDrink}`}/>
              <h3 className="mt-4">INGREDIENTES Y CANTIDADES</h3>
              <ul>{muestraIngredientes(informacion)}</ul>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Receta;
