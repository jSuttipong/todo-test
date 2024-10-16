const express = require('express');
const { getTasks } = require('../controllers/taskController');

const router = express.Router();

// Route to get all tasks
router.get('/getTasks', getTasks);

// // Route to create a new user
// router.post('/', createUser);

module.exports = router;