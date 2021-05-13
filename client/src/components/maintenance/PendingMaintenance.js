import React, { Fragment, useEffect, useState } from 'react';
import Navbar from '../layout/Navbar';
import { getPendingMaintenance } from '../../actions/maintenance';
import { connect } from 'react-redux';
import light from './img/car-light.svg';

const PendingMaintenance = ({ getPendingMaintenance, auth, pendingMaintenanceItems }) => {

    useEffect(() => {
        getPendingMaintenance();
    }, [])

    const [hidden, setHidden] = useState(true);
    const [key, setKey] = useState(null);

    function renderForm(e) {
        console.log('renderForm hidden 1:', hidden)
        e.preventDefault();
        console.log('Pending Maintenance renderForm triggered')
        console.log('e.currentTarget:', e.currentTarget)
        const key = e.currentTarget.getAttribute("data-index");
        setKey(key);
        setHidden(!hidden);
        console.log('renderForm key:', key)
        console.log('renderForm hidden 2:', hidden)
    }

    function cancelButton(e) {
        e.preventDefault();
        setHidden(!hidden);
    }

    return (
        <Fragment>
            <Navbar />
            <h1 className="pending-maintenance-h1">Pending Maintenance Items</h1>
            {pendingMaintenanceItems.map((item, index) => {
                console.log('item:', item)
                let date = item.date.slice(0, 10)
                console.log('date:', date)
                if (auth.user._id === item.user) {
                    return (
                        <div 
                            className={!hidden && key === `${index}` ? "maintenance-item-expanded" : "maintenance-item"}
                            key={index}
                            data-index={index}
                            onClick={hidden ? renderForm : undefined}
                        >
                            <div className="flex-container">
                                <img src={light} className="icon" />
                                <div className="flex-sub-container">
                                    <p className="maintenance-task">{item.maintenanceType}</p>
                                    <p className="maintenance-task">Complete on: {date}</p>
                                    <p className="maintenance-task">{item.notes}</p>
                                    {key !== `${index}` && <p className="schedule-task">Task Completed?</p>}
                                    {!hidden && key === `${index}` && (
                                        <Fragment>
                                            <p>Add to Completed Maintenance?</p>
                                            <button>YES</button>
                                            <button onClick={cancelButton}>CANCEL</button>
                                        </Fragment>
                                    )}
                                </div>
                            </div>
                            
                        </div>
                    )
                }
            })}
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
    { getPendingMaintenance }
)(PendingMaintenance);