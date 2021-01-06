const express = require('express');
const router = express.Router();
const albums_controller = require('../controllers/albums');
const album_auth = require('../middlewares/new_album_auth');
const update_album_auth = require('../middlewares/album_update_auth');
const access_auth = require('../middlewares/access_auth');
/* -------------- albums ------------ */
router.get('/api/albums', albums_controller.get_albums);
router.post('/api/album', [album_auth, access_auth], albums_controller.new_album);
router.delete('/api/album', access_auth, albums_controller.delete_album);
router.put('/api/album', [update_album_auth, access_auth], albums_controller.update_album);

module.exports = router;