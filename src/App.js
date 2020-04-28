import React from 'react';

import 'firebase/firestore';

import firebase, { FirebaseContext } from './firebase';
import Navegation from './Navegation';

function App() {
  return (
    <FirebaseContext.Provider value={{ firebase }}>
      <Navegation />
    </FirebaseContext.Provider>
  );
}

export default App;
