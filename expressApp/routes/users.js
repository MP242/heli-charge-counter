var express = require('express');
var router = express.Router();
const userCtrl = require('../controllers/userCtrl');

/* GET users listing. */
router.get('/', userCtrl.allUsers);

/* CREATE one user */
router.post('/', userCtrl.createUser);

/* READ one user */
router.get('/:id', userCtrl.getOneUser);

/* UPDATE one user */
router.put('/:id', userCtrl.updateUser);

/* DELETE one user */
router.delete('/:id', userCtrl.deleteUser);

module.exports = router;
