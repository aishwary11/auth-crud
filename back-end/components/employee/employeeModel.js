const mongoose = require('mongoose')
const Schema = mongoose.Schema

let employeeSchema = new Schema({
    name: { type: String },
    id: { type: String },
    salary: { type: String },
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})

module.exports = mongoose.model("employee", employeeSchema)