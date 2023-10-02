import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { MONGO_URL, PORT } from './config.js';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import postRoutes from './routes/posts.js';
import { register } from './controllers/auth.js';
import { createPost } from './controllers/posts.js';
import { verifyToken } from './middleware/auth.js';


/* Middleware Configurations */
const __filename = fileURLToPath(import.meta.url); // to grab the file url
const __dirname = path.dirname(__filename); // to grab the directory name
dotenv.config(); // to grab the .env file
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan('common'));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets"))); // set the directory for static files to assets

/* File Storage Configurations */
const storage = multer.diskStorage({
    // on upload the data will be saved in this destination
    destination: (req, file, cb) => {
        cb(null, "public/assets");
    },
    // with this filename
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage }) // the variable to uplaod the file

/* Routes with files */
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);

/* Routes without files */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

/* Mongoose SETUP */

mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
}).catch((error) => console.log(`Did not connect ${error.message}`));

