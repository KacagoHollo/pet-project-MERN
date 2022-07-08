const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true}, // empty string is enough
    help: {type:String, required: true},
    availability: {type: Array, required: true},
    phone: {type: Array, required: true},
    email: {type: String},
    web: {type: String},
    address: {type: Array},
    national_park: {type: String},
    information: {type: String},
    admins: [{
        user_id: {type: mongoose.SchemaTypes.ObjectId, ref: "User"},
        email_hint: {type: String}
    }]

})

const Organization = mongoose.model("organization", organizationSchema);
module.exports = Organization;