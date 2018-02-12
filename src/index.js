import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

import auth from "./routes/auth";

dotenv.config();
const app = express();
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost/board');

app.use('/api/auth', auth);

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(8081, () => console.log('Running on localhost:8081'));
