const express = require('express');
const playlistController = require('../controllers/playlistController');

const router = express.Router();

// Get all playlists
router.get('/', playlistController.getAllPlaylists);

// Get a single playlist by ID
router.get('/:id', playlistController.getPlaylistById);

// Create a new playlist
router.post('/', playlistController.createPlaylist);

// Update a playlist by ID
router.put('/:id', playlistController.updatePlaylist);

// Delete a playlist by ID
router.delete('/:id', playlistController.deletePlaylist);

module.exports = router;