const express = require('express')
const router = express.Router();
router.post('/create', async (req, res) => {
    try {
        console.log(req.body);
    } catch (err) {
        return res.send({
            success: false,
            message: err.message
        })
    }
})

module.exports = router;