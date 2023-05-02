const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const token = req.headers.authorization
    try {
        const decoded = jwt.verify(token.split(" ")[1], 'key')
        if(decoded) {
            req.body.userID = decoded.userID
            req.body.user = decoded.user
            next();
        }  else {
            res.status(200).json({"err": err.message})
        }

    }catch(err) {
        res.status(400).json({"msg": "Please Login"})
    }
}

module.exports = {
    auth
}