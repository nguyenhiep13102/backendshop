import express from 'express';
import dotenv from 'dotenv';
import connectToDatabase from './src/config/connect.js';
import Product from './src/models/ProductModel.js';
import routes from './src/routes/index.js';
import bodyParser  from 'body-parser';
import cors from 'cors';
dotenv.config(); 
const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;
app.use(bodyParser.json()); 

app.use(express.json()); 

routes(app);
connectToDatabase();
app.use(bodyParser.json()); 
app.listen(PORT, () => {
  console.log(`✅ Server đang chạy tại http://localhost:${PORT}`);
});
