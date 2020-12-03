import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from './img/Logo.png';

const Landing = ({ isAuthenticated }) => {
  // if(isAuthenticated) {
  //   return <Redirect to='/maintenance-options' />
  // }

    return (
    <section className="landing">
      <div className="landing-inner">
        <img src={logo} className="autolog-logo" alt="autolog-logo" />
        <div className="landing-text-container landing-text-one">
        <h2 className="header-subtitle">Keep Track of Completed Maintenance</h2>
          <div className="intro-text">
            <p>With the ability to track your past car maintenance, you’ll no longer be wondering when the last time you completed a task was. All your maintenance is logged in one place.</p>     
          </div>
        </div>
        <div className="landing-text-container landing-text-two">
        <h2 className="header-subtitle">Schedule Maintenance for the Future</h2>
          <div className="intro-text">
            <p>Never forget another oil change or tire pressure check. By scheduling maintenance to be completed in the future, you’ll won’t need to worry about when your next car maintenance task is due.</p>
          </div>
        </div>
        <div className="buttons">
          <Link to="/register" className="btn btn-primary landing-btn btn-signup"><span>Sign Up</span></Link>
          <p className="have-acct-text">Already have an account? <Link to="/login" className="have-acct-text-link">Login.</Link></p>
          <Link to="/login-demo" className="btn btn-light landing-btn btn-demo">Try Demo</Link>
        </div>
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