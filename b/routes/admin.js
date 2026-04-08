const express = require('express');
const router = express.Router();
router.get('/', (req, res) => res.json({ message: 'Admin feature coming soon' }));
module.exports = router;
