import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
import car from '../img/car-illustration.svg';

const Register = ({ setAlert, register, isAuthenticated }) => {
    // the useState hook: formData is going to be the state, just like:
    // state = { formData: {
    //  } }
    // setFormData is basically like this.setState and passing the form values in
    const [formData, setFormData] = useState({
        // this is our initial state
        email: '',
        password: '',
        password2: ''
    });

    const { email, password, password2 } = formData;

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const onSubmit = e => {
        e.preventDefault();
        if(password !== password2) {
            setAlert('Passwords do not match', 'danger');
        } else {
            console.log('formData:', formData)
            register({ email, password });
        }
    }

    console.log('isAuthenticated:', isAuthenticated)

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
                <input type="email" name="email" value={email} 
                    onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                    <label for="password" className="password-label">Password</label>
                    <input
                    type="password"
                    name="password"
                    value={password} 
                    onChange={e => onChange(e)}
                    />
                </div>
                <div className="form-group">
                    <label for="password" className="password-label">Confirm Password</label>
                    <input
                    type="password"
                    name="password2"
                    value={password2} 
                    onChange={e => onChange(e)}
                    />
                </div>
                <input type="submit" className="form-btn" value="Sign Up" />
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