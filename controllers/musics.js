const musics_model = require('../models/musics');
const albums_model = require('../models/albums');
const slugify = require('slugify');

exports.get_musics = async(req, res) => {
  try{
    const musics = await musics_model.get_musics();
    if(!musics.length) return res.status(404).json("No musics found");

    return res.status(200).json(musics);
  }catch(err){
    console.log(err);
  }
}
exports.new_music = async(req, res) => {
  const data = {
    ...req.body,
    createdAt: new Date(),
    slug: slugify(req.body.music_title)
  }
  try{
    const album = await albums_model.get_album(slugify(data.album_name));
    if(!album) return res.status(404).json("No albums found...");

    delete data.album_name;
    data.album_id = album[0].album_id;

    const music = await musics_model.new_music(data);
    if(!music) return res.status(500).json("Error on adding the music");

    return res.status(200).json(music);
  }catch(err){
    console.log(err);
  }
}
exports.delete_music = async (req, res) => {
  const { music_title } = req.body;
  try{
    const music = await musics_model.delete_music(slugify(music_title));
    if(!music) return res.status(404).json("No musics found");
    
    return res.status(200).json("Music deleted");
  }catch(err){
    console.log(err);
  }
}
exports.update_music = async (req, res) => {
  const music_title = slugify(req.body.music_title);
  const new_data = {
    ...req.body.new,
    updatedAt: new Date()
  }
  if(new_data.music_title !== undefined)
    new_data.slug = slugify(new_data.music_title);

  try{
    const music = await musics_model.get_music(music_title);
    if(!music) return res.status(404).json("no music found");
    
    const update = await musics_model.update_music(music[0].music_id, new_data);
    if(!update) return res.status(500).json("Error on updating the music");

    return res.status(200).json(update);
  }catch(err){
    console.log(err);
  }
}