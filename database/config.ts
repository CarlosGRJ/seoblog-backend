import mongoose from 'mongoose';

export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_CLOUD!);
    console.log('DB Online');
  } catch (error) {
    console.log('error ', error);
    throw new Error('Error a la hora de iniciar la BD ver logs');
  }
};
