import { Request, Response, NextFunction } from 'express';

export const requireBssmEmail = (req: Request, res: Response, next: NextFunction): void => {
    const user = req.body.user;

    if (!user?.email?.endsWith('@bssm.hs.kr')) {
        res.status(403).json({ message: 'bssm 이메일만 접근 가능합니다.' });
        return;
    }

    next();
};