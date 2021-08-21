import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { addCompletedMaintenance, deletePendingMaintenanceForCompleted } from '../../actions/account';

const AddCompletedMaintenance = ({ addCompletedMaintenance, history, handleChild, renderForm, item, deletePendingMaintenanceForCompleted, setKey }) => {

    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0
    const yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;

    const [formData] = useState({
        maintenanceType: item.maintenanceType,
        date: today,
        notes: item.notes
    });

    const id = item._id

    return (
        <Fragment>
            <form className="maintenance-item-form" onSubmit={e => {
                e.preventDefault();
                addCompletedMaintenance(formData, history);
                deletePendingMaintenanceForCompleted(id);
                renderForm(e);
                setKey(null);
                }}>
                <label htmlFor="add-to-completed" className="add-completed-label">Add to Completed Maintenance?</label>
                <input type="submit" value="Yes" className="submit-completed-button" />
                <input type="button" value="Cancel" className="cancel-button" onClick={e => renderForm(e)} />
            </form>
        </Fragment>
    )
}

const mapStateToProps = state => {
    return (
        ({
            completedMaintenanceItems: state.completedMaintenanceItems
        })
    )    
}

export default connect(mapStateToProps, { addCompletedMaintenance, deletePendingMaintenanceForCompleted })(AddCompletedMaintenance);