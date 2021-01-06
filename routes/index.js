const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  return res.status(200).json({
    title: "Music API",
    version: "1.0"
  });
});
module.exports = router;