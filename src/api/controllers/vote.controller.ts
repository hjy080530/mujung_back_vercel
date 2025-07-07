import { Request, Response } from 'express';
import supabase from '../services/supabase';

export const voteForSong = async (req: Request, res: Response): Promise<void> => {
    const { link_id, user_id } = req.body;

    if (!link_id || !user_id) {
        res.status(400).json({ message: 'link_id 또는 user_id 누락' });
        return;
    }

    const { data: existingVote, error: checkError } = await supabase
        .from('vote_aggregate')
        .select('*')
        .eq('link_id', link_id)
        .eq('user_id', user_id)
        .single();

    if (checkError && checkError.code !== 'PGRST116') {
        console.error(' 중복 체크 에러:', checkError);
        res.status(500).json({ message: '중복 확인 실패' });
        return;
    }

    if (existingVote) {
        res.status(409).json({ message: '이미 투표했습니다.' });
        return;
    }
    const { data, error } = await supabase
        .from('vote_aggregate')
        .insert([{ link_id, user_id }]);

    if (error) {
        console.error(' supabase insert error:', error);
        res.status(500).json({ message: '서버 오류' });
        return;
    }

    res.status(201).json({ message: '투표 완료', data });
};