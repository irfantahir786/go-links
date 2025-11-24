const db = require('../db/config');
const { generateToken, verifyToken } = require('../utils/jwt');


const loginUser = async (req, res) => {
    const { email, password } = req.body
    if (!password || !email) {
        return res.status(408).send({
            status: "fail",
            message: "params missing",
        })
    }


    try {
        const pool = db()
        const emailExist = await pool.query("SELECT * FROM users WHERE email=$1", [email])
        if (emailExist.rowCount === 0) {
            return res.status(409).send({
                status: "fail",
                message: "Invalid Email or password",
            })

        }
        const dbPass = emailExist.rows[0].password
        if (password != dbPass) {
            return res.status(409).send({
                status: "fail",
                message: "Invalid Email or password",
            })

        }
        const tokenPayload = {
            id: emailExist.rows[0].id,
            email: emailExist.rows[0].email
        }
        const token = generateToken(tokenPayload)
        res.cookie("token", token)
        return res.status(200).json({
            status: "ok",
            message: "Login Success",
            token: token
        })



    } catch (error) {
        return res.status(500).send({
            status: "fail",
            message: "Server side error",
        })
    }



};

const registerUser = async (req, res) => {
    const { name, email, password } = req.body
    if (!name || !password || !email) {
        return res.status(408).send({
            status: "fail",
            message: "params missing",
        })
    }
    try {
        const pool = db()
        const emailExist = await pool.query("SELECT * FROM users WHERE email=$1", [email])
        if (emailExist.rowCount !== 0) {
            return res.status(409).send({
                status: "fail",
                message: "email already exists",
            })
        }
        // proceed sign up
        const user = await pool.query("INSERT INTO users (name, email, password, created_at, updated_at) VALUES ($1, $2, $3, NOW(), NOW()) RETURNING *", [name, email, password])
        if (user.rowCount === 0) {
            return res.status(409).send({
                status: "fail",
                message: "Failed to singup",
            })
        }

        const tokenPayload = {
            id: user.rows[0].id,
            email: user.rows[0].email
        }
        const token = generateToken(tokenPayload)
        res.cookie("token", token)
        res.status(201).json({
            status: "ok",
            user: user.rows[0],
            token: token
        })


    } catch (error) {
        return res.status(500).send({
            status: "fail",
            message: "Server side error",
        })
    }
}


const makeToken = async (req, res) => {
    const user = {
        user: "email@gmail.com"
    }
    const token = generateToken(user)
    const tokenNew = verifyToken(token)
    res.cookie("token", token)
    res.json({ token: token, data: tokenNew })
}

module.exports = {
    loginUser, registerUser, makeToken
}