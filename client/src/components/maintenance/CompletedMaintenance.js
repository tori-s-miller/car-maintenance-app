import React, { Fragment, useEffect, useState } from 'react';
import { getCompletedMaintenance, deleteCompletedMaintenance } from '../../actions/account';
import Navbar from '../layout/Navbar';
import { connect } from 'react-redux';

const CompletedMaintenance = ({ getCompletedMaintenance, completedMaintenanceItems, deleteCompletedMaintenance }) => {

    useEffect(() => {
        getCompletedMaintenance();
    }, [])

    function deleteCompletedMaintenanceClick(e) {
        console.log('deleteCompletedMaintenanceClick e.currentTarget.parentNode:', e.currentTarget.parentNode)
        console.log('deleteCompletedMaintenanceClick e.currentTarget.parentNode.parentNode:', e.currentTarget.parentNode.parentNode)
        const deleteKey = e.currentTarget.parentNode.parentNode.getAttribute("data-index");
        console.log('deleteCompletedMaintenanceClick deleteKey:', deleteKey)
        console.log('completedMaintenanceItems:', completedMaintenanceItems)
        completedMaintenanceItems.map((item, index) => {
            if (index == deleteKey) {
                deleteCompletedMaintenance(item._id);
            }
        });
    }

    return (
        <Fragment>
            {console.log('CompletedMaintenance component rendered')}
            <Navbar />
            <h1 className="completed-maintenance-h1">Completed Maintenance Items</h1>
            <div className="container-completed-maintenance-items">
                {completedMaintenanceItems !== undefined && completedMaintenanceItems.map((item, index) => {
                    let date = item.date.slice(0, 10);
                    return (
                        <div 
                        /* className={!hidden && key === `${index}` ? "pending-maintenance-item-expanded" : "pending-maintenance-item"} */
                        className="completed-maintenance-item"
                        key={index}
                        data-index={index}
                        /* onClick={hidden ? renderForm : undefined} */
                        >
                            {console.log('completedMaintenanceItems rendered')}
                            <div className="completed-container">
                                <p className="pending-maintenance-task">{item.maintenanceType}</p>
                                <p className="maintenance-date">Completed on {date}</p>
                                <button className="pending-item-delete-button" onClick={deleteCompletedMaintenanceClick}>Delete</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </Fragment>
    )
}

const mapStateToProps = state => {
    console.log('CompletedMaintenance mapStateToProps state:', state)
    if(state.account.user != null) {
        return ({
            completedMaintenanceItems: state.account.user.completedMaintenance
        });
    }
}

export default connect(
    mapStateToProps,
    { getCompletedMaintenance, deleteCompletedMaintenance }
)(CompletedMaintenance);