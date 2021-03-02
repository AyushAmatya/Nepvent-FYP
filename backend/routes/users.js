const router = require('express').Router();
let User = require('../models/user.model');

router.route('/getPassword/:userName').get((req, res) => {
    User.find({"userName":req.params.userName},{"password" : 1})
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const firstName = req.body.firstName;
    const middleName = req.body.middleName;
    const lastName = req.body.lastName;
    const country = req.body.country;
    const address = req.body.address;
    const contactNumber = req.body.contactNumber;
    const email = req.body.email;
    const userName = req.body.userName;
    const password = req.body.password;

    const newUser = new User({firstName, middleName, lastName, country, address, contactNumber, email, userName, password});

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req,res) => {
    User.findById(req.params.id)
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: '+err));
});

router.route('/:id').delete((req,res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('User deleted.'))
        .catch(err=>res.status(400).json('Error: ' + err));
});



router.route('/update/:id').post((req,res)=>{
    User.findById(req.params.id)
        .then(users => {
            users.firstName = req.body.firstName;
            users.middleName = req.body.middleName;
            users.lastName = req.body.lastName;
            users.country = req.body.country;
            users.address = req.body.address;
            users.contactNumber = req.body.contactNumber;
            users.userName = req.body.userName;
            users.email = req.body.email;
            users.password = req.body.password;

            users.save()
                .then(() => res.json('User updated!!'))
                .catch(err => res.status(400).json('Error: '+ err));
        })
        .catch(err => res.status(400).json('Error: '+ err));
});

module.exports = router;