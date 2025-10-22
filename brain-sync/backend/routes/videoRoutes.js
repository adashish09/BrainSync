const express = require('express');
const router = express.Router();
const {
  getAllVideos,
  getVideoById,
  createVideo,
  deleteVideo,
  getVideosByCategory
} = require('../controllers/videoController');

// GET /api/videos - Get all videos
router.get('/', getAllVideos);

// GET /api/videos/category/:category - Get videos by category
router.get('/category/:category', getVideosByCategory);

// GET /api/videos/:id - Get single video
router.get('/:id', getVideoById);

// POST /api/videos - Create new video
router.post('/', createVideo);

// DELETE /api/videos/:id - Delete video
router.delete('/:id', deleteVideo);

module.exports = router;