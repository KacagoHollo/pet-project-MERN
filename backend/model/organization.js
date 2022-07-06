const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
    org_id: {type: String, required: true},
    name: {type: String, required: true},
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
    }]

})

const Organization = mongoose.model("organization", organizationSchema);
module.exports = Organization;