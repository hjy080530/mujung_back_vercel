"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const requireBssmEmail_1 = require("../auth/requireBssmEmail");
const songs_controller_1 = require("../controllers/songs.controller");
const router = (0, express_1.Router)();
router.post('/', requireBssmEmail_1.requireBssmEmail, songs_controller_1.createSong);
exports.default = router;
