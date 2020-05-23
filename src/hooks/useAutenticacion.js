import React, { useEffect, useState } from 'react';
import firebase from '../firebase';

function useAutenticacion() {
  const [usuarioAutenticado, setUsuarioAutenticado] = useState(null);
  console.log(usuarioAutenticado);

  useEffect(() => {
    const unsuscribe = firebase.auth.onAuthStateChanged((usuarioAuth) => {
      if (usuarioAuth) {
        setUsuarioAutenticado(usuarioAuth);
      } else {
        setUsuarioAutenticado(null);
      }
    });
    return () => unsuscribe();
  }, []);

  return usuarioAutenticado;
}

export default useAutenticacion;