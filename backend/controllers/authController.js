const db = require('../db/config')

const loginUser = async (req, res) => {
    const { email, password } = req.body
    if (!password || !email) {
        res.send("parameters missing")
        return
    }


    try {
        console.log("inside try")
        const pool = db()
        const emailExist = await pool.query("SELECT * FROM users WHERE email=$1", [email])
        if (emailExist.rowCount === 0) {
            res.send("email not found")
            return
        }
        // Email exist check for password

        const dbPass = emailExist.rows[0].password
        if(password != dbPass){
            res.send("Password not macthed")
            return
        }
        
        // EVerything is ok
        // Login user

          res.send("password matched")
          return


    } catch (error) {
        console.log("inside catch")
    }



};

const registerUser = async (req, res) =>{
     const { name, email, password } = req.body
     if (!name || !password || !email) {
        res.send("parameters missing")
        return
    }
}

module.exports = {
    loginUser, registerUser
}