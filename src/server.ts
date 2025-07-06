import app from './app';


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`뮤정 서버 실행중 port:${PORT}`);
});