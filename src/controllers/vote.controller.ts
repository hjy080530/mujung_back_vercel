import { Request, Response } from 'express';
import supabase from '../services/supabase';

// Body 타입 명시
interface VoteBody {
    link_id: string;
    user_id: string;
}

export const voteForSong = async (
    req: Request<{}, any, VoteBody>,
    res: Response
): Promise<void> => {
    const { link_id, user_id } = req.body;

    if (!link_id || !user_id) {
        res.status(400).json({ message: 'link_id 또는 user_id 누락' });
        return;
    }

    const { data: user, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('user_id', user_id)
        .single();

    if (userError || !user) {
        res.status(404).json({ message: '유저 정보가 없습니다.' });
        return;
    }

    const { data: existingVote, error: duplicateError } = await supabase
        .from('votes')
        .select('*')
        .eq('user_id', user_id)
        .eq('link_id', link_id)
        .maybeSingle();

    if (duplicateError) {
        console.error('중복 확인 에러:', duplicateError);
        res.status(500).json({ message: '서버 오류' });
        return;
    }

    if (existingVote) {
        res.status(409).json({ message: '이미 투표했습니다.' });
        return;
    }

    const { data, error } = await supabase
        .from('votes')
        .insert([{ user_id, link_id }]);

    if (error) {
        console.error('❌ supabase insert error:', error);
        res.status(500).json({ message: '서버 오류' });
        return;
    }

    res.status(201).json({ message: '투표 완료', data });
};
