import createServerlessExpress from '@vendia/serverless-express';
import app from '../src/app';

export const handler = createServerlessExpress({ app });