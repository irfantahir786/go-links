const db = require('../db/config')

const loginUser = async (req, res) => {
    const { email, password } = req.body
    console.log(password)
    if (!password || !email) {
        console.log("params not passed")
    }
    console.log(email, password)
};

module.exports = {
    loginUser
}