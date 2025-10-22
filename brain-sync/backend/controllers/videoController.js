const Video = require('../models/Video');

// Get all videos
const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching videos', error: error.message });
  }
};

// Get single video
const getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    res.json(video);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching video', error: error.message });
  }
};

// Create new video
const createVideo = async (req, res) => {
  try {
    const { title, description, category, instructor, videoUrl, instructorId } = req.body;
    
    const video = new Video({
      title,
      description,
      category,
      instructor,
      videoUrl,
      instructorId
    });

    const savedVideo = await video.save();
    res.status(201).json(savedVideo);
  } catch (error) {
    res.status(500).json({ message: 'Error creating video', error: error.message });
  }
};

// Delete video
const deleteVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    await Video.findByIdAndDelete(req.params.id);
    res.json({ message: 'Video deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting video', error: error.message });
  }
};

// Get videos by category
const getVideosByCategory = async (req, res) => {
  try {
    const videos = await Video.find({ category: req.params.category }).sort({ createdAt: -1 });
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching videos by category', error: error.message });
  }
};

module.exports = {
  getAllVideos,
  getVideoById,
  createVideo,
  deleteVideo,
  getVideosByCategory
};