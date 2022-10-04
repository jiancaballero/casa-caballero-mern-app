const express = require('express');
const router = express.Router();
const controller = require('../controllers/room.controller');

// HTTP METHODS FOR ROOM
router.get('/rooms',controller.getRooms)
router.get('/category',controller.getRoomCategory)

module.exports = router;