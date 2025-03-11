const Playlist = require('../models/Playlist');

// Get all playlists
exports.getAllPlaylists = async (req, res) => {
    try {
        const playlists = await Playlist.find();
        res.status(200).json(playlists);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single playlist by ID
exports.getPlaylistById = async (req, res) => {
    try {
        const playlist = await Playlist.findById(req.params.id);
        if (!playlist) {
            return res.status(404).json({ message: 'Playlist not found' });
        }
        res.status(200).json(playlist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new playlist
exports.createPlaylist = async (req, res) => {
    const playlist = new Playlist({
        name: req.body.name,
        description: req.body.description,
        tracks: req.body.tracks
    });

    try {
        const newPlaylist = await playlist.save();
        res.status(201).json(newPlaylist);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update an existing playlist
exports.updatePlaylist = async (req, res) => {
    try {
        const playlist = await Playlist.findById(req.params.id);
        if (!playlist) {
            return res.status(404).json({ message: 'Playlist not found' });
        }

        playlist.name = req.body.name || playlist.name;
        playlist.description = req.body.description || playlist.description;
        playlist.tracks = req.body.tracks || playlist.tracks;

        const updatedPlaylist = await playlist.save();
        res.status(200).json(updatedPlaylist);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a playlist
exports.deletePlaylist = async (req, res) => {
    try {
        const playlist = await Playlist.findById(req.params.id);
        if (!playlist) {
            return res.status(404).json({ message: 'Playlist not found' });
        }

        await playlist.remove();
        res.status(200).json({ message: 'Playlist deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};