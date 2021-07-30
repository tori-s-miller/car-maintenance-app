import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
import car from '../img/car-illustration.svg';

const Register = ({ setAlert, register, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        password2: '',
        pendingMaintenance: [],
        completedMaintenance: []
    });

    const { email, password, password2, pendingMaintenance, completedMaintenance } = formData;

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const onSubmit = e => {
        e.preventDefault();
        if(password !== password2) {
            setAlert('Passwords do not match', 'danger');
        } else {
            register({ email, password, pendingMaintenance, completedMaintenance });
        }
    }

    if(isAuthenticated) {
        return <Redirect to="/maintenanceoptions" />
    }

    return (
        <Fragment>
        <section className="landing">
            <div className="col-1">
                <h1>AutoLog</h1>
                <h2>Create an Account</h2>
                <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <label for="email" className="email-label">Email</label>
                    <input 
                    type="email" 
                    name="email"
                    className="form-input" 
                    value={email} 
                    onChange={e => onChange(e)} 
                    />
                </div>
                <div className="form-group">
                    <label for="password" className="password-label">Password</label>
                    <input
                    type="password"
                    name="password"
                    className="form-input" 
                    value={password} 
                    onChange={e => onChange(e)}
                    />
                </div>
                <div className="form-group">
                    <label for="password" className="password-label">Confirm Password</label>
                    <input
                    type="password"
                    name="password2"
                    className="form-input"  
                    value={password2} 
                    onChange={e => onChange(e)}
                    />
                </div>
                <input type="submit" className="form-btn" value="Sign Up" />
                <Link to="/login-demo" className="landing-btn btn-demo">Try Demo</Link>
                </form>
                <p className="have-acct-text">Already have an account? <Link to='/login' className="have-acct-text-link">Login</Link></p>
            </div>
            <div className="col-2">
                <img src={car} className="car" />
            </div>
        </section>
        </Fragment>
    );
};

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);