const mongoose = require('mongoose');
// const User = require('../../models/User');
// const PendingMaintenance = require('../models/PendingMaintenance');


const pendingMaintenanceSchema = mongoose.Schema({
    maintenanceType: String,
    date: Date,
    notes: String
}, 
{ versionKey: false });

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
    pendingMaintenance: [pendingMaintenanceSchema],
    completedMaintenance: {
        type: Array,
        required: true
    }
},
{ versionKey: false });

module.exports = User = mongoose.model('user', UserSchema);

// const UserSchema = new mongoose.Schema({
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     date: {
//         type: Date,
//         default: Date.now
//     },
//     pendingMaintenance: {
//         type: Array,
//         required: true
//     },
//     completedMaintenance: {
//         type: Array,
//         required: true
//     }
// });

// module.exports = User = mongoose.model('user', UserSchema);