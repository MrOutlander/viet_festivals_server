import express from "express";
import * as dotenv from 'dotenv'
import cors from 'cors'

import connectDB from "./mongodb/connect.js";
import userRouter from './routes/user.routes.js'
import eventsRouter from './routes/events.routes.js'
import eventCategoryRouter from './routes/eventCategories.routes.js'
import adminUserRouter from './routes/adminUser.routes.js'

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.get('/', (req, res) => {
    res.send({ message: 'Good Morning Vietanm!!!'})
})

app.use('/api/v1/users', userRouter);
app.use('/api/v1/admin_users', adminUserRouter);
app.use('/api/v1/events', eventsRouter);
app.use('/api/v1/event_category', eventCategoryRouter);

const startServer = async () => {
    try {
        // Connect to database...
        connectDB(process.env.MONGODB_URL);

        app.listen(8080, () => console.log( 'Server started on port http://localhost:8080' ))
    } catch (error) {
        console.log(error)
    }
}

startServer();
