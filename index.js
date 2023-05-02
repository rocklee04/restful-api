const express = require("express");
const {connection} = require('./db')
const {userRouter} = require('./routes/User.route');
const {auth} = require('./middlewares/auth')
const { articleRouter } = require("./routes/Article.route");
const {tracker} = require("./middlewares/tracker")
require('dotenv').config();
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require("swagger-ui-express")
const app = express();

app.use(express.json())
app.use(tracker)


const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Restful API for bloggers',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.js'], 
};

const specification = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specification))
app.use("/users", userRouter)

app.use(auth)
app.use('/articles', articleRouter)


app.listen(process.env.port, async() => {
    try {
        await connection;
        console.log("connected to db")
    } catch(err) {
        console.log(err);
        console.log("cannot connected to db");
    }
    console.log(`Server is running at port ${process.env.port}`)
})