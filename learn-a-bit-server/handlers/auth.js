const db = require("../models");
const jwt = require("jsonwebtoken");

exports.signup = async function (req, res, next) {
    try {
        let user = await db.User.create(req.body);
        let { id, username } = user;
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

exports.signin = async function (req, res, next) {
    try {
        let user = await db.User.findOne({
            username: req.body.username
        });
        let isMatch = await user.comparePassword(req.body.password);
        
        if (isMatch) {
            let { id, username } = user;
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
            })
        } else {
            return next({
                status: 400,
                message: "Incorrect password." // ? Is this always the case?
            })
        }
    } catch (err) {
        return next({
            status: 400,
            message: "User not found." // ? Is this always the case?
        })
    }
}