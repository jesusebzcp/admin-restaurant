import React from 'react';
import { BrowserRouter as Routing, Route, Switch } from 'react-router-dom';

import SideBar from '../SideBar';
import Ordenes from '../components/Ordenes';
import Menu from '../components/Menu';
import NuevoProducto from '../components/nuevoProducto';
import Home from '../Pages/Home';
import Registro from '../components/registrar';
import Login from '../components/login';

const Navegation = () => {
  return (
    <Routing>
      <SideBar />
      <div className="contMenu">
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/ordenes" component={Ordenes} />

            <Route exact path="/menu" component={Menu} />

            <Route exact path="/nuevo-producto" component={NuevoProducto} />

            <Route exact path="/registro" component={Registro} />
          </Switch>
        </div>
      </div>
    </Routing>
  );
};

export default Navegation;
