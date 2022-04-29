const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fileSchema = new Schema({
    name: String,
    path: String,
    type: String,
    size: String,
}, {
    timestamps: true,
});

module.exports = mongoose.model("File", fileSchema);