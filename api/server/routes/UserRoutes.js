const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.put('/profile/:id', UserController.updateProfil);
// router.delete('/profile/:id', UserController.register);
module.exports = router;
