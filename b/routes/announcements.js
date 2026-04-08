const express = require('express');
const router = express.Router();
router.get('/', (req, res) => res.json({ message: 'Announcements feature coming soon' }));
module.exports = router;
