import { Request, Response } from 'express';

export const voteForSong = async (req: Request<{},{},{ link_id: string; email: string }>, res: Response) => {
    const { link_id, email } = req.body;
    res.status(201).json({ message: '투표 완료!' });
};