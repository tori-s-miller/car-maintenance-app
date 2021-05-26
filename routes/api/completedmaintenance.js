const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const auth = require('../../middleware/auth');

const CompletedMaintenance = require('../../models/CompletedMaintenance');
const User = require('../../models/User');


// @route POST api/completedmaintenance
// @desc Create completed maintenance
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

        const newCompletedMaintenance = new CompletedMaintenance({
            maintenanceType: req.body.maintenanceType,
            date: req.body.date,
            notes: req.body.notes,
            user: req.user.id
        });

        const completedMaintenance = await newCompletedMaintenance.save();

        res.json(completedMaintenance);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
    
    
});

// @route GET api/completedmaintenance
// @desc Get all completed maintenance
// @access Private
router.get('/', auth, async (req, res) => {
    try {
        const completedMaintenance = await CompletedMaintenance.find().sort({ date: -1 });
        res.json(completedMaintenance)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route GET api/completedmaintenance/:id
// @desc Get a completed maintenance item by id
// @access Private
router.get('/:id', auth, async (req, res) => {
    try {
        const completedMaintenance = await CompletedMaintenance.findById(req.params.id);
        
        if(!completedMaintenance) {
            return res.status(404).json({ msg: 'Completed Maintenance item not found' })
        }
        
        res.json(completedMaintenance)
    } catch (err) {
        console.error(err.message);

        if(err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Completed Maintenance item not found' })
        }

        res.status(500).send('Server Error');
    }
});

// @route DELETE api/completedmaintenance/:id
// @desc Delete a completed maintenance item
// @access Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const completedMaintenance = await CompletedMaintenance.findById(req.params.id);

        if(!completedMaintenance) {
            return res.status(404).json({ msg: 'Completed Maintenance item not found' })
        }

        // Check user
        if(completedMaintenance.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        await completedMaintenance.remove();

        res.json({ msg: 'Post removed' });
    } catch (err) {
        console.error(err.message);

        if(err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Completed Maintenance item not found' })
        }

        res.status(500).send('Server Error');
    }
});

module.exports = router;