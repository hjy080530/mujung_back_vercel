import dotenv from 'dotenv';
dotenv.config();
import fetch from 'node-fetch';

const clientId = process.env.SPOTIFY_CLIENT_ID!;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!;
let cachedToken: string | null = null;
let tokenExpiry = 0;

async function fetchToken(): Promise<string> {
    const now = Date.now();
    if (cachedToken && now < tokenExpiry) return cachedToken;

    const res = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            Authorization: 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'grant_type=client_credentials',
    });
    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Spotify token fetch error: ${text}`);
    }
    const json = await res.json() as { access_token: string; expires_in: number };
    cachedToken = json.access_token;
    tokenExpiry = now + (json.expires_in - 60) * 1000;
    return cachedToken;
}

function extractSpotifyId(url: string): string {
    if (url.startsWith('spotify:')) {
        return url.split(':').pop()!;
    }
    const u = new URL(url);
    const parts = u.pathname.split('/').filter(Boolean);
    return parts.pop()!.split('?')[0];
}

export async function searchTrack(title: string, artist: string): Promise<{ link_id: string; spotify_url: string }> {
    const token = await fetchToken();
    const query = encodeURIComponent(`track:${title} artist:${artist}`);
    const res = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=1`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
        const err = await res.json();
        throw new Error(`Spotify search error: ${err.error?.message || res.statusText}`);
    }
    const data = await res.json();
    const item = data.tracks?.items?.[0];
    if (!item) throw new Error('No matching track found');
    return { link_id: item.id, spotify_url: item.external_urls.spotify };
}

export async function getTrackInfo(spotifyUrl: string) {
    const token = await fetchToken();
    const id = extractSpotifyId(spotifyUrl);
    const res = await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
        const err = await res.json();
        throw new Error(`Spotify track fetch error: ${err.error?.message || res.statusText}`);
    }
    const json = await res.json();
    const artists = Array.isArray(json.artists) ? json.artists : [];
    return {
        link_id: json.id,
        link: json.external_urls.spotify,
        song_name: json.name || 'Unknown Title',
        song_artist: artists.map((a: any) => a.name).join(', ') || 'Unknown Artist',
    };
}