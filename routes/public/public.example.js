const router = require('express').Router();

router.get('/public', [], async (req, res) => {
    res.success({
        message: 'Public  Fetched'
    });
});

module.exports = router;
