const express = require('express');
const router = express.Router();
router.get('/', (req, res) => res.json({ message: 'Documents feature coming soon' }));
module.exports = router;
