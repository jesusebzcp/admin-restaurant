import React, { useContext, useRef } from 'react';
import { FirebaseContext } from '../../firebase';

const Producto = ({ producto }) => {
  const existenciaRef = useRef(producto.existencia);
  const { firebase } = useContext(FirebaseContext);
  const {
    id,
    nombre,
    imagen,
    existencia,
    categoria,
    precio,
    descripcion,
  } = producto;
  //estado del platillo en firebase
  const actualizarDisponibilidad = () => {
    const existencia = existenciaRef.current.value === 'true';
    console.log(existencia);
    try {
      firebase.db.collection('productos').doc(id).update({
        existencia,
      });
    } catch (error) {
      console.log(error);
    }
  };
  //eliminharPorducto
  const eliminarProducto = async (id) => {
    try {
      await firebase.db.collection('productos').doc(id).delete();
    } catch (error) {
      console.log(error);
    }
  };

  const style = {
    card: {
      width: '18rem',
    },
  };
  return (
    <div className="card" style={style}>
      <img src={imagen} alt={nombre} className="card-img-top" />
      <select
        onChange={() => actualizarDisponibilidad()}
        ref={existenciaRef}
        value={existencia}
        className="form-control my-2"
        id="exampleFormControlSelect1"
      >
        <option value="true">Disponible</option>
        <option value="false">Agotado</option>
      </select>
      <div className="card-body">
        <h5 className="card-title">
          {' '}
          <span className="font-weight-bold">Nombre:</span> {nombre}
        </h5>
        <p className="card-text">
          <span className="font-weight-bold">Descripcion:</span>
          <br />
          {descripcion}
        </p>
        <p>
          <span className="font-weight-bold">Categoria:</span>{' '}
          <span className="text-warning"> {categoria} </span>$
        </p>
        <p>
          <span className="font-weight-bold">Precio:</span>{' '}
          <span className="text-danger"> {precio} </span>$
        </p>
      </div>
      <button
        className="btn btn-danger mt-2 d-block"
        onClick={() => eliminarProducto(id)}
      >
        Eliminar producto
      </button>
    </div>
  );
};

export default Producto;
