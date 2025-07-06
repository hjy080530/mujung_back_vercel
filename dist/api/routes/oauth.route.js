"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const router = (0, express_1.Router)();
router.get('/google', passport_1.default.authenticate('google', {
    scope: ['profile', 'email'],
    state: '/'
}));
router.get('/google/callback', passport_1.default.authenticate('google', {
    failureRedirect: '/login/fail',
    session: false,
}), (req, res) => {
    const from = req.query.state || '/';
    res.redirect(`https://mujung.vercel.app${from}`);
});
exports.default = router;
