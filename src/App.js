import React, { Suspense } from 'react';

import firebase, { FirebaseContext } from './firebase';
import Navegation from './Navegation';
import useAutenticacion from './hooks/useAutenticacion';
import Login from './components/login';

function App() {
  const usuarioAuth = useAutenticacion();

  return (
    <FirebaseContext.Provider value={{ firebase, usuarioAuth }}>
      <Suspense fallback={'cargando..'}>
        {!usuarioAuth && <Login />}

        {usuarioAuth && <Navegation />}
      </Suspense>
    </FirebaseContext.Provider>
  );
}

export default App;
