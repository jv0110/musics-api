const db = require('../database/database');

exports.get_musics = async () => {
  try{
    return await db
    .select(['music_id', 'music_title'])
    .from('musics');
  }catch(err){
    console.log("DB error(musics table): ", err);
  }
}
exports.get_music = async (slug) => {
  try{
    return await db
    .select(['musics.music_id', 'music_title'])
    .from('musics')
    .where({ slug })
  }catch(err){
    console.log("DB error(musics table): ", err);
  }
}
exports.delete_music = async (music_id) => {
  try{
    if(isNaN(music_id)){
      return await db
      .table('musics')
      .where({ slug: music_id })
      .del();
    }else{
      return await db
      .table('musics')
      .where({ music_id })
      .del();
    }
  }catch(err){
    console.log("DB error(musics table): ", err);
  }
}
exports.new_music = async (data) => {
  try{
    return await db
    .insert(data)
    .into('musics');
  }catch(err){
    console.log("DB error(musics table): ", err);
  }
}
exports.update_music = async (music_id, data) => {
  try{
    return await db
    .table('musics')
    .update(data)
    .where({ music_id });
  }catch(err){
    console.log("DB error(musics table): ", err);
  }
}