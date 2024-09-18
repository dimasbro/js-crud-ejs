const mongose = require('mongoose');

const MovieSchema = new mongose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    released_on: {
        type: String,
        required: true,
        trim: true
    }
});

module.exports = mongose.model("Movie", MovieSchema);