const express = require("express");
const {UserModel} = require("../models/User.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");


const userRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *      User:
 *        type: object
 *        required:
 *          - name
 *          - email
 *          - password
 *          - city
 *          - age
 *        properties:
 *          _id:
 *             type: string
 *             description: The unique identifier for the user
 *          name:
 *             type: string
 *             description: The name of the user 
 *          email:
 *             type: string
 *             description: The email of the user 
 *          password:
 *             type: string
 *             description: The password of the user 
 *          city:
 *             type: string
 *             description: The city of the user 
 *          age:
 *             type: integer
 *             description: The age of the user 
 */

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: All the API routes of the user
 */


/**
 * @swagger
 * /users/register:
 *  post:
 *       summary: To post the details of new user
 *       tags: [Users]
 *       responses:
 *           200:
 *               description: User has been successfully registered.
 *           400:
 *               description: An error occured while registering.      
 */
userRouter.post("/register", async (req, res) => {
    const {name, email, city, password, age} = req.body
    try{
        bcrypt.hash(password, 5, async (err, hash) => {
            const user = new UserModel({name, email, city, password: hash, age})
            await user.save();
            res.status(200).json({"msg": "New user has been registered"})
        })
    }catch(err){
        res.status(400).json({"msg": err.message})
    }
})


userRouter.post("/login", async(req, res) => {
    const {email, password} = req.body;
    try{
        const user = await UserModel.findOne({email})
        if(user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if(result) {
                    const token = jwt.sign({userID: user._id, user: user.name}, 'key');
                    res.status(200).json({"msg": "Login successfully", "token": token})
                }else {
                    res.status(200).json({"msg": "Wrong Credentials"})
                }
            })
        }else {
            res.status(200).json({"msg": "Wrong Credentials"})
        }
    } catch(err) {
        res.status(400).json({"msg": err.message}) 
    }
})

module.exports = {
    userRouter
}