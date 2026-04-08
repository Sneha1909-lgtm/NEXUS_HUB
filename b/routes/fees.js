const express = require('express');
const router = express.Router();
router.get('/', (req, res) => res.json({ message: 'Fees feature coming soon' }));
module.exports = router;
