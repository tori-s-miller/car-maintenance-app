import React, { Fragment, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPendingMaintenance } from '../../actions/maintenance';

const AddPendingMaintenance = ({ addPendingMaintenance, history }) => {
    const [formData, setFormData] = useState({
        date: '',
        notes: ''
    });

    const { date, notes } = formData;

    console.log('AddPendingMaintenance form history:', history)
    console.log('AddPendingMaintenance form addPendingMaintenance action:', addPendingMaintenance)

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

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
                {/* <input type="button" value="Cancel" className="cancel-button" onClick={renderForm} /> */}
            </form>
        </Fragment>
    )
}

// AddGoalInProgress.propTypes = {
//     addGoalInProgress: PropTypes.func.isRequired
// }

export default connect(null, { addPendingMaintenance })(withRouter(AddPendingMaintenance));