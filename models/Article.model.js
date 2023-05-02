const mongoose = require("mongoose")

const articleSchema = mongoose.Schema({
    title:{type: String , required: true},
    body: {type: String , required: true},
    user:{type: String , required: true},
    userID:{type: String , required: true},
    category:{type: String , required: true},
    live:{type: Boolean , required: true},
})

const ArticleModel = mongoose.model('article', articleSchema);

module.exports = {
    ArticleModel
}