import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const VideoContext = createContext();

export function useVideo() {
  return useContext(VideoContext);
}

export function VideoProvider({ children }) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_BASE_URL = 'http://localhost:5000/api';

  // Fetch all videos
  const fetchVideos = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/videos`);
      setVideos(response.data);
    } catch (err) {
      setError('Failed to fetch videos');
      console.error('Error fetching videos:', err);
    } finally {
      setLoading(false);
    }
  };

  // Add new video
  const addVideo = async (videoData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_BASE_URL}/videos`, videoData);
      setVideos(prevVideos => [response.data, ...prevVideos]);
      return response.data;
    } catch (err) {
      setError('Failed to add video');
      console.error('Error adding video:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete video
  const deleteVideo = async (videoId) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`${API_BASE_URL}/videos/${videoId}`);
      setVideos(prevVideos => prevVideos.filter(video => video._id !== videoId));
    } catch (err) {
      setError('Failed to delete video');
      console.error('Error deleting video:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Get videos by category
  const getVideosByCategory = async (category) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/videos/category/${category}`);
      return response.data;
    } catch (err) {
      setError('Failed to fetch videos by category');
      console.error('Error fetching videos by category:', err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Get single video
  const getVideoById = async (videoId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/videos/${videoId}`);
      return response.data;
    } catch (err) {
      setError('Failed to fetch video');
      console.error('Error fetching video:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const value = {
    videos,
    loading,
    error,
    fetchVideos,
    addVideo,
    deleteVideo,
    getVideosByCategory,
    getVideoById
  };

  return (
    <VideoContext.Provider value={value}>
      {children}
    </VideoContext.Provider>
  );
}