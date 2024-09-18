const mongose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    Date: {
        type: Date,
        dafault: Date.now,
    }
});

UserSchema.pre("save", function(next) {
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

module.exports = mongose.model("User", UserSchema);