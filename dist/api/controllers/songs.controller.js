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
exports.getSongs = exports.createSong = void 0;
const supabase_1 = __importDefault(require("../services/supabase"));
const spotify_1 = require("../services/spotify");
const createSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { link } = req.body;
    if (!link) {
        res.status(400).json({ message: 'link가 필요합니다.' });
        return;
    }
    try {
        const { link_id, song_name, song_artist } = yield (0, spotify_1.getTrackInfo)(link);
        const { data, error } = yield supabase_1.default
            .from('spotify_information')
            .insert([{ link_id, link, song_name, song_artist }])
            .select();
        if (error) {
            res.status(500).json({ message: '곡 등록 실패', error });
            return;
        }
        res.status(201).json(data);
    }
    catch (err) {
        res.status(500).json({ message: 'Spotify에서 정보 조회 실패', detail: err.message });
    }
});
exports.createSong = createSong;
const getSongs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield supabase_1.default
        .from('spotify_information')
        .select('*')
        .order('link_id', { ascending: false });
    if (error) {
        res.status(500).json({ error });
        return;
    }
    res.json(data);
});
exports.getSongs = getSongs;
function extractSpotifyId(link) {
    const parts = link.split('/');
    return parts[parts.length - 1].split('?')[0];
}
