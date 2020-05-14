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
      <h1 className="text-center my-10">lista de productos</h1>
      <div className="d-flex">
        {' '}
        <h3 className="mr-3">Agrega un producto</h3>
        <Link to="/nuevo-producto" className=" btn btn-danger">
          Agregar Producto <i className="fas fa-plus-circle"></i>
        </Link>
      </div>

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
