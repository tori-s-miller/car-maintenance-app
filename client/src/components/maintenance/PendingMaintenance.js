import React, { Fragment, useEffect, useState } from 'react';
import Navbar from '../layout/Navbar';
import { getPendingMaintenance, addCompletedMaintenance, deletePendingMaintenanceForCompleted } from '../../actions/account';
import { connect } from 'react-redux';
import AddCompletedMaintenance from '../forms/AddCompletedMaintenance';

const PendingMaintenance = ({ getPendingMaintenance, addCompletedMaintenance, auth, pendingMaintenanceItems }) => {

    useEffect(() => {
        getPendingMaintenance();
    }, [])

    const [hidden, setHidden] = useState(true);
    const [key, setKey] = useState(null);


    const [deletedItem, setDeletedItem] = useState(null)

    const [child, setChild] = React.useState(false);
    const handleChildState = React.useCallback(childState => {
        setChild(childState);
    }, []);

    function renderForm(e) {
        e.preventDefault();
        const key = e.currentTarget.parentNode.parentNode.parentNode.getAttribute("data-index");
        setKey(key);
        setHidden(!hidden);
    }

    function cancelButton(e) {
        e.preventDefault();
        setKey(null);
        setHidden(!hidden);
    }

    function ButtonClick() {
        console.log('button was clicked')
    }


    // const [currentCompletedItem, setCurrentCompletedItem] = useState(null)

    // console.log('PendingMaintenance currentCompletedItem:', currentCompletedItem)

    // const [formData, setFormData] = useState({
    //     maintenanceType: item,
    //     date: '',
    //     notes: ''
    // });


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
                        /* onClick={hidden ? renderForm : undefined} */
                    >
                        <div className="pending-container">
                            <p className="pending-maintenance-task">{item.maintenanceType}</p>
                            <p className="maintenance-date">Scheduled for {date}</p>
                            {hidden && <p className="maintenance-notes">{item.notes}</p>}
                            <div className="button-container">
                                {key !== `${index}` && <button className="pending-item-complete-button" onClick={hidden ? renderForm : undefined}>Completed</button>}
                                {key !== `${index}` && <button className="pending-item-delete-button" onClick={ButtonClick}>Delete</button>}
                            </div>
                            {!hidden && key === `${index}` && (
                                <div className="add-to-maintenance">
                                    {/* 
                                    <p>Add to Completed Maintenance?</p>
                                    <button onClick={addCompletedMaintenance(currentMaintenanceItem)}>YES</button>
                                    <button onClick={cancelButton}>CANCEL</button> */}
                                    <AddCompletedMaintenance handleChild={handleChildState} hidden={hidden} renderForm={renderForm} item={item} />
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
    console.log('PendingMaintenance mapStateToProps state:', state)
    if(state.account.user != null) {
        return ({
            pendingMaintenanceItems: state.account.user.pendingMaintenance
        });
    }
}

export default connect(
    mapStateToProps,
    { getPendingMaintenance, addCompletedMaintenance }
)(PendingMaintenance);