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
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchSong = void 0;
const spotify_1 = require("../services/spotify");
const searchSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, artist } = req.query;
    if (!title || !artist) {
        res.status(400).json({ message: 'title과 artist를 모두 전달해야 합니다.' });
        return;
    }
    try {
        const youtube_search_url = 'https://www.youtube.com/results?search_query=' + encodeURIComponent(`${title} ${artist}`);
        const { spotify_url } = yield (0, spotify_1.searchTrack)(title, artist);
        res.json({ spotify_url, youtube_search_url });
    }
    catch (err) {
        res.status(500).json({ message: 'Spotify 검색 실패', detail: err.message });
    }
});
exports.searchSong = searchSong;
