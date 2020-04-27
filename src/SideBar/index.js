import React from 'react';
import { NavLink } from 'react-router-dom';

const SideBar = () => {
  return (
    <>
      <div className="md:w-2/5 xl:w-1/5 bg-gray-800 p-4">
        <div className="P-6">
          <p className="uppercase text-white text-lg tracking-wide text-center font-bold">
            Demo restaurant
          </p>
          <p className="mt-3 text-gray-500">
            Administra tu restaurant en las siguientes opciones:
          </p>
          <nav>
            <NavLink
              className=" text-gray-400 block hover:bg-yellow-500 hover:text-gray-500"
              activeClassName="text-yellow-500"
              to="/"
            >
              Ordenes
            </NavLink>
            <NavLink
              className="p-1 text-gray-400 block hover:bg-yellow-500 hover:text-gray-500"
              activeClassName="text-yellow-500"
              to="/menu"
            >
              Menu
            </NavLink>
          </nav>
        </div>
      </div>
    </>
  );
};

export default SideBar;
