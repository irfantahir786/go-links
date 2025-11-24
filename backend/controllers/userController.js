const db = require('../db/config')


const profile = async (req, res) => {
    const token = req.token
    const userId = req.userId

    res.send(token)
};

module.exports = {
    profile
}