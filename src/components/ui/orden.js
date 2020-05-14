import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../../firebase';

const Orden = ({ orden }) => {
  console.log(orden);
  const [tiempoEntrega, setiempoEntrega] = useState(0);
  const { firebase } = useContext(FirebaseContext);

  const definirTiempo = async (id) => {
    try {
      await firebase.db.collection('ordenes').doc(id).update({
        tiempoEntrega,
      });
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
        {orden.tiempoEntrega === 0 && (
          <div className="mb-4" key={orden.id}>
            <label className="block text-gray-800 text-sm font-bold mb-2">
              Tiempo de entrega
            </label>
            <input
              value={tiempoEntrega}
              onChange={(e) => setiempoEntrega(parseInt(e.target.value))}
              type="number"
              min="1"
              max="45"
              placeholder="Define el tiempo de entrega"
              className="shaddow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <button
              onClick={() => definirTiempo(orden.id)}
              type="submit"
              className="btn btn-success"
            >
              Definir tiempo de entrega<i className="fas fa-stopwatch"></i>
            </button>
          </div>
        )}
        {orden.tiempoEntrega > 0 && (
          <p>
            <span>{tiempoEntrega} :minuto(s)</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Orden;
/*
<img className="card-img-top" src="..." alt="Card image cap"/>*/
