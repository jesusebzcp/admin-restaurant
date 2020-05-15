import React from 'react';

import 'firebase/firestore';

import firebase, { FirebaseContext } from './firebase';
import Navegation from './Navegation';
import useAutenticacion from './hooks/useAutenticacion';
import Login from './components/login';

function App() {
  const usuarioAuth = useAutenticacion();

  return (
    <FirebaseContext.Provider value={{ firebase, usuarioAuth }}>
      {!usuarioAuth && <Login />}

      {usuarioAuth && <Navegation />}
    </FirebaseContext.Provider>
  );
}

export default App;
