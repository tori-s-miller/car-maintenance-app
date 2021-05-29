import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { addCompletedMaintenance, deletePendingMaintenanceForCompleted } from '../../actions/maintenance';

const AddCompletedMaintenance = ({ addCompletedMaintenance, history, handleChild, renderForm, item, deletePendingMaintenanceForCompleted }) => {

    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;

    const [formData, setFormData] = useState({
        maintenanceType: item.maintenanceType,
        date: today,
        notes: item.notes
    });


    console.log('AddCompletedMaintenance item:', item)

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
                {/* console.log('action formData:', formData)
                console.log('addCompletedMaintenance ran') */}
                renderForm(e);
                console.log('item:', item)
                console.log('item._id:', item._id)
                deletePendingMaintenanceForCompleted(item._id);
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
    completedMaintenanceItems: state.completedMaintenanceItems
})

export default connect(mapStateToProps, { addCompletedMaintenance, deletePendingMaintenanceForCompleted })(AddCompletedMaintenance);