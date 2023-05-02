const fs = require("fs");

const tracker = (req, res, next) => {

    const {method, url} = req;
    const msg = `Method: ${method}, Route: ${url} Date: ${new Date()}\n`
    fs.appendFile("logs.txt", msg, (err) => {
        if(err) {
            console.log(err);
        }
       
    });
    next();
}

module.exports ={
    tracker
}