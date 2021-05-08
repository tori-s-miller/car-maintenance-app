import React, { Fragment, useEffect } from 'react';
import Navbar from '../layout/Navbar';
import { getPendingMaintenance } from '../../actions/maintenance';
import { connect } from 'react-redux';

const PendingMaintenance = ({ getPendingMaintenance, auth, pendingMaintenanceItems }) => {

    useEffect(() => {
        getPendingMaintenance();
    }, [])

    console.log('PendingMaintenance pendingMaintenanceItems:', pendingMaintenanceItems)
    // console.log('PendingMaintenance pendingMaintenanceItems:', pendingMaintenanceItems[0].user)
    // console.log('PendingMaintenance auth.user._id:', auth.user._id)
    console.log('PendingMaintenance auth.user._id', auth.user._id)

    return (
        <Fragment>
            <Navbar />
            <div>hello there {auth.user._id}</div>
            {pendingMaintenanceItems.map(item => {
                console.log('item:', item)
                if (auth.user._id === item.user) {
                    return (
                        <ul>
                            <li>{item.maintenanceType}</li>
                            <li>{item.user}</li>
                        </ul>
                    )
                }
            })}
        </Fragment>
    )
}

const mapStateToProps = state => {
    console.log('mapStateToProps state:', state)
    return ({
    auth: state.auth,
    pendingMaintenanceItems: state.maintenance.pendingMaintenanceItems
})
}

export default connect(
    mapStateToProps,
    { getPendingMaintenance }
)(PendingMaintenance);
// export default connect(mapStateToProps, { getPendingMaintenance })(PendingMaintenance);