const express = require('express');
const router = express.Router();
const Owner = require('../models/Owner');

router.get('/', (req, res) => {
  res.json('GET')
})

router.post('/', (req, res) => {
  const { firstname, email, mobile, address } = req.body.owner;
  
      const owner = new Owner({
        firstname,
        email,
        mobile,
        address
      });
    owner.save()
    .then(owner => console.log('Owner created'))
    .catch(err => console.log(err))
})

module.exports = router;