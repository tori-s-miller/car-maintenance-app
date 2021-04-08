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
});

// @route GET api/pendingmaintenance/:id
// @desc Get a pending maintenance item by id
// @access Private
router.get('/:id', auth, async (req, res) => {
    try {
        const pendingMaintenance = await PendingMaintenance.findById(req.params.id);
        
        if(!pendingMaintenance) {
            return res.status(404).json({ msg: 'Pending Maintenance item not found' })
        }
        
        res.json(pendingMaintenance)
    } catch (err) {
        console.error(err.message);

        if(err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Pending Maintenance item not found' })
        }

        res.status(500).send('Server Error');
    }
});

// @route DELETE api/pendingmaintenance/:id
// @desc Delete a pending maintenance item
// @access Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const pendingMaintenance = await PendingMaintenance.findById(req.params.id);

        if(!pendingMaintenance) {
            return res.status(404).json({ msg: 'Pending Maintenance item not found' })
        }

        // Check user
        if(pendingMaintenance.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        await pendingMaintenance.remove();

        res.json({ msg: 'Post removed' });
    } catch (err) {
        console.error(err.message);

        if(err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Pending Maintenance item not found' })
        }

        res.status(500).send('Server Error');
    }
});

module.exports = router;