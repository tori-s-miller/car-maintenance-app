import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import car from '../img/car-illustration.svg';

const Landing = ({ isAuthenticated }) => {
  console.log('isAuthenticated:', isAuthenticated)
  if(isAuthenticated) {
    return <Redirect to='/maintenanceoptions' />
  }

    return (
    <section className="landing">
      <div className="col-1">
        <h1>AutoLog</h1>
        <h2>Schedule car maintenance tasks and track prior car maintenance.</h2>
          <Link to="/register" className="landing-btn btn-signup"><span>Sign Up</span></Link>
          <Link to="/login-demo" className="landing-btn btn-demo">Try Demo</Link>
          <p className="have-acct-text">Already have an account? <Link to="/login" className="have-acct-text-link">Login.</Link></p>
      </div>
      <div className="col-2">
        <img src={car} className="car" />
      </div>
    </section>
    )
}

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);