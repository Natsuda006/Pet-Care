const mongoose = require("mongoose");
const serviceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    detail: { type: String, required: true },
    price: { type: Number, required: true },
    cover: { type: String }, 
});
module.exports = mongoose.model("Service", serviceSchema);