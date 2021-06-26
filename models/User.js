const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    pendingMaintenance: {
        type: Array,
        required: true
    },
    completedMaintenance: {
        type: Array,
        required: true
    }
    // pendingMaintenance: {
    //     maintenanceType: {
    //         type: String,
    //         // required: true
    //     },
    //     date: {
    //         type: Date,
    //         // required: true
    //     },
    //     notes: {
    //         type: String,
    //         // required: true
    //     }
    // },
    // completedMaintenance: {
    //     maintenanceType: {
    //         type: String,
    //         // required: true
    //     },
    //     date: {
    //         type: Date,
    //         // required: true
    //     },
    //     notes: {
    //         type: String,
    //         // required: true
    //     }
    // }
});

module.exports = User = mongoose.model('user', UserSchema);