const Photo = require("../models/Photo");
const User = require("../models/User");

const mongoose = require("mongoose");

const insertPhoto = async (req, res) => {
  const { title } = req.body;
  const image = req.file.filename;
  const reqUser = req.user;

  const user = await User.findById(reqUser._id);

  const newPhoto = await Photo.create({
    image,
    title,
    userId: user._id,
    userName: user.name,
  });

  if (!newPhoto) {
    res.status(422).json({
      errors: ["an error occurred please try again"],
    });
    return;
  }

  res.status(201).json(newPhoto);
};

const deletePhoto = async (req, res) => {
  const { id } = req.params;

  const reqUser = req.user;

  const photo = await Photo.findById(mongoose.Types.ObjectId(id));

  if (!photo) {
    res.status(404).json({ errors: ["Photo not found!"] });
    return;
  }

  if (!photo.userId.equals(reqUser._id)) {
    res.status(422).json({ errors: ["an error occurred please try again"] });
    return;
  }

  await Photo.findByIdAndDelete(photo._id);

  res
    .status(200)
    .json({ id: photo._id, message: "Photo successfully deleted" });
};

const getAllPhotos = async (req, res) => {
  const photos = await Photo.find({})
    .sort([["createdAt", -1]])
    .exec();

  return res.status(200).json(photos);
};

const getUserPhotos = async (req, res) => {
  const { id } = req.params;

  const photos = await Photo.find({ userId: id })
    .sort([["createdAt", -1]])
    .exec();

  return res.status(200).json(photos);
};

const getPhotoById = async (req, res) => {
  const { id } = req.params;

  const photo = await Photo.findById(mongoose.Types.ObjectId(id));

  if (!photo) {
    res.status(404).json({ errors: ["Photo not found!"] });
    return;
  }

  res.status(200).json(photo);
};

const updatePhoto = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  let image;

  if (req.file) {
    image = req.file.filename;
  }

  const reqUser = req.user;

  const photo = await Photo.findById(id);

  if (!photo) {
    res.status(404).json({ errors: ["Photo not found!"] });
    return;
  }

  if (!photo.userId.equals(reqUser._id)) {
    res
      .status(422)
      .json({ errors: ["an error occurred please try again"] });
    return;
  }

  if (title) {
    photo.title = title;
  }

  if (image) {
    photo.image = image;
  }

  await photo.save();

  res.status(200).json({ photo, message: "Photo successfully updated!"});
};

const likePhoto = async (req, res) => {
  const { id } = req.params;

  const reqUser = req.user;

  const photo = await Photo.findById(id);

  if (!photo) {
    res.status(404).json({ errors: ["Photo not found!"] });
    return;
  }

  if (photo.likes.includes(reqUser._id)) {
    res.status(422).json({ errors: ["You already liked the photo"] });
    return;
  }

  photo.likes.push(reqUser._id);

  await photo.save();

  res
    .status(200)
    .json({ photoId: id, userId: reqUser._id, message: "The photo was liked!" });
};

const commentPhoto = async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;

  const reqUser = req.user;

  const user = await User.findById(reqUser._id);

  const photo = await Photo.findById(id);

  if (!photo) {
    res.status(404).json({ errors: ["Photo not found!"] });
    return;
  }

  const userComment = {
    comment,
    userName: user.name,
    userImage: user.profileImage,
    userId: user._id,
  };

  photo.comments.push(userComment);

  await photo.save();

  res.status(200).json({
    comment: userComment,
    message: "Comment successfully added!",
  });
};

const searchPhotos = async (req, res) => {
  const { q } = req.query;

  const photos = await Photo.find({ title: new RegExp(q, "i") }).exec();

  res.status(200).json(photos);
};

module.exports = {
  insertPhoto,
  deletePhoto,
  updatePhoto,
  commentPhoto,
  likePhoto,
  getAllPhotos,
  getPhotoById,
  getUserPhotos,
  searchPhotos,
};
