const mongoose = require('mongoose');


// const profileSchema = new mongoose.Schema({
    
// });

const userSchema = new mongoose.Schema({
    username: {type: String}, 

    providers: {
        google: {
            type: String,
            sparse: true,
            unique: true
        }
    },
    // password: {type: String, required: true}, // validation
    // profile: [profileSchema], // empty list is default?
    user_id: { type: String },
    // organization: [organizationSchema],
    name: {type: String},
    title: {type: String},
    email: {type: String},
    phone: {type: Number},
    confirmation: {type: Boolean, default: false}
});

const User = mongoose.model("user", userSchema);
module.exports = User;