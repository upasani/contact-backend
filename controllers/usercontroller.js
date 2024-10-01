
// @desc register user
// route POST /api/users/register
// public access

const User = require('../model/userModel'),
    bcrypt = require('bcrypt'),
    jwt = require('jsonwebtoken')

const Register = async (req, res) => {
    const {
        name,
        email,
        password
    } = req.body;


    if (!name || !email || !password) {
        res.status(400).json({
            error: "All fields are mandotary"
        })
        return;
    }
    // res.status(200).json({
    //     msg:"user registered succesfully"
    // })
    const findUser = await User.findOne({ email });
    if (findUser) {
        res.status(400).json({
            error: "email is already register"
        })
        return
    }
    const hashPassword = await bcrypt.hash(password, 10);
    // console.log("the hashpassword is",hashPassword);
    const user = await User.create({
        name,
        email,
        password: hashPassword
    })
    console.log("the user is", user);


    res.status(201).json({
        msg: "User register succesfully",
        email,
        id: user._id
    })

}

// @desc login user
// route POST /api/users/login
// public access

const Login = async (req, res) => {

    try {
        const {
            email,
            password
        } = req.body;

        if (!email || !password) {
            throw new Error("email and password are mandotary")
        }

        const user = await User.findOne({ email }),
            passwordMatch = await bcrypt.compare(password, user.password);
        // console.log("the user is",user);
        // if()
        if (!passwordMatch) {
            throw new Error("Password don't match");
        }
        //means if we find user and password also mathes then we have to send the acccessToken
        if (user && passwordMatch) {
            const acccessToken = jwt.sign({
                user: {
                    username: user.name,
                    email: user.email,
                    id: user._id
                }
            },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "15m" }
            )
            res.json({ acccessToken })
        }

    } catch (err) {
        console.log("the error is",err);
        res.status(400).json({
            error: err.message
        })
    }

}

// @desc register user
// route POST /api/users/currentuser
// private access --> only those user can access the route which has the login


const CurrentUser = async (req, res) => {
    console.log("the request user is",req.user);

    res.send(req.user)
    // let token;
    // let authHeader = req.headers.Authorization || req.headers.authorization;
    // if (authHeader && authHeader.startsWith("Bearer")) {
    //     token = authHeader.split(" ")[1];
    //     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
    //         if (err) {
    //             res.status(401).send({ msg: "Token is expired" });
    //             return;
    //         }
    //     })
    // } else {
    //     res.status(402).send({ msg: "something went wrong" })
    // }

}

const forgotPassword = async(req,res) => {
    
}


module.exports = {
    Register,
    Login,
    CurrentUser
}