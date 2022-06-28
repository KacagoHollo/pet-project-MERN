const mongoose = require('mongoose');


const organizationSchema = new mongoose.Schema({
    org_id: {type: String, required: true},
    description: {type: String, required: true}, // empty string is enough
    help: {type: Boolean, required: true},
    availability: {type: Array, required: true},
    phone: {type: Array, required: true},
    email: {type: String},
    web: {type: String},
    address: {type: Array, required: true},
    national_park: {type: String, required: true},
    informationk: {type: String},
    admins: [{
        user_id: {type: mongoose.SchemaTypes.ObjectId, ref: "User"},
        email_hint: {type: String}
    } ]

})

const profileSchema = new mongoose.Schema({
    user_id: { type: String },
    organization: [organizationSchema],
    name: {type: String, required: true},
    title: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: Number, required: true},
    // document: {type: Image, required: true},
    confirmation: {type: Boolean, default: false}
});

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
    profile: [profileSchema], // empty list is default?
});

const User = mongoose.model("user", userSchema);
module.exports = User;