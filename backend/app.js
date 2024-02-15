import express from 'express';
import { connection } from './database/db.js'
import { router as authRouter } from './routes/auth.js';
import cors from 'cors';
import 'dotenv/config.js'
import { accountRouter } from './routes/account.js';

connection("mongodb://localhost:27017/paytm");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());

app.get('/health', (req, res) => {
    res.status(200).json({
        message: "Hola Amigos",
    });
});

app.use('/api/v1/user', authRouter);
app.use('/api/v1/account', accountRouter);

app.get('/*', (req, res) => {
    return res.status(404).json({
        message: "Error 404 Not Found",
    })
});

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
});

