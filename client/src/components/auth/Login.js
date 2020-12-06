import React, { Fragment, useState } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import car from '../img/car-illustration.svg';

// since the action is a prop, we're going to destructure it so we don't have to do props.login
const Login = ({ login, isAuthenticated }) => {
    // the useState hook: formData is going to be the state, just like:
    // state = { formData: {
    //  } }
    // setFormData is basically like this.setState and passing the form values in
    const [formData, setFormData] = useState({
        // this is our initial state
        email: '',
        password: '',
    });

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        login(email, password);
    };

    // Redirect if logged in
    if(isAuthenticated) {
        return <Redirect to="/maintenance-options" />
    }

    return (
        <Fragment>
        <section className="landing">
            <div className="col-1">
                <h1>AutoLog</h1>
                <h2>Log Into Your Account</h2>
                <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <label for="email" className="email-label">Email</label>
                    <input type="email" placeholder="Email Address" name="email" value={email} 
                        onChange={e => onChange(e)} required />
                </div>
                <div className="form-group">
                    <label for="password" className="password-label">Password</label>
                    <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    minLength="6"
                    value={password} 
                    onChange={e => onChange(e)}
                    />
                </div>
                <input type="submit" className="form-btn" value="Log In" />
                </form>
                <p className="have-acct-text">Don't have an account? <Link to='/register' className="have-acct-text-link">Sign up.</Link></p>
            </div>
            <div className="col-2">
                <img src={car} className="car" />
            </div>
        </section>
        </Fragment>
    );
};

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);