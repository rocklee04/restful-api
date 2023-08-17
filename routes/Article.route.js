const express = require("express")

const {ArticleModel} = require("../models/Article.model")
const articleRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *      Article:
 *        type: object
 *        required:
 *          - title
 *          - body
 *          - category
 *          - live
 *        properties:
 *          _id:
 *             type: string
 *             description: The unique identifier for the user
 *          title:
 *             type: string
 *             description: The title of the article
 *          body:
 *             type: string
 *             description: The content of the article 
 *          category:
 *             type: string
 *             description: The category of the article
 *          live:
 *             type: boolean
 *             description: The blog is live or not
 */

/**
 * @swagger
 * tags:
 *  name: Article
 *  description: All the API routes of the articles
 */


/**
 * @swagger
 * /articles/add:
 *   post:
 *        summary: Added a new article
 *        tags: [Articles]
 *        responses:
 *            200:
 *                description: New article has been added.
 *            400:
 *                description: Anuthorized User        
 */
articleRouter.post("/add", async(req, res) => {
    try {
        const article = new ArticleModel(req.body)
        await article.save()
        res.status(200).json({"msg": "New article has been addded"})
    } catch(err) {
        res.status(400).json({"msg": err.message})
    }
})

/**
 * @swagger
 * /articles/:
 *   get:
 *        summary: To get all the article
 *        tags: [Articles]
 *        responses:
 *            200:
 *                description: Details of All the articles.
 *            400:
 *                description: Anuthorized User        
 */
articleRouter.get("/", async(req, res) => {
    try {
        const articles = await ArticleModel.find({userID: req.body.userID})
        res.status(200).json(articles)
    } catch(err) {
        res.status(400).json({"msg": err.message})
    }
})

articleRouter.get('/:id', async(req, res) => {
    const {id} = req.params;
    try {
        const article = await ArticleModel.findOne({_id: id});
        res.status(200).json(article)
    }catch(err) {
        res.status(400).json({"msg": err.message})
    }
})

/**
 * @swagger
 * /articles/edit/:
 *   get:
 *        summary: To get all the article
 *        tags: [Articles]
 *        responses:
 *            200:
 *                description: Details of All the articles.
 *            400:
 *                description: Anuthorized User        
 */
articleRouter.patch("/edit/:id", async(req, res) => {
    const {id} = req.params;
    const article = await ArticleModel.findOne({_id: id});
    try {
        if(req.body.userID !== article.userID) {
            res.status(200).json({"msg": "You are not an authorised user to this action"})
        }
        else {
            await ArticleModel.findByIdAndUpdate({_id: id}, req.body)
            res.status(200).json({"msg": "New article has been edited"})
        }
    } catch(err) {
        res.status(400).json({"msg": err.message})
    }
})

articleRouter.delete("/rem/:id", async(req, res) => {
    const {id} = req.params;
    const article = await ArticleModel.findOne({_id: id});
    try {
        if(req.body.userID !== article.userID) {
            res.status(200).json({"msg": "You are not an authorised user to this action"})
        }
        else {
            await ArticleModel.findByIdAndDelete({_id: id})
            res.status(200).json({"msg": "New article has been deleted"})
        }
    } catch(err) {
        res.status(400).json({"msg": err.message})
    }
})


module.exports = {
    articleRouter
}
