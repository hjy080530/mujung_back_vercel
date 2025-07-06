"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifySupabaseToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifySupabaseToken = (req, res, next) => {
    const auth = req.headers.authorization;
    if (!(auth === null || auth === void 0 ? void 0 : auth.startsWith('Bearer '))) {
        res.status(401).json({ message: '인증 토큰 없음' });
        return;
    }
    const token = auth.split(' ')[1];
    try {
        const decoded = jsonwebtoken_1.default.decode(token);
        const email = decoded === null || decoded === void 0 ? void 0 : decoded.email;
        if (!email || !email.endsWith('@bssm.hs.kr')) {
            res.status(403).json({ message: 'bssm 이메일만 접근 가능합니다' });
            return;
        }
        req.user = { email };
        next();
    }
    catch (err) {
        res.status(401).json({ message: '토큰 검증 실패' });
    }
};
exports.verifySupabaseToken = verifySupabaseToken;
