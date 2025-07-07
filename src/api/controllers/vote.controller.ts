import { Request, Response } from 'express';
import supabase from '../services/supabase';

export const voteForSong = async (req: Request, res: Response): Promise<Response> => {
    const { link_id, user_id } = req.body;

    if (!link_id || !user_id) {
        return res.status(400).json({ message: 'link_id 또는 user_id 누락' });
    }

    const { data: user, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('user_id', user_id)
        .single();

    if (userError || !user) {
        return res.status(404).json({ message: '유저 정보가 없습니다.' });
    }
    const { data: existingVote, error: duplicateError } = await supabase
        .from('votes')
        .select('*')
        .eq('user_id', user_id)
        .eq('link_id', link_id)
        .maybeSingle();

    if (duplicateError) {
        console.error('중복 확인 에러:', duplicateError);
        return res.status(500).json({ message: '서버 오류' });
    }

    if (existingVote) {
        return res.status(409).json({ message: '이미 투표했습니다.' });
    }

    const { data, error } = await supabase
        .from('votes')
        .insert([{ user_id, link_id }]);

    if (error) {
        console.error('supabase insert error:', error);
        return res.status(500).json({ message: '서버 오류' });
    }

    return res.status(201).json({ message: '투표 완료', data });
};