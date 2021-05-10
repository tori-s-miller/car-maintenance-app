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
        const key = e.currentTarget.getAttribute("data-index");
        setKey(key);
        setHidden(!hidden);
        console.log('renderForm hidden 2:', hidden)
    }

    return (
        <Fragment>
            <Navbar />
            <h1 className="pending-maintenance-h1">Pending Maintenance Items</h1>
            {pendingMaintenanceItems.map((item, index) => {
                if (auth.user._id === item.user) {
                    return (
                        <div 
                            className={!hidden && key === `${index}` ? "maintenance-item-expanded" : "maintenance-item"}
                            key={index}
                            onClick={hidden ? renderForm : undefined}
                        >
                            <div className="flex-container">
                                <img src={light} className="icon" />
                                <div className="flex-sub-container">
                                    <p className="maintenance-task">{item.maintenanceType}</p>
                                    <p className="schedule-task">Task Completed</p>
                                </div>
                            </div>
                            {!hidden && key === `${index}` && (
                                <Fragment>
                                    <div>add to completed will go here</div>
                                    {/*<AddPendingMaintenance handleChild={handleChildState} hidden={hidden} renderForm={renderForm} item={item} />*/}
                                </Fragment>
                            )}
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