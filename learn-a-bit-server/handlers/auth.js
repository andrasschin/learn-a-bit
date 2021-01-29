const db = require("../models");
const jwt = require("jsonwebtoken");

exports.signup = async function (req, res, next) {
    try {
        let userCreated = await db.User.create(req.body);
        let { id, username } = userCreated;
        let token = jwt.sign({
            id,
            username
        },
            process.env.SECRET_KEY
        )
        res.status(200).json({
            id,
            username,
            token
        });
    } catch (err) {
        if (err.code === 11000) {
                err.message = "Username is already taken."
        }
        return next({
            status: 400,
            message: err.message
        });
    }
}