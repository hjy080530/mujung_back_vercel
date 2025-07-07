declare module '@vendia/serverless-express' {
    import type { RequestHandler } from 'express';
    export default function createServerlessExpress(opts: { app: any }): RequestHandler;
}