import mongoose from 'mongoose';
import { MONGO_DB } from './environment';

// Connecting to mongoDB
export const mongooseConnection = async (): Promise<void> => {
  await mongoose.connect(MONGO_DB, {useNewUrlParser: true, useUnifiedTopology: true});
  console.log(`Connected to MongoDB!`)
}