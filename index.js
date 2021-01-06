require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
/* ---------- router --------- */
const index_router = require('./routes/index')
const artist_router = require('./routes/artists_router');
const album_router = require('./routes/albums_router');
const music_router = require('./routes/musics_router');
const users_router = require('./routes/users_router');
app.use('/', index_router);
app.use('/', artist_router);
app.use('/', album_router);
app.use('/', music_router);
app.use('/', users_router);

app.listen(process.env.SERVER_PORT, () => {
  console.log("Server initialized :)");
});