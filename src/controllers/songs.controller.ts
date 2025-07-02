import { Request, Response } from 'express';
import supabase from '../services/supabase';

export const createSong = async (req: Request, res: Response): Promise<void> => {
    const { link, song_name, song_artist } = req.body;

    if (!link || !song_name || !song_artist) {
        res.status(400).json({ message: '필수 값이 누락되었습니다.' });
        return;
    }

    const link_id = extractSpotifyId(link);

    const { data, error } = await supabase
        .from('spotify_information')
        .insert([
            { link_id, link, song_name, song_artist }
        ])
        .select();

    if (error) {
        res.status(500).json({ error });
        return;
    }

    res.status(201).json(data);
};

function extractSpotifyId(link: string): string {
    const parts = link.split('/');
    return parts[parts.length - 1].split('?')[0];
}