import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { addCompletedMaintenance } from '../../actions/maintenance';

const AddCompletedMaintenance = ({ addCompletedMaintenance, history, handleChild, renderForm, item }) => {

    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;

    const [formData, setFormData] = useState({
        maintenanceType: item,
        date: today,
        notes: ''
    });

    const { maintenanceType, date, notes } = formData;

    const onChange = e => {
        console.log('onChange e.target.name:', e.target.name);
        console.log('onChange e.target.value:', e.target.value);
        setFormData({ ...formData, [e.target.name]: e.target.value });
        console.log('formData:', formData);
    }

    const [state, setState] = React.useState("");
    React.useEffect(() => {
        handleChild(state);
    }, [state]);




    return (
        <Fragment>
            <form className="maintenance-item-form" onSubmit={e => {
                e.preventDefault();
                addCompletedMaintenance(formData, history);
                renderForm(e);
                }}>
                <label htmlFor="date" className="date-label">Add to Completed Maintenance?</label>
                {/* <label htmlFor="notes" className="notes-label">Notes</label>
                <textarea rows="2" name="notes" className="input-notes" value={notes} onChange={e => onChange(e)} /> */}
                <input type="submit" value="Yes" className="submit-button" />
                <input type="button" value="Cancel" className="cancel-button" onClick={e => renderForm(e)} />
            </form>
        </Fragment>
    )
}

const mapStateToProps = state => ({
    pendingMaintenance: state.completedMaintenance
})

export default connect(mapStateToProps, { addCompletedMaintenance })(AddCompletedMaintenance);