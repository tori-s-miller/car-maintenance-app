import React, { Fragment, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addPendingMaintenance } from '../../actions/account';

const AddPendingMaintenance = ({ addPendingMaintenance, history, handleChild, renderForm, item, id }) => {

    console.log('AddPendingMaintenance id:', id)

    const [formData, setFormData] = useState({
        maintenanceType: item,
        date: '',
        notes: ''
    });

    const { maintenanceType, date, notes } = formData;

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const [state, setState] = React.useState("");
    React.useEffect(() => {
        handleChild(state);
    }, [state]);


    return (
        <Fragment>
            <form className="maintenance-item-form" onSubmit={e => {
                console.log('maintenance form history:', history)
                e.preventDefault();
                // pass in user id to addPendingMaintenance
                addPendingMaintenance(formData, id, history);
                renderForm(e);
                }}>
                <label htmlFor="date" className="date-label">Date to be completed</label>
                <input type="date" name="date" className="date-input" value={date} onChange={e => onChange(e)} />
                <label htmlFor="notes" className="notes-label">Notes</label>
                <textarea rows="3" name="notes" className="input-notes" value={notes} onChange={e => onChange(e)} />
                <input type="submit" value="Schedule Task" className="submit-button" />
                <input type="button" value="Cancel" className="cancel-button" onClick={e => renderForm(e)} />
            </form>
        </Fragment>
    )
}

const mapStateToProps = state => {
        console.log('AddPendingMaintenance state.auth.user:', state.auth.user)
        console.log('AddPendingMaintenance state:', state)
        return ({
        // pendingMaintenance: state.pendingMaintenance
        // id: state.auth.user._id,
        pendingMaintenance: state.auth.user.pendingMaintenance
    })
}

export default connect(mapStateToProps, { addPendingMaintenance })(AddPendingMaintenance);