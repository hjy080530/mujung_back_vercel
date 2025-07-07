import { searchTrack } from '../services/spotify';

export const searchSong = async (
    req: any,
    res: any
): Promise<void> => {
    const { title, artist } = req.query;
    if (!title || !artist) {
        res.status(400).json({ message: 'title과 artist를 모두 전달해야 합니다.' });
        return;
    }

    try {
        const youtube_search_url =
            'https://www.youtube.com/results?search_query=' +
            encodeURIComponent(`${title} ${artist}`);
        const { spotify_url } = await searchTrack(title, artist);
        res.status(200).json({ spotify_url, youtube_search_url });
        return;
    } catch (err: any) {
        res.status(500).json({ message: 'Spotify 검색 실패', detail: err.message });
        return;
    }
};