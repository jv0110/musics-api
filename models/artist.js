const db = require('../database/database');

exports.get_artists = async () => {
  try{
    return await db
    .select(['artists.artist_id', 'artist_name', 'artist_genre',
    'albums.album_id', 'album_name', 'album_genre',
    'musics.music_id', 'music_title'])
    .from('artists')
    .options({ nestTables: true })
    .innerJoin('albums', 'artists.artist_id', 'albums.artist_id')
    .innerJoin('musics', 'albums.album_id', 'musics.album_id');
  }catch(err){
    console.log("DB error:", err);
  }
}
exports.get_artist_by_name = async (slug) => {
  try{
    return await db
    .select(['artists.artist_id', 'artist_name', 'artist_genre'])
    .from('artists')
    .where({ slug });
  }catch(err){
    console.log("DB error(ARTIST TABLE): ", err);
  }
}
exports.new_artist = async (data) => {
  try{
    return await db
    .insert(data)
    .into('artists');
  }catch(err){
    console.log("DB error(ARTIST TABLE): ", err);
  }
}
exports.delete_artist = async (slug) => {
  try{
    if(isNaN(slug)){
      return await db
      .table('artists')
      .where({ slug })
      .del();
    }else{
      return await db
      .table('artists')
      .where({ artist_id: slug })
      .del();
    }
  }catch(err){
    console.log("DB error(ARTIST TABLE): ", err);
  }
}
exports.update_artist = async(data, artist_id) => {
  try{
    return await db
    .table('artists')
    .update(data)
    .where({ artist_id });
  }catch(err){
    console.log("DB error(ARTIST TABLE): ", err);
  }
}