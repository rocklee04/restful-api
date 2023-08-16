const mongoose = require("mongoose");
require('dotenv').config();
const mongoURL = process.env.mongoURL || 'mongodb+srv://rmonishaverma:light@cluster0.wxw8yls.mongodb.net/blogDB?retryWrites=true&w=majority'

const connection = mongoose.connect(mongoURL);


module.exports = {
    connection
}