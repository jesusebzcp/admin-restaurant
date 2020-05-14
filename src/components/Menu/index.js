import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FirebaseContext } from '../../firebase';
import Producto from '../ui/index';

const Menu = () => {
  const [productos, setProducto] = useState([]);
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const obtenerProductos = () => {
      firebase.db.collection('productos').onSnapshot(handleSnapshot);
    };
    obtenerProductos();
  }, []);
  const handleSnapshot = (snapshot) => {
    const productos = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    setProducto(productos);
  };
  return (
    <>
      <h1 className="text-3xl font-light mb4">Menu</h1>
      <Link
        to="/nuevo-producto"
        className="rounded bg-blue-800 hover:bg-blue-700 inline-block mb-5 p-2 text-white uppercase font-bold "
      >
        Agregar Producto
      </Link>

      <div className="container">
        <div className="row">
          {productos.map((producto) => (
            <div className="col-sm-4 mt-6">
              <Producto key={producto.id} producto={producto} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Menu;
