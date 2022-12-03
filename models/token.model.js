const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now(),
        expires: 3600
    }
});

module.exports = mongoose.model('Token', tokenSchema);