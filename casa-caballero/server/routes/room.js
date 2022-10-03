const express = require('express');
const router = express.Router();
const controller = require('../controllers/room.controller');

// HTTP METHODS FOR ROOM
router.get('/',controller.getRooms)

module.exports = router;