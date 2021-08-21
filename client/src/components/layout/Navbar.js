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




const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  // const authLinks = (
  //   <ul>
  //     <li>
  //       <Link to="/maintenance-options">
  //       <i className="fas fa-user" alt=""></i>{' '}
  //       <span className="hide-sm">Maintenance Options</span></Link>
  //     </li>
  //     <li>
  //       <a onClick={logout} href="#!">
  //         <i className="fas fa-sign-out-alt" alt=""></i>{' '}
  //         <span className="hide-sm">Logout</span></a>
  //     </li>
  //   </ul>
  // );

  // const guestLinks = (
  //   <ul>
  //     <li><Link to="/register">Register</Link></li>
  //     <li><Link to="/login">Login</Link></li>
  //   </ul>
  // );

  const useTextNav = useMediaQuery({ query: '(min-width: 769px)' });
  const useIconNav = useMediaQuery({ query: '(max-width: 768px)' });

  // const location = useLocation();
  const location = useLocation().pathname;

    return (
    <nav className="navbar">
      <ul>
        <li className="nav-link-1">
          <NavLink 
            to="/maintenanceoptions"
            activeStyle={{
              color: "#008CC5"
            }}
          >
          {useTextNav && <div className="nav-link">Maintenance Options</div>}
          {useIconNav && location === '/maintenanceoptions' && <img 
            src={maintenanceIconActive} 
            className=""
            alt="active-icon" />}
          {useIconNav && location !== '/maintenanceoptions' && <img 
          src={maintenanceIcon} 
          className=""
          alt="inactive-icon" />}
          </NavLink>
        </li>
        <li className="nav-link-2">
          <NavLink 
            to="/account/pendingmaintenance"
            activeStyle={{
              color: "#008CC5"
            }}
            >
            {useTextNav && <div className="nav-link">Pending Maintenance</div>}
            {useIconNav && location === '/account/pendingmaintenance' && <img 
            src={pendingActive} 
            alt="active-icon" />}
            {useIconNav && location !== '/account/pendingmaintenance' && <img 
            src={pending} 
            alt="inactive-icon" />}
          </NavLink>
        </li>
        <li className="nav-link-3">
          <NavLink 
            to="/account/completedmaintenance"
            activeStyle={{
              color: "#008CC5"
            }}
            >
            {useTextNav && <div className="nav-link">Completed Maintenance</div>}
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
            {/* <i className="fas fa-sign-out-alt" alt=""></i>{' '} */}
            <span className="hide-sm">Logout</span>
          </a>}
          {useIconNav && <img 
            src={logoutIcon} 
            className="logout"
            alt="logout-icon" />}
        </li>
      </ul>
      {/* { !loading && (<Fragment>{ isAuthenticated ? authLinks: guestLinks }</Fragment>) } */}
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