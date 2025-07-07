import type { Request, Response } from 'express';

export const voteForSong = async (req: Request, res: Response) => {
    console.log('✅ 투표 시작');
    console.log('👉 받은 데이터:', req.body);
    console.log('✅ 투표 완료');
    res.status(201).json({ message: '투표 완료!' });
};