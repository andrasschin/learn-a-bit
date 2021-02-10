require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.ensureLogin = function (req, res, next) {
    try {
        let token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.SECRET_KEY,
            function (err, decoded) {
                if (decoded) {
                    return next();
                } else {
                    return next({
                        status: 401,
                        message: "Please log in first."
                    });
                }
            });
    } catch (err) {
        return next({
            status: 401,
            message: "Please log in first."
        });
    }
}

exports.ensureLoginAndCorrectUser = function (req, res, next) {
    try {
        let token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.SECRET_KEY,
            function (err, decoded) {
                if (decoded && decoded.id === req.params.user_id) {
                    return next();
                } 
                else if (decoded) {
                    return next({
                        status: 401,
                        message: "Unauthorized."
                    })
                }
                else {
                    return next({
                        status: 401,
                        message: "Please log in first."
                    });
                }
            }
        );
    } catch (err) {
        return next({
            status: 401,
            message: "Please log in first."
        });
    }
}