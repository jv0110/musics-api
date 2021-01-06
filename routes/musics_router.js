const express = require('express');
const router = express.Router();
const musics_controller = require('../controllers/musics');
const new_music_auth = require('../middlewares/new_music_auth');
const music_update_auth = require('../middlewares/update_music_auth');
const access_auth = require('../middlewares/access_auth');

/* -------------- musics ------------ */
router.get('/api/musics', musics_controller.get_musics);
router.post('/api/music', [new_music_auth, access_auth], musics_controller.new_music);
router.delete('/api/music', access_auth, musics_controller.delete_music);
router.put('/api/music', [music_update_auth, access_auth], musics_controller.update_music);

module.exports = router;