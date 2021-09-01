import React from 'react'
import { NavLink, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import '../../App.css';
import maintenanceIcon from './img/maintenance-options.svg'
import maintenanceIconActive from './img/maintenance-options-active.svg'
import pending from './img/pending.svg';
import pendingActive from './img/pending-active.svg';
import completed from './img/completed.svg';
import completedActive from './img/completed-active.svg';
import logoutIcon from './img/logout.svg';




const Navbar = ({ logout }) => {

  const useTextNav = useMediaQuery({ query: '(min-width: 769px)' });
  const useIconNav = useMediaQuery({ query: '(max-width: 768px)' });

  // const location = useLocation();
  const location = useLocation().pathname;

    return (
    <nav className="navbar">
      <ul>
        <li className="nav-link-1">
          <NavLink to="/maintenanceoptions">
          {useTextNav && 
            <div className={location === '/maintenanceoptions' ? 'nav-link-active' : 'nav-link-inactive'}>
              Maintenance Options
            </div>}
          {useIconNav && location === '/maintenanceoptions' && <img 
            src={maintenanceIconActive} 
            alt="active-icon" />}
          {useIconNav && location !== '/maintenanceoptions' && <img 
            src={maintenanceIcon} 
            alt="inactive-icon" />}
          </NavLink>
        </li>
        <li className="nav-link-2">
          <NavLink to="/account/pendingmaintenance">
          {useTextNav && 
            <div className={location === '/account/pendingmaintenance' ? 'nav-link-active' : 'nav-link-inactive'}>
              Pending Maintenance
            </div>}
          {useIconNav && location === '/account/pendingmaintenance' && <img 
            src={pendingActive} 
            alt="active-icon" />}
          {useIconNav && location !== '/account/pendingmaintenance' && <img 
            src={pending} 
            alt="inactive-icon" />}
          </NavLink>
        </li>
        <li className="nav-link-3">
          <NavLink to="/account/completedmaintenance">
            {useTextNav && 
              <div className={location === '/account/completedmaintenance' ? 'nav-link-active' : 'nav-link-inactive'}>
                Completed Maintenance
              </div>}
            {useIconNav && location === '/account/completedmaintenance' && <img 
              src={completedActive} 
              alt="active-icon" />}
            {useIconNav && location !== '/account/completedmaintenance' && <img 
              src={completed} 
              alt="inactive-icon" />}
          </NavLink>
        </li>
        <li>
          {useTextNav && <a onClick={logout} href="#!" className="logout">
            <span className="hide-sm">Logout</span>
          </a>}
          {useIconNav && <img 
            src={logoutIcon} 
            className="logout"
            alt="logout-icon" />}
        </li>
      </ul>
    </nav>
    )
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logout })(Navbar);