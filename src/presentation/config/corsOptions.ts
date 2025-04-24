import { CorsOptions } from 'cors';

export const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:8080',
    'https://protein-pathway.vercel.app',
    'https://clean-architcture-express.vercel.app',
];

export const corsOptions: CorsOptions = {
    origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
        // allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        } else {
            return callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
};