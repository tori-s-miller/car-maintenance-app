import React, { Fragment, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPendingMaintenance } from '../../actions/maintenance';

const AddPendingMaintenance = ({ addPendingMaintenance, history, handleChild, renderForm }) => {

    console.log('AddPendingMaintenance handleChild:', handleChild)
    console.log('AddPendingMaintenance renderForm:', renderForm)

    const [formData, setFormData] = useState({
        date: '',
        notes: ''
    });

    const { date, notes } = formData;

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    
    // function renderForm(e) {
    //     e.preventDefault();
    //     setFormHidden(!formHidden);
    // }

    const [state, setState] = React.useState("");
    React.useEffect(() => {
        handleChild(state);
    }, [state]);

    console.log('AddPendingMaintenance state:', state)


    return (
        <Fragment>
            <form className="maintenance-item-form" onSubmit={e => {
                e.preventDefault();
                addPendingMaintenance(formData, history);
                }}>
                <label htmlFor="date" className="date-label">Date to be completed</label>
                <input type="date" name="start-date" className="date-input" />
                <label htmlFor="notes" className="notes-label">Notes</label>
                <textarea rows="3" name="notes" className="input-notes" />
                <input type="submit" value="Schedule Task" className="submit-button" />
                <input type="button" value="Cancel" className="cancel-button" onClick={e => renderForm(e)} />
            </form>
        </Fragment>
    )
}

// AddGoalInProgress.propTypes = {
//     addGoalInProgress: PropTypes.func.isRequired
// }


export default connect(null, { addPendingMaintenance })(AddPendingMaintenance);