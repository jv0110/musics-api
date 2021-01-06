const express = require('express');
const router = express.Router();
const artists_controller = require('../controllers/artist');
const artist_auth = require('../middlewares/new_artist_auth');
const access_auth = require('../middlewares/access_auth');

/* -------------- artists ------------- */
router.get('/api/artists', artists_controller.get_artists);
router.get('/api/artist/:slug', artists_controller.get_artist_by_name);
router.post('/api/artist/new_artist', [artist_auth, access_auth], artists_controller.new_artist);
router.put('/api/artist/update', [artist_auth, access_auth], artists_controller.update_artist);
router.delete('/api/artist/:slug', access_auth, artists_controller.delete_artist);

module.exports = router;