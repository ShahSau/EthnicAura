const express = require('express');
const { 
    createUser, loginUserCtrl, getallUser, getaUser, deleteaUser,
    updatedUser, blockUser, unblockUser, handleRefreshToken, logout
 } = require('../controller/userCtrl');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');


const router = express.Router();



router.post('/register', createUser);
router.post('/login', loginUserCtrl);
router.get('/all', getallUser);
router.get('/refreshToken', handleRefreshToken);
router.get('/logout', logout);
router.get('/:id', authMiddleware, isAdmin, getaUser);
router.post('/blockedUser/:id', authMiddleware, isAdmin, blockUser);
router.post('/unblockedUser/:id', authMiddleware, isAdmin, unblockUser);
router.delete('/:id', deleteaUser);
router.put('/update', updatedUser);


module.exports = router;