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
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        console.log('post pendingmaintenance req.body:', req.body)

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
    console.log('get pendingmaintenance ran')
    try {
        const id = req.user.id;
        const pendingMaintenance = await User.findOne({ _id: id }).sort({ date: -1 });
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

// @route DELETE api/account/pendingmaintenance/:id
// @desc Delete a pending maintenance item
// @access Private
router.delete('/pendingmaintenance/:id', auth, async (req, res) => {
    console.log('pendingmaintenance delete route ran')
    try {
        const id = req.user.id;
        const user = await User.findOne({ _id: id });
        // const pendingMaintenance = await PendingMaintenance.findById(req.params.id);
        console.log('pending maintenance delete user:', user)

        if(!user) {
            return res.status(404).json({ msg: 'Pending Maintenance item not found' })
        }

        // Check user
        // if(pendingMaintenance.user.toString() !== req.user.id) {
        //     return res.status(401).json({ msg: 'User not authorized' });
        // }

        // await pendingMaintenance.remove();

        res.json({ msg: 'Post removed' });
    } catch (err) {
        console.error(err.message);

        if(err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Pending Maintenance item not found' })
        }

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


module.exports = router;