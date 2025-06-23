import express from 'express';
import dotenv from 'dotenv';
import connectToDatabase from './src/config/connect.js';
import routes from './src/routes/index.js';
import bodyParser  from 'body-parser';
import cors from 'cors';
import cookieParser  from 'cookie-parser'
import configViewEngine from  './src/config/viewEngine.js';
import path from "path";
dotenv.config(); 
const app = express();
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
// app.use(cors());
app.use(cors({
  origin:true, // domain FE
  credentials: true,
}));
app.use(cookieParser()) 
const PORT = process.env.PORT || 5000;


configViewEngine(app);


connectToDatabase();
app.use(bodyParser.json());
routes(app); 
app.listen(PORT, () => {
  console.log(`✅ Server đang chạy tại http://localhost:${PORT}`);
});
