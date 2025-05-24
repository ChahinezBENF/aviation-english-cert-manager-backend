const express = require('express');
const router = express.Router();
const userController = require('./userLogic');
const authenticateToken = require('../middleware/authenticateToken');
const authorizeRoles = require('../middleware/authorizeRoles');


// Routes for users with author in enabled
router.get('/', authenticateToken, authorizeRoles('hr'),userController.getAllUsers);
router.post('/', authenticateToken, authorizeRoles('hr'), userController.createUser);
router.get('/:id', authenticateToken, userController.getUserById);
router.put('/:id', authenticateToken, authorizeRoles('hr'), userController.updateUser);
router.delete('/:id', authenticateToken, authorizeRoles('hr'),userController.deleteUser);

//test routes
router.post('/:id/schedule', authenticateToken, userController.addTestToSchedule);
router.delete('/:id/schedule/:testId', authenticateToken, userController.cancelScheduledTest);

// Routes for users without author
// router.get('/', userController.getAllUsers);
// router.post('/',  userController.createUser);
// router.get('/:id',  userController.getUserById);
// router.put('/:id',  userController.updateUser);
// router.delete('/:id', userController.deleteUser);



module.exports = router;
