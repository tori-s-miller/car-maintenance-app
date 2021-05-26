import React, { Fragment, useEffect, useState } from 'react';
import Navbar from '../layout/Navbar';
import { getPendingMaintenance, addCompletedMaintenance } from '../../actions/maintenance';
import { connect } from 'react-redux';
import AddCompletedMaintenance from '../forms/AddCompletedMaintenance';

const PendingMaintenance = ({ getPendingMaintenance, addCompletedMaintenance, auth, pendingMaintenanceItems }) => {

    useEffect(() => {
        getPendingMaintenance();
    }, [])

    const [hidden, setHidden] = useState(true);
    const [key, setKey] = useState(null);
    const [currentMaintenanceItem, setCurrentMaintenanceItem] = useState({
        maintenanceType: '',
        date: '',
    });

    const [child, setChild] = React.useState(false);
    const handleChildState = React.useCallback(childState => {
        setChild(childState);
    }, []);

    function renderForm(e) {
        e.preventDefault();
        console.log('renderForm ran');
        const key = e.currentTarget.getAttribute("data-index");
        setKey(key);
        setHidden(!hidden);
        console.log('renderForm e.currentTarget:', e.currentTarget);
        // console.log('renderForm e.currentTarget.firstChild:', e.currentTarget.firstChild);
        // console.log('renderForm e.currentTarget.firstChild.firstChild:', e.currentTarget.firstChild.firstChild);
        // console.log('renderForm e.currentTarget.firstChild.firstChild.textContent:', e.currentTarget.firstChild.firstChild.textContent);
        // const currentMaintenanceItemType = e.currentTarget.firstChild.firstChild.textContent;
        // let today = new Date();
        // const dd = String(today.getDate()).padStart(2, '0');
        // const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        // const yyyy = today.getFullYear();
        // today = mm + '/' + dd + '/' + yyyy;
        // console.log('today:', today);
        // setCurrentMaintenanceItem({
        //     maintenanceType: currentMaintenanceItemType,
        //     date: today
        // });
    }

    console.log('currentMaintenanceItem:', currentMaintenanceItem)

    function cancelButton(e) {
        e.preventDefault();
        setKey(null);
        setHidden(!hidden);
    }


    const [currentCompletedItem, setCurrentCompletedItem] = useState(null)

    console.log('currentCompletedItem:', currentCompletedItem)

    // const [formData, setFormData] = useState({
    //     maintenanceType: item,
    //     date: '',
    //     notes: ''
    // });

    console.log('HELLO currentMaintenanceItem:', currentMaintenanceItem)

    return (
        <Fragment>
            <Navbar />
            <h1 className="pending-maintenance-h1">Pending Maintenance Items</h1>
            <p className="pending-maintenance-sort">Sort by:</p>
            <div className="container-pending-maintenance-items">
            {pendingMaintenanceItems.map((item, index) => {
                let date = item.date.slice(0, 10)
                if (auth.user._id === item.user) {
                    return (
                        <div 
                            className={!hidden && key === `${index}` ? "pending-maintenance-item-expanded" : "pending-maintenance-item"}
                            key={index}
                            data-index={index}
                            onClick={hidden ? renderForm : undefined}
                        >
                            <div className="pending-container">
                                <p className="pending-maintenance-task">{item.maintenanceType}</p>
                                <p className="maintenance-date">Scheduled for {date}</p>
                                {hidden && <p className="maintenance-notes">{item.notes}</p>}
                                <div className="button-container">
                                    {key !== `${index}` && <button className="pending-item-complete-button">Completed</button>}
                                    {key !== `${index}` && <button className="pending-item-delete-button">Delete</button>}
                                </div>
                                {!hidden && key === `${index}` && (
                                    <div className="add-to-maintenance">
                                        {/* {console.log('key:', key)}
                                        <p>Add to Completed Maintenance?</p>
                                        <button onClick={addCompletedMaintenance(currentMaintenanceItem)}>YES</button>
                                        <button onClick={cancelButton}>CANCEL</button> */}
                                        <AddCompletedMaintenance handleChild={handleChildState} hidden={hidden} renderForm={renderForm} />
                                    </div>
                                )}
                            </div>
                            
                        </div>
                    )
                }
            })}
            </div>
        </Fragment>
    )
}

const mapStateToProps = state => {
    return ({
    auth: state.auth,
    pendingMaintenanceItems: state.maintenance.pendingMaintenanceItems
})
}

export default connect(
    mapStateToProps,
    { getPendingMaintenance, addCompletedMaintenance }
)(PendingMaintenance);