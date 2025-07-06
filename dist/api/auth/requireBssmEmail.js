"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireBssmEmail = void 0;
const requireBssmEmail = (req, res, next) => {
    var _a;
    const email = (_a = req.body.email) === null || _a === void 0 ? void 0 : _a.trim().toLowerCase();
    if (!email || !email.endsWith('@bssm.hs.kr')) {
        res.status(403).json({ message: 'bssm 이메일만 접근 가능합니다.' });
        return;
    }
    next();
};
exports.requireBssmEmail = requireBssmEmail;
