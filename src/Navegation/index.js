import React from 'react';
import { BrowserRouter as Routing, Route, Switch } from 'react-router-dom';

import SideBar from '../SideBar';
import Ordenes from '../components/Ordenes';
import Menu from '../components/Menu';
import NuevoProducto from '../components/nuevoProducto';

const Navegation = () => {
  return (
    <Routing>
      <div className="md:flex min-h-screen">
        <SideBar />
        <div className="md:w-3/5 xl:w-4/5 p-6">
          <Switch>
            <Route exact path="/" component={Ordenes} />

            <Route exact path="/menu" component={Menu} />

            <Route exact path="/nuevo-producto" component={NuevoProducto} />
          </Switch>
        </div>
      </div>
    </Routing>
  );
};

export default Navegation;
