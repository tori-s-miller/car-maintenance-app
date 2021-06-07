const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Account = require('../../models/Account');
const User = require('../../models/User');


// @route POST api/account/pendingmaintenance
// @desc Create pending maintenance
// @access Private

router.post('/pendingmaintenance', [ auth, 
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

        console.log('pending maintenance req.body:', req.body);

        const {
            maintenanceType,
            date,
            notes
        } = req.body;

        const newPendingMaintenance = {
            maintenanceType,
            date,
            notes 
        }
    
    try {
        console.log('try block req.user:', req.user)
        console.log('try block req.user.id:', req.user.id)
        const account = await Account.findOne({ user: req.user.id });
        console.log('pendingmaintenancde account:', account)

        account.pendingmaintenance.push(newPendingMaintenance);

        await account.save();

        res.json(account);

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