const express = require('express')

const Users = require('./userDb')

const router = express.Router();

router.get('/',(req, res) => {
    Users.get()
    .then(users => {
        res.status(200).json(users);
    })
})

module.exports = router;