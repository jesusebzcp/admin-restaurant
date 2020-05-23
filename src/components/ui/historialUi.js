import React, { useContext } from 'react';
import { FirebaseContext } from '../../firebase';

const HistorialUi = ({ orden }) => {
  const { firebase } = useContext(FirebaseContext);

  const eliminarOrden = async (id) => {
    try {
      await firebase.db.collection('ordenes').doc(id).delete();
    } catch (error) {
      console.log(error);
    }
  };

  const style = {
    style: {
      width: '18rem',
    },
  };
  return (
    <>
      <h6>Finalizado</h6>
      <div className="card" style={style}>
        <div className="card-body">
          <h5 className="card-title">
            Id orden: <span className="text-danger"> {orden.id}</span>
          </h5>
          {orden.orden.map((productos) => {
            return (
              <p className="card-text" key={productos.id}>
                Cantidad:{productos.cantidad} {productos.nombre}
              </p>
            );
          })}

          <p className="card-text">Total a pagar: {orden.total}$</p>

          <button
            className="btn btn-danger mt-2"
            onClick={() => eliminarOrden(orden.id)}
          >
            Borrar
          </button>
        </div>
      </div>
    </>
  );
};

export default HistorialUi;
