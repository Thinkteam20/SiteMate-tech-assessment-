import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import 'express-async-errors';
import postRouter from './router/posts.js';

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('combined'));
app.use(helmet());

const port = 8080;

app.use('/posts', postRouter);

app.use((req, res, next) => {
    res.status(404);
});

app.use((error, req, res, next) => {
    console.error(error);
    res.status(500);
})

app.listen(port, () => console.log(`server is running on http://localhost:${port}`));