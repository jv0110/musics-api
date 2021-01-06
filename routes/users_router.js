const express = require('express');
const router = express.Router();
const users_controller = require('../controllers/users');
const new_user_auth = require('../middlewares/new_user_auth');
const sign_in_auth = require('../middlewares/sign_in_auth');
const access_auth = require('../middlewares/access_auth');

router.get('/api/users', access_auth, users_controller.get_user);
router.post('/api/user', [new_user_auth, access_auth], users_controller.new_user);
router.post('/api/user/sign_in', sign_in_auth, users_controller.sign_in);
router.delete('/api/user', access_auth, users_controller.delete_user);
router.put('/api/user', access_auth, users_controller.update_user);

module.exports = router;