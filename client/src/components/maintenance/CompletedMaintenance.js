import React, { Fragment, useEffect, useState } from 'react';
import { getCompletedMaintenance, deleteCompletedMaintenance } from '../../actions/account';
import Navbar from '../layout/Navbar';
import { connect } from 'react-redux';
import checkbox from './img/checkbox.svg';

const CompletedMaintenance = ({ getCompletedMaintenance, completedMaintenanceItems, deleteCompletedMaintenance }) => {

    useEffect(() => {
        getCompletedMaintenance();
    }, [])

    function deleteCompletedMaintenanceClick(e) {
        const deleteKey = e.currentTarget.parentNode.parentNode.getAttribute("data-index");
        completedMaintenanceItems.map((item, index) => {
            if (index == deleteKey) {
                deleteCompletedMaintenance(item._id);
            }
        });
    }

    return (
        <Fragment>
            <Navbar />
            <h1 className="completed-maintenance-h1">Completed Maintenance Items</h1>
            <div className="container-completed-maintenance-items">
                {completedMaintenanceItems !== undefined && completedMaintenanceItems.length === 0 && (
                    <p className="no-maintenance-items">
                        No completed maintenance items added yet.
                    </p>
                )}
                {completedMaintenanceItems !== undefined && completedMaintenanceItems.map((item, index) => {
                    let date = item.date.slice(0, 10);
                    return (
                        <div 
                            className="completed-maintenance-item"
                            key={index}
                            data-index={index}
                        >
                            <div className="completed-container">
                                <p className="pending-maintenance-task">{item.maintenanceType}</p>
                                <div className="completed-maintenance-date-container">
                                    <img src={checkbox} className="checkbox" />
                                    <p className="completed-maintenance-date">Completed on {date}</p>
                                </div>
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