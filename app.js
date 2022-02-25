import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/userRoter.js';

const PORT = 3000;
const URL = "mongodb://localhost:27017/usersdb";
const app = express();

mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true });

app.use(express.json());
app.use('/api', userRouter);

async function start() {
    try {
        await mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true })
        app.listen(PORT, () => console.log('server started on port' + PORT))
    } catch (err) {
        console.log(err)
    }
}

start();





