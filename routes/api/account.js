const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

// const Account = require('../../models/Account');
const User = require('../../models/User');


// @route   POST api/account
// @desc    Create user account
// @access  Private
router.post('/', [ auth ], 
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // const {
        //     dogName
        // } = req.body;

        // Build account object
        const accountFields = {};
        accountFields.user = req.user.id;
        // if(dogName) profileFields.dogName = dogName;

        try {
            let account = await Account.findOne({ user: req.user.id });

            // Create account
            account = new Account(accountFields);

            await account.save();
            res.json(account);
        } catch(err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
)


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
        console.log('ACCOUNT PENDINGMAINTENANCE POST RAN')
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
        console.log('try block req.body:', req.body)
        // console.log('try block req:', req)
        console.log('try block req.user:', req.user)
        console.log('try block req.user.id:', req.user.id)
        console.log('try block User:', User)
        const id = req.user.id;
        console.log('destructured id:', id)
        const user = await User.findOne({ _id: id });
        // const user = await User.findById({ user: req.user.id });
        console.log('pendingmaintenancde user:', user)
        console.log('pendingmaintenancde user._id:', user._id)
        console.log('pendingmaintenancde newPendingMaintenance:', newPendingMaintenance)

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