import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import { DB } from './config/db.js';

import { usersRouter, goalsRouter } from './routes/index.js';
import { errorHandler } from './middleware/errorMiddleware.js';

dotenv.config()
// dotenv.config({ path: './config.env' })


DB()


console.log(process.env.PORT)

const PORT = process.env.PORT || 5000;

const app = express()

app.use(express.json())
app.use(errorHandler)

app.use('/api/goals', goalsRouter);
app.use('/api/users', usersRouter);


app.listen(PORT, () => {
    console.log(`Project started on port: ${PORT}`)
});
