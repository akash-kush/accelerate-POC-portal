const router = require('express').Router();

router.get('/', (req, res)=> {
    res.status(400).json("demo")
})

module.exports = router;