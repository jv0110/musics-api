const db = require('../database/database');

exports.get_albums = async () => {
  try{
    return await db
    .select(['albums.album_id', 'album_name', 'album_genre', 'albums.artist_id'])
    .from('albums');
  }catch(err){
    console.log("DB error(ALBUMS TABLE): ", err);
  }
}
exports.albums_join_artist = async (artist_id) => {
  try{
    return await db
    .select(['albums.album_id', 'album_name', 'album_genre'])
    .from('albums')
    .where({ artist_id });
  }catch(err){
    console.log("DB error(ALBUMS TABLE): ", err);
  }
}
exports.get_album = async(album_id) => {
  try{
    if(isNaN(album_id)){
      return await db
      .select(['albums.album_id', 'album_name', 'album_genre'])
      .from('albums')
      .where({ slug: album_id });
    }else{
      return await db
      .select(['albums.album_id', 'album_name', 'album_genre'])
      .from('albums')
      .where({ album_id });
    }
  }catch(err){
    console.log("DB error(ALBUMS TABLE): ", err);
  }
}
exports.new_album = async(data) => {
  try{
    return await db
    .insert(data)
    .into('albums');
  }catch(err){
    console.log("DB error(ALBUMS TABLE): ", err);
  }
}
exports.delete_album = async(album_id) => {
  try{
    if(isNaN(album_id)){
      return await db
      .table('albums')
      .where({ slug: album_id })
      .del();
    }else{
      return await db
      .table('albums')
      .where({ album_id })
      .del();
    }
  }catch(err){
    console.log("DB error(ALBUMS TABLE): ", err);
  }
}
exports.update_album = async (album_id, new_data) => {
  try{
    return await db
    .table('albums')
    .update( new_data )
    .where({ album_id });
  }catch(err){
    console.log(err);
  }
}