const artist_model = require('../models/artist');
const slugify = require('slugify');

exports.get_artists = async (req, res) => {
  try{
    const artists = await artist_model.get_artists();
    if(!artists.length) return res.status(404).json("No artists found");
    return res.status(200).json(artists);
  }catch(err){
    console.log(err);
  }
}
exports.get_artist_by_name = async(req, res) => {
  const { slug } = req.params;
  if(!slug) return res.status(400).json("Artist name required");
  try{
    const artist = await artist_model.get_artist_by_name(slug);
    if(!artist) return res.status(404).json("No artist found");

    return res.status(200).json(artist);
  }catch(err){
    console.log(err);
  }
}
exports.new_artist = async (req, res) => {
  const data = {
    ...req.body,
    slug: slugify(req.body.artist_name),
    createdAt: new Date()
  }
  try{
    const artist = await artist_model.new_artist(data);
    if(!artist) return res.status(400).json("Error on adding a new artist");

    return res.status(200).json(artist);
  }catch(err){
    console.log(err);
  }
}
exports.delete_artist = async (req, res) => {
  const { slug } = req.params;
  try{
    const artist = artist_model.delete_artist(slug);
    if(!artist) return res.status(404).json("No artist found");

    return res.status(200).json("Artist deleted :)");
  }catch(err){
    console.log(err);
  }
}
exports.update_artist = async (req, res) => {
  const data = {
    ...req.body,
    slug: slugify(req.body.artist_name),
    updatedAt: new Date()
  }
  try{
    const artist = await artist_model.get_artist_by_name(req.body.artist_name);
    if(!artist) return res.status(404).json("artist not found");

    const update = await artist_model.update_artist(data, artist[0].artist_id);
    if(!update) return res.status(500).json("Error on updating artist");

    return res.status(200).json(update);
  }catch(err){
    
  }
}