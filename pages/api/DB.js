import mongoose from 'mongoose';
 

 export const DbConnection = async () => {
    if (mongoose.connections[0].readyState) {
      console.log('Already connected to the database');
      return;
    }
    try {
      await mongoose.connect('mongodb://localhost:27017/CodesWeare', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Database connected successfully');
    } catch (error) {
      console.error('Error connecting to database:', error);
      throw new Error('Database connection error');
    }
  };

