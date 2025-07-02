"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireBssmEmail = void 0;
const requireBssmEmail = (req, res, next) => {
    var _a;
    const user = req.body.user;
    if (!((_a = user === null || user === void 0 ? void 0 : user.email) === null || _a === void 0 ? void 0 : _a.endsWith('@bssm.hs.kr'))) {
        res.status(403).json({ message: 'bssm 이메일만 허용됩니다.' });
        return;
    }
    next();
};
exports.requireBssmEmail = requireBssmEmail;
