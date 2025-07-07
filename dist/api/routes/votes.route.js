"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const vote_controller_1 = require("../controllers/vote.controller");
const router = (0, express_1.Router)();
router.post('/', vote_controller_1.voteForSong);
exports.default = router;
