const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PlaylistSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    songs: [{
        type: Schema.Types.ObjectId,
        ref: 'Song'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Playlist', PlaylistSchema);