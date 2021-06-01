import React, { Fragment, useEffect, useState } from 'react';
import Navbar from '../layout/Navbar';
import { getPendingMaintenance, addCompletedMaintenance, deletePendingMaintenanceForCompleted } from '../../actions/maintenance';
import { connect } from 'react-redux';
import AddCompletedMaintenance from '../forms/AddCompletedMaintenance';

const PendingMaintenance = ({ getPendingMaintenance, addCompletedMaintenance, auth, pendingMaintenanceItems }) => {

    useEffect(() => {
        getPendingMaintenance();
    }, [])

    const [hidden, setHidden] = useState(true);
    const [key, setKey] = useState(null);
    console.log('PendingMaintenance hidden:', hidden)
    console.log('PendingMaintenance key:', key)


    const [deletedItem, setDeletedItem] = useState(null)

    const [child, setChild] = React.useState(false);
    const handleChildState = React.useCallback(childState => {
        setChild(childState);
    }, []);

    function renderForm(e) {
        e.preventDefault();
        console.log('renderForm ran');
        console.log('e.currentTarget.parentNode.parentNode.parentNode:', e.currentTarget.parentNode.parentNode.parentNode)
        const key = e.currentTarget.parentNode.parentNode.parentNode.getAttribute("data-index");
        setKey(key);
        setHidden(!hidden);
        
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
            {console.log('Pending Maintenance return ran')}
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
                            /* onClick={hidden ? renderForm : undefined} */
                        >
                        {console.log('Pending Maintenance sub return ran; item:', item)}
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
                                        {/* {console.log('key:', key)}
                                        <p>Add to Completed Maintenance?</p>
                                        <button onClick={addCompletedMaintenance(currentMaintenanceItem)}>YES</button>
                                        <button onClick={cancelButton}>CANCEL</button> */}
                                        <AddCompletedMaintenance handleChild={handleChildState} hidden={hidden} renderForm={renderForm} item={item} />
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
    console.log('PendingMaintenance state:', state)
    return ({
    auth: state.auth,
    pendingMaintenanceItems: state.maintenance.pendingMaintenanceItems
})
}

export default connect(
    mapStateToProps,
    { getPendingMaintenance, addCompletedMaintenance }
)(PendingMaintenance);