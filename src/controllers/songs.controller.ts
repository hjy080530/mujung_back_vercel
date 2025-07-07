import supabase from '../services/supabase';
import { getTrackInfo } from '../services/spotify';

interface CreateSongBody { link: string; }

export const createSong = async (
    req: any,
    res:any
): Promise<void> => {
    const { link } = req.body;
    if (!link) {
        res.status(400).json({ message: 'link가 필요합니다.' });
        return;
    }

    try {
        const { link_id, song_name, song_artist } = await getTrackInfo(link);
        const { data, error } = await supabase
            .from('spotify_information')
            .insert([{ link_id, link, song_name, song_artist }])
            .select();

        if (error) {
            console.error('❌ [createSong] insert error:', error);
            res.status(500).json({ message: '곡 등록 실패', error });
            return;
        }
        res.status(201).json(data);
        return;
    } catch (err: any) {
        console.error('🔥 [createSong] exception:', err);
        res.status(500).json({ message: 'Spotify 정보 조회 실패', detail: err.message });
        return;
    }
};

export const getSongs = async (
    req: any,
    res: any
): Promise<void> => {
    try {
        const { data, error } = await supabase
            .from('spotify_information')
            .select('*')
            .order('link_id', { ascending: false });

        if (error) {
            console.error('❌ [getSongs] error:', error);
            res.status(500).json({ message: error.message });
            return;
        }
        res.status(200).json(data);
        return;
    } catch (e: any) {
        console.error(' [getSongs] exception:', e);
        res.status(500).json({ message: '서버 예외 발생', detail: e.message });
        return;
    }
};