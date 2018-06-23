import { config } from 'dotenv';
import mongoose from 'mongoose';

import app from './app';
import userRouter from "./routes/routes";


config({ path: `${process.cwd()}/.env` });
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/exchange');
console.log('process.env.PORT ', process.env.PORT);
const port = process.env.PORT || 3003;

try {
  app.listen(port, () => {
    console.log(`server running at port ${port}`);
  });
} catch (err) {
  console.log(err);
}