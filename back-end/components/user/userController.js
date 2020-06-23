const userModel = require('./usermodel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secretKey = 'hereisasecretkey'

let user = {}

user.register = (req, res) => {
    bcrypt.hash(req.body.password, 10).then(hash => {
        let registerData = new userModel({
            name: req.body.name,
            email: req.body.email,
            password: hash,
            birthdate: req.body.birthdate
        })
        console.log(registerData)
        registerData.save().then(response => {
            res.status(200).json({
                status: 'Save',
                result: response
            })
        }).catch(error => {
            res.status(400).json({
                status: 'Not save',
                result: error
            })
        })
    })
}

user.login = async (req, res) => {
    let loginUser = await userModel.findOne({
        email: req.body.email
    });
    console.log(loginUser)
    let pass1 = req.body.password;
    console.log(pass1)
    if (!loginUser) {
        res.status(400).json({
            result: 'No user found'
        })
    } else {
        let pass2 = loginUser.password;
        let isCorrect = await comparePassword(pass1, pass2);
        if (isCorrect) {
            const token = jwt.sign({
                email: loginUser.email
            }, secretKey, {
                expiresIn: '15m'
            })
            res.status(200).json({
                result: "Auth Successful",
                token
            })
        } else {
            res.status(400).json({
                result: 'wrong password'
            })
        }
    }
}

module.exports = user

function comparePassword(pass1, pass2) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(pass1, pass2, function (err, isMatch) {
            if (err) {
                return err;
            }
            return resolve(isMatch)
        });
    });
}
