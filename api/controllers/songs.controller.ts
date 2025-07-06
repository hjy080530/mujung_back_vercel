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
    const { data, error } = await supabase
        .from('spotify_information')
        .select('*')
        .order('link_id', { ascending: false });

    if (error) {
        res.status(500).json({ error });
        return;
    }

    res.json(data);
};

function extractSpotifyId(link: string): string {
    const parts = link.split('/');
    return parts[parts.length - 1].split('?')[0];
}