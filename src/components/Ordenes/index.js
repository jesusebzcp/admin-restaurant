import React, { useContext, useEffect, useState } from 'react';
import { FirebaseContext } from '../../firebase';
import Orden from '../ui/orden';

const Ordenes = () => {
  const { firebase } = useContext(FirebaseContext);
  const [ordenesBd, setOrdenesBd] = useState([]);
  useEffect(() => {
    const obtenerOrdenes = () => {
      firebase.db
        .collection('ordenes')
        .where('completado', '==', false)
        .onSnapshot(manejarSnapshot);
    };
    obtenerOrdenes();
  }, []);
  function manejarSnapshot(snapshot) {
    const ordenes = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    setOrdenesBd(ordenes);
  }

  return (
    <>
      <div className="container">
        <div className="row">
          {ordenesBd.map((orden) => {
            return (
              <div className="col-sm-6 mt-6" key={orden.id}>
                <Orden orden={orden} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Ordenes;
