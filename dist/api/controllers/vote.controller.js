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
exports.voteForSong = void 0;
const supabase_1 = __importDefault(require("../services/supabase"));
const voteForSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { link_id, email } = req.body;
    if (!link_id || !email) {
        return res.status(400).json({ message: 'link_id 또는 email 누락' });
    }
    const { data, error } = yield supabase_1.default
        .from('vote_aggregate')
        .insert([{ link_id, email }]);
    if (error) {
        console.error('❌ supabase insert error:', error);
        return res.status(500).json({ message: '서버 오류' });
    }
    return res.status(201).json({ message: '투표 완료', data });
});
exports.voteForSong = voteForSong;
