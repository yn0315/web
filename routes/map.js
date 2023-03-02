const express = require('express');
const fs = require('fs');

const router = express.Router();
router.get('/'), (req, res) => {
    // fs.readFile('../public/map.html');
    console.log('send');    
}


module.exports = router;