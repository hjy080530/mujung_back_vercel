"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("../lib/passport"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = (0, express_1.Router)();
router.get('/google', passport_1.default.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport_1.default.authenticate('google', { session: false }), (req, res) => {
    const user = req.user;
    console.log('최종 유저 정보:', user);
    const token = jsonwebtoken_1.default.sign({ email: user.emails[0].value }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });
    const email = user.emails[0].value;
    res.redirect(`https://mujung.vercel.app/?token=${token}&email=${email}`);
});
exports.default = router;
