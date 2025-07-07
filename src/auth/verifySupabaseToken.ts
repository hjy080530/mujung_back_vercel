import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const verifySupabaseToken = (req: Request, res: Response, next: NextFunction): void => {
    const auth = req.headers.authorization;

    if (!auth?.startsWith('Bearer ')) {
        res.status(401).json({ message: '인증 토큰 없음' });
        return;
    }

    const token = auth.split(' ')[1];

    try {
        const decoded = jwt.decode(token);
        const email = (decoded as any)?.email;

        if (!email || !email.endsWith('@bssm.hs.kr')) {
            res.status(403).json({ message: 'bssm 이메일만 접근 가능합니다' });
            return;
        }
        (req as any).user = { email };

        next();
    } catch (err) {
        res.status(401).json({ message: '토큰 검증 실패' });
    }
};