"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const songs_controller_1 = require("../controllers/songs.controller");
const router = (0, express_1.Router)();
router.post('/', songs_controller_1.createSong);
router.get('/', songs_controller_1.getSongs);
exports.default = router;
