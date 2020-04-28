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
  return (
    <div className="text-3xl font-light mb-4">
      <div className="p-5 shadow bg-white">
        <div className="lg:flex">
          <div className="lg:w-5/12 xl:w-3/12">
            <img src={imagen} alt={nombre} />

            <div className="sm:flex sm:-mx-2 contSelect mt-5 ml-5">
              <select
                onChange={() => actualizarDisponibilidad()}
                ref={existenciaRef}
                value={existencia}
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="true">Disponible</option>
                <option value="false">Agotado</option>
              </select>
            </div>
          </div>

          <div className="lg:w-7/12">
            <p className="font-bold  my-4 pl-4 capitalize">{nombre}</p>
            <p className=" text-gray-600 mb-4 pl-4">
              Categoria:{' '}
              <span className="text-gray-700 font-bold capitalize">
                {categoria}
              </span>
            </p>
            <p className=" text-gray-600 mb-4 pl-4">{descripcion}</p>
            <p className=" text-gray-600 mb-4 pl-4">
              Precio:{' '}
              <span className="text-gray-700 font-bold capitalize">
                {precio}{' '}
                <span className="text-gray-900 font-bold uppercase">COP</span>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Producto;
