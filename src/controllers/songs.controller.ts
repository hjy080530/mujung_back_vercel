import { Request, Response } from 'express';
import supabase from '../services/supabase';
import { getTrackInfo } from '../services/spotify';

export const createSong = async (req: Request, res: Response): Promise<void> => {
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
            res.status(500).json({ message: '곡 등록 실패', error });
            return;
        }
        res.status(201).json(data);
    } catch (err: any) {
        res.status(500).json({ message: 'Spotify에서 정보 조회 실패', detail: err.message });
    }
};
export const getSongs = async (req: Request, res: Response): Promise<void> => {
    console.log('▶ [getSongs] start');                         // 1️⃣ 시작
    console.log('▶ [getSongs] SUPABASE_URL=', process.env.SUPABASE_URL);
    console.log('▶ [getSongs] SUPABASE_KEY=', process.env.SUPABASE_ANON_KEY);

    try {
        console.log('▶ [getSongs] calling supabase.from(...).select()');
        const { data, error } = await supabase
            .from('spotify_information')
            .select('*')
            .order('link_id', { ascending: false });

        console.log('▶ [getSongs] supabase returned:', { data, error });

        if (error) {
            console.error('❌ [getSongs] Supabase error:', error);
            res.status(500).json({ message: error.message, details: error });
            return;
        }

        console.log('▶ [getSongs] sending data:', data?.length, 'items');
        res.status(200).json(data);
    } catch (e: any) {
        console.error('🔥 [getSongs] exception:', e);
        res.status(500).json({ message: '서버 예외 발생', detail: e.message });
    }
};
function extractSpotifyId(link: string): string {
    const parts = link.split('/');
    return parts[parts.length - 1].split('?')[0];
}