const express = require('express');
const fs = require('fs');
const router = express.Router();
router.get('/'), (req, res) => {
    console.info("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    fs.readFile('../public/index.html');
    
}

module.exports = router;