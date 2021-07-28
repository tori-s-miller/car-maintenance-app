import React, { Fragment, useEffect, useState } from 'react';
import Navbar from '../layout/Navbar';
import { getPendingMaintenance, addCompletedMaintenance, deletePendingMaintenance, deletePendingMaintenanceForCompleted } from '../../actions/account';
import { connect } from 'react-redux';
import AddCompletedMaintenance from '../forms/AddCompletedMaintenance';

const PendingMaintenance = ({ getPendingMaintenance, addCompletedMaintenance, auth, pendingMaintenanceItems, deletePendingMaintenance }) => {

    useEffect(() => {
        getPendingMaintenance();
    }, [])

    const [hidden, setHidden] = useState(true);
    const [key, setKey] = useState(null);

    const [child, setChild] = React.useState(false);
    const handleChildState = React.useCallback(childState => {
        setChild(childState);
        console.log('childState:', childState)
    }, []);

    function renderForm(e) {
        e.preventDefault();
        const key = e.currentTarget.parentNode.parentNode.parentNode.getAttribute("data-index");
        setKey(key);
        setHidden(!hidden);
    }

    function deletePendingMaintenanceClick(e) {
        const deleteKey = e.currentTarget.parentNode.parentNode.parentNode.getAttribute("data-index");
        pendingMaintenanceItems.map((item, index) => {
            if (index == deleteKey) {
                deletePendingMaintenance(item._id);
            }
        });
    }

    return (
        <Fragment>
            <Navbar />
            <h1 className="pending-maintenance-h1">Pending Maintenance Items</h1>
            <p className="pending-maintenance-sort">Sort by:</p>
            <div className="container-pending-maintenance-items">
            {pendingMaintenanceItems !== undefined && pendingMaintenanceItems.map((item, index) => {
                let date = item.date.slice(0, 10);
                return (
                    <div 
                        className={!hidden && key === `${index}` ? "pending-maintenance-item-expanded" : "pending-maintenance-item"}
                        key={index}
                        data-index={index}
                    >
                        <div className="pending-container">
                            <p className="pending-maintenance-task">{item.maintenanceType}</p>
                            <p className="maintenance-date">Scheduled for {date}</p>
                            {key !== `${index}` && <p className="maintenance-notes">{item.notes}</p>}
                            <div className="button-container">
                                {key !== `${index}` && <button className="pending-item-complete-button" onClick={hidden ? renderForm : undefined}>Completed</button>}
                                {key !== `${index}` && <button className="pending-item-delete-button" onClick={deletePendingMaintenanceClick}>Delete</button>}
                            </div>
                            {!hidden && key === `${index}` && (
                                <div className="add-to-maintenance">
                                    <AddCompletedMaintenance handleChild={handleChildState} hidden={hidden} renderForm={renderForm} item={item} setKey={setKey} />
                                </div>
                            )}
                        </div>
                    </div>
                )
            })}
            </div>
        </Fragment>
    )
}

const mapStateToProps = state => {
    if(state.account.user != null) {
        return ({
            pendingMaintenanceItems: state.account.user.pendingMaintenance
        });
    }
}

export default connect(
    mapStateToProps,
    { getPendingMaintenance, addCompletedMaintenance, deletePendingMaintenance }
)(PendingMaintenance);