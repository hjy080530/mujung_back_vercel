import supabase from '../services/supabase';

interface VoteBody { link_id: string; user_id: string; }
export const voteForSong = async (
    req: any,
    res: any
): Promise<void> => {
    const { link_id, user_id } = req.body;
    if (!link_id || !user_id) {
        res.status(400).json({ message: 'link_id 또는 user_id 누락' });
        return;
    }

    try {
        const { data: user, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('user_id', user_id)
            .single();
        if (userError || !user) {
            res.status(404).json({ message: '유저 정보가 없습니다.' });
            return;
        }

        const { data: existing, error: dupErr } = await supabase
            .from('votes')
            .select('*')
            .eq('user_id', user_id)
            .eq('link_id', link_id)
            .maybeSingle();
        if (dupErr) {
            res.status(500).json({ message: '서버 오류' });
            return;
        }
        if (existing) {
            res.status(409).json({ message: '이미 투표했습니다.' });
            return;
        }

        const { data, error } = await supabase
            .from('votes')
            .insert([{ user_id, link_id }]);
        if (error) {
            res.status(500).json({ message: '서버 오류' });
            return;
        }
        res.status(201).json({ message: '투표 완료', data });
        return;
    } catch (err: any) {
        res.status(500).json({ message: '서버 예외 발생', detail: err.message });
        return;
    }
};