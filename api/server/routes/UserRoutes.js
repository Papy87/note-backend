const express = require('express');
const router = express.Router();
const guard = require('../middleware/guard');
const UserController = require('../controllers/UserController');


router.get('/user/:id', guard(), UserController.getUserProfil);
router.put('/user/:id', guard(), UserController.updateUserProfil);
router.put('/user/:id/password', guard(), UserController.updateUserPassword);
router.delete('/user/:id', guard(), UserController.deleteUser);
module.exports = router;
