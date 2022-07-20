const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username: {type: String}, 

    providers: {
        google: {
            type: String,
            sparse: true,
            unique: true
        }
    },
    name: {type: String},
    title: {type: String},
    email: {type: String},
    phone: {type: String},
    // confirmation: {type: Boolean, default: false}
});

const User = mongoose.model("user", userSchema);
module.exports = User;