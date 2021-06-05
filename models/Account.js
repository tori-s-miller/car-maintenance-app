const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    pendingMaintenance: {
        maintenanceType: {
            type: String,
            // required: true
        },
        date: {
            type: Date,
            // required: true
        },
        notes: {
            type: String,
            // required: true
        }
    }
});

module.exports = UserProfile = mongoose.model('userProfile', UserProfileSchema);