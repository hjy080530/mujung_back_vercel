"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchTrack = searchTrack;
exports.getTrackInfo = getTrackInfo;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const node_fetch_1 = __importDefault(require("node-fetch"));
const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
let cachedToken = null;
let tokenExpiry = 0;
function fetchToken() {
    return __awaiter(this, void 0, void 0, function* () {
        const now = Date.now();
        if (cachedToken && now < tokenExpiry)
            return cachedToken;
        const res = yield (0, node_fetch_1.default)('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                Authorization: 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'grant_type=client_credentials',
        });
        if (!res.ok) {
            const text = yield res.text();
            throw new Error(`Spotify token fetch error: ${text}`);
        }
        const json = yield res.json();
        cachedToken = json.access_token;
        tokenExpiry = now + (json.expires_in - 60) * 1000;
        return cachedToken;
    });
}
function extractSpotifyId(url) {
    if (url.startsWith('spotify:')) {
        return url.split(':').pop();
    }
    const u = new URL(url);
    const parts = u.pathname.split('/').filter(Boolean);
    return parts.pop().split('?')[0];
}
function searchTrack(title, artist) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        const token = yield fetchToken();
        const query = encodeURIComponent(`track:${title} artist:${artist}`);
        const res = yield (0, node_fetch_1.default)(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=1`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) {
            const err = yield res.json();
            throw new Error(`Spotify search error: ${((_a = err.error) === null || _a === void 0 ? void 0 : _a.message) || res.statusText}`);
        }
        const data = yield res.json();
        const item = (_c = (_b = data.tracks) === null || _b === void 0 ? void 0 : _b.items) === null || _c === void 0 ? void 0 : _c[0];
        if (!item)
            throw new Error('No matching track found');
        return { link_id: item.id, spotify_url: item.external_urls.spotify };
    });
}
function getTrackInfo(spotifyUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const token = yield fetchToken();
        const id = extractSpotifyId(spotifyUrl);
        const res = yield (0, node_fetch_1.default)(`https://api.spotify.com/v1/tracks/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) {
            const err = yield res.json();
            throw new Error(`Spotify track fetch error: ${((_a = err.error) === null || _a === void 0 ? void 0 : _a.message) || res.statusText}`);
        }
        const json = yield res.json();
        const artists = Array.isArray(json.artists) ? json.artists : [];
        return {
            link_id: json.id,
            link: json.external_urls.spotify,
            song_name: json.name || 'Unknown Title',
            song_artist: artists.map((a) => a.name).join(', ') || 'Unknown Artist',
        };
    });
}
