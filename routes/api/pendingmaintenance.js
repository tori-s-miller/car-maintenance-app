const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const auth = require('../../middleware/auth');

const PendingMaintenance = require('../../models/PendingMaintenance');
const User = require('../../models/User');


// @route POST api/pendingmaintenance
// @desc Create pending maintenance
// @access Private

router.post('/', [ auth, 
    // [
    //     check('maintenanceType', 'maintenanceType is required')
    //         .not()
    //         .isEmpty()
    // ] 
    ], 
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
    
    try {
        const user = await (await User.findById(req.user.id)).isSelected('-password');

        const newPendingMaintenance = new PendingMaintenance({
            maintenanceType: req.body.maintenanceType,
            date: req.body.date,
            notes: req.body.notes,
            user: req.user.id
        });

        const pendingMaintenance = await newPendingMaintenance.save();

        res.json(pendingMaintenance);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
    
    
});

// @route GET api/pendingmaintenance
// @desc Get all pending maintenance
// @access Private
router.get('/', auth, async (req, res) => {
    try {
        const pendingMaintenance = await PendingMaintenance.find().sort({ date: -1 });
        res.json(pendingMaintenance)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router;