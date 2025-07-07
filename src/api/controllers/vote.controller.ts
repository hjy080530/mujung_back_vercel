import { Request, Response } from 'express';
import supabase from '../services/supabase';

export const voteForSong = async (req: Request, res: Response): Promise<void> => {
    const { link_id, email } = req.body;

    if (!link_id || !email) {
        res.status(400).json({ message: 'link_id 또는 email 누락' });
        return;
    }

    const { data, error } = await supabase
        .from('vote_aggregate')
        .insert([{ link_id, email }]);

    if (error) {
        console.error('❌ supabase insert error:', error);
        res.status(500).json({ message: '서버 오류' });
        return;
    }

    res.status(201).json({ message: '투표 완료', data });
};