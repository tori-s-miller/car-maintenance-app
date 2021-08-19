const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');


// @route POST api/account/pendingmaintenance
// @desc Create pending maintenance
// @access Private

router.post('/pendingmaintenance', [ auth, 
    [
        check('maintenanceType', 'maintenanceType is required')
            .not()
            .isEmpty(),
        check('date', 'Date is required')
            .not()
            .isEmpty()
    ] 
    ], 
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            maintenanceType,
            date,
            notes,
            itemID
        } = req.body;

        const newPendingMaintenance = {
            maintenanceType,
            date,
            notes,
            itemID
        }
    
    try {
        const id = req.user.id;
        const user = await User.findOne({ _id: id });

        user.pendingMaintenance.push(newPendingMaintenance);

        await user.save();

        res.json(user);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
    
    
});

// @route GET api/account/pendingmaintenance
// @desc Get all pending maintenance
// @access Private
router.get('/pendingmaintenance', auth, async (req, res) => {
    try {
        const id = req.user.id;
        const pendingMaintenance = await User.findOne({ _id: id }).sort({ date: -1 });
        res.json(pendingMaintenance)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route DELETE api/account/pendingmaintenance/:id
// @desc Delete a pending maintenance item
// @access Private
router.delete('/pendingmaintenance/:id', auth, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user.id });
        const removeIndex = user.pendingMaintenance.map(item => item._id).indexOf(req.params.id);
        user.pendingMaintenance.splice(removeIndex, 1);

        await user.save();

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route GET api/account/completedmaintenance
// @desc Get all completed maintenance
// @access Private
router.get('/completedmaintenance', auth, async (req, res) => {
    try {
        const id = req.user.id;
        const completedMaintenance = await User.findOne({ _id: id }).sort({ date: -1 });
        res.json(completedMaintenance)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route POST api/account/completedmaintenance
// @desc Create completed maintenance
// @access Private

router.post('/completedmaintenance', [ auth, 
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

        const {
            maintenanceType,
            date,
            notes
        } = req.body;

        const newCompletedMaintenance = {
            maintenanceType,
            date,
            notes 
        }
    
    try {
        const id = req.user.id;
        const user = await User.findOne({ _id: id });

        user.completedMaintenance.push(newCompletedMaintenance);

        await user.save();

        res.json(user);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route DELETE api/account/completedmaintenance/:id
// @desc Delete a completed maintenance item
// @access Private
router.delete('/completedmaintenance/:id', auth, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user.id });

        // Get remove index
        const removeIndex = user.completedMaintenance.map(item => item._id).indexOf(req.params.id);
        console.log('removeIndex:', removeIndex);

        // // splicing out the index
        user.completedMaintenance.splice(removeIndex, 1);
        console.log('delete user after splice:', user)


        await user.save();

        res.json(user);
        

        // Check user
        // if(pendingMaintenance.user.toString() !== req.user.id) {
        //     return res.status(401).json({ msg: 'User not authorized' });
        // }

        // await pendingMaintenance.remove();

        // res.json({ msg: 'Post removed' });
    } catch (err) {
        console.error(err.message);

        // if(err.kind === 'ObjectId') {
        //     return res.status(404).json({ msg: 'Pending Maintenance item not found' })
        // }

        res.status(500).send('Server Error');
    }
});


module.exports = router;