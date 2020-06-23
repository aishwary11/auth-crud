const mongoose = require('mongoose')
const Schema = mongoose.Schema

let userSchema = new Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String },
    birthdate: { type: String },
}, {
    timestamps: { createdAt: 'createdAt', lastUpdated: 'lastUpdated' }
})

module.exports = mongoose.model("user", userSchema)