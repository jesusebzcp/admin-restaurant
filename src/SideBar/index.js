import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Link, NavLink } from 'react-router-dom';

const SideBar = () => {
  const styles = {
    bmBurgerButton: {
      position: 'fixed',
      width: '36px',
      height: '30px',
      left: '36px',
      top: '36px',
    },
    bmBurgerBars: {
      background: '#373a47',
    },
    bmBurgerBarsHover: {
      background: '#a90000',
    },
    bmCrossButton: {
      height: '24px',
      width: '24px',
    },
    bmCross: {
      background: '#bdc3c7',
    },
    bmMenuWrap: {
      position: 'fixed',
      height: '100%',
    },
    bmMenu: {
      background: '#373a47',
      padding: '2.5em 1.5em 0',
      fontSize: '1.15em',
    },
    bmMorphShape: {
      fill: '#373a47',
    },
    bmItemList: {
      color: '#b8b7ad',
      padding: '0.8em',
    },
    bmItem: {
      display: 'block',
    },
    bmOverlay: {
      background: 'rgba(0, 0, 0, 0.3)',
    },
  };
  return (
    <>
      {' '}
      <Menu styles={styles}>
        <h4 className="text-white">
          Panel administrativo <i className="fas fa-user-cog"></i>
        </h4>
        <Link className="mt-5 menu-item" to="/">
          Home <i className="fas fa-home"></i>
        </Link>

        <NavLink
          activeClassName="text-danger"
          className="mt-5 menu-item "
          to="/ordenes"
        >
          Ordenes <i className="fas fa-bell"></i>
        </NavLink>
        <NavLink
          activeClassName="text-danger"
          className="mt-5 menu-item"
          to="/menu"
        >
          Productos <i className="fas fa-tags"></i>
        </NavLink>
      </Menu>
    </>
  );
};

export default SideBar;
