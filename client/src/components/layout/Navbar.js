import React, { Fragment } from 'react'
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import '../../App.css';


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


    return (
    <nav className="navbar">
      <ul>
        <li className="nav-link-1">
          {/* <Link to="/maintenance-options">Maintenance Options</Link> */}
          <NavLink 
            to="/maintenanceoptions"
            activeStyle={{
              color: "#008CC5"
            }}
          >
            Maintenance Options
          </NavLink>
        </li>
        <li className="nav-link-2">
          <NavLink 
            to="/account/pendingmaintenance"
            activeStyle={{
              color: "#008CC5"
            }}
            >
              Pending Maintenance
          </NavLink>
        </li>
        <li className="nav-link-3">
          <NavLink 
            to="/completedmaintenance"
            activeStyle={{
              color: "#008CC5"
            }}
            >
              Completed Maintenance
          </NavLink>
        </li>
        <li>
          <a onClick={logout} href="#!">
            <i className="fas fa-sign-out-alt" alt=""></i>{' '}
            <span className="hide-sm">Logout</span></a>
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