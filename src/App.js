import React from 'react';
import Navegation from './Navegation';
import 'firebase/firestore';

import firebase, { FirebaseContext } from './firebase';

function App() {
  return (
    <FirebaseContext.Provider value={{ firebase }}>
      <Navegation />
    </FirebaseContext.Provider>
  );
}

export default App;
