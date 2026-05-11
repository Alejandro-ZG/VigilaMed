import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.MONGODB_URI || '';

export const connectDB = async () => {
  try {
    await mongoose.connect(connectionString);
    console.log('Conexión exitosa a MongoDB Atlas: VigilaMedDB');
  } catch (error) {
    console.error('Error conectando a la base de datos:', error);
    process.exit(1); // Detener el proceso si no hay conexión
  }
};