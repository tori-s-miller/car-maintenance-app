import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({ isAuthenticated }) => {
  if(isAuthenticated) {
    return <Redirect to='/dashboard' />
  }

    return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">AutoLog</h1>
          <p className="lead">
            application description here
          </p>
          <div className="buttons">
            <Link to="/register" className="btn btn-primary btn-signup"><span>Sign Up</span></Link>
            <Link to="/login" className="btn btn-light">Login</Link>
            <Link to="/login-demo" className="btn btn-light">Try Demo</Link>
          </div>
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