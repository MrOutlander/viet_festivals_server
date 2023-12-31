import express from "express";
import * as dotenv from 'dotenv'
import cors from 'cors'
import helmet from "helmet"

import connectDB from "./mongodb/connect.js";
import userRouter from './routes/user.routes.js'
import eventsRouter from './routes/events.routes.js'
import eventCategoryRouter from './routes/eventCategories.routes.js'
import adminUserRouter from './routes/adminUser.routes.js'

dotenv.config();

const app = express();


// IF THE APP IN THE BROWSER STOPS WORKING, REMOVE THIS AND "corsOptions" INSIDE CORS
const corsOptions = {
    origin: ['http://192.168.0.14:8081',  'http://localhost:5173', 'https://zingy-gaufre-59424b.netlify.app'], // replace with your frontend port number
    optionsSuccessStatus: 200 
}

app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(helmet());


app.get('/', (req, res) => {
    res.send({ message: 'Good Morning Vietanm!!!'})
})

app.use('/api/v1/users', userRouter);
app.use('/api/v1/admin_users', adminUserRouter);
app.use('/api/v1/events', eventsRouter);
app.use('/api/v1/event_category', eventCategoryRouter);
app.get('/api/config', (req, res) => {
    res.json({
      googleClientId: process.env.GOOGLE_CLIENT_ID,
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
      cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
      cloudinaryUploadPreset: process.env.CLOUDINARY_UPLOAD_PRESET,
      baseUrl: process.env.API_BASE_URL,
      renderedData: process.env.RENDERED_DATA_URL,
    });
});


const startServer = async () => {
    try {
        // Connect to database...
        connectDB(process.env.MONGODB_URL);
        const port = process.env.PORT || 8080;
        app.listen(port, () => console.log( 'Server started on port http://localhost:8080' ))
    } catch (error) {
        console.log(error)
    }
}

startServer();
