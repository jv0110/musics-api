const albums_model = require('../models/albums');
const artists_model = require('../models/artist');
const slugify = require("slugify");

exports.get_albums = async (req, res) => {
  try{
    const albums = await albums_model.get_albums();
    if(!albums.length) return res.status(404).json("No albums found");

    return res.status(200).json(albums);
  }catch(err){
    console.log(err);
  }
}
exports.new_album = async (req, res) => {
  let data = {
    ...req.body,
    createdAt: new Date()
  }
  try{
    const artist_slug = slugify(data.artist_name);
    const artist = await artists_model.get_artist_by_name(artist_slug);
    if(!artist.length) return res.status(404).json("Arist not found");

    delete data.artist_name;
    data = { 
      ...data, 
      artist_id: artist[0].artist_id, 
      slug: slugify(data.album_name) 
    };
    const album = await albums_model.new_album(data);
    if(!album) return res.status(500).json("Error on posting the new album");

    return res.status(200).json(album);
  }catch(err){
    console.log(err);
  }
}
exports.delete_album = async(req, res) => {
  const { album_name } = req.body;
  if(typeof album_name === 'undefined') return res.status(400).json("Please, confirm which album to delete...")
  try{
    const album = await albums_model.get_album(slugify(album_name));
    if(!album.length) return res.status(404).json("No users found");

    const album_del = await albums_model.delete_album(album[0].album_id);
    if(!album_del) return res.status(500).json("Error on deleting the album");

    return res.status(200).json("Album deleted :)");
  }catch(err){
    console.log(err);
  }
}
exports.update_album = async(req, res) => {
  const data = {
    album_name: req.body.album_name,
    slug: req.body.album_name,
  }
  const new_data = {
    ...req.body.new,
    updatedAt: new Date()
  }
  if(new_data.album_name !== undefined)
    new_data.slug = slugify(new_data.album_name);
  try{
    const album = await albums_model.get_album(data.slug);
    if(!album) return res.status(404).json("No album found");
    
    const update = await albums_model.update_album(album[0].album_id, new_data);
    if(!update) return res.status(404).json("Error on updating the album");
    
    return res.status(200).json(update);
  }catch(err){
    console.log(err);
  }
}