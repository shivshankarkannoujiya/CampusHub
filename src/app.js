import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(express.static('public'));
app.use(cookieParser());
app.use(
    cors({
        origin: process.env.BASE_URL || 'http://localhost:5173',
        credentials: true,
        methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'X-Requested-With',
            'device-remember-token',
            'Access-Control-Allow-Origin',
            'Origin',
            'Accept',
        ],
    })
);

import authRouter from './routes/auth.routes.js';
import announcementRouter from './routes/announcement.routes.js';
import resultRouter from './routes/result.routes.js';

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/announcements', announcementRouter);
app.use('/api/v1/results', resultRouter);

export default app;
