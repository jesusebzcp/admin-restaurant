import React, { useContext, useEffect, useState } from 'react';
import { FirebaseContext } from '../../firebase';
import HistorialUi from '../ui/historialUi';

const Historial = () => {
  const { firebase } = useContext(FirebaseContext);
  const [ordenesBd, setOrdenesBd] = useState([]);
  useEffect(() => {
    const obtenerOrdenes = () => {
      firebase.db
        .collection('ordenes')
        .where('completado', '==', true)
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
        <h2>Historial</h2>

        <div className="row">
          {ordenesBd.map((orden) => {
            return (
              <div className="col-sm-4 mt-6" key={orden.id}>
                <HistorialUi orden={orden} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Historial;
