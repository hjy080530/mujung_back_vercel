"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const requireBssmEmail_1 = require("../auth/requireBssmEmail");
const vote_controller_1 = require("../controllers/vote.controller");
const router = (0, express_1.Router)();
router.post('/', requireBssmEmail_1.requireBssmEmail, vote_controller_1.voteForSong);
exports.default = router;
