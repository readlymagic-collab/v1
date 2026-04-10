import app from './app';
import { connectDB } from './config/db';
import { config } from './config';

const startServer = async () => {
  await connectDB();

  app.listen(config.port, () => {
    console.log(`===== Server is running =====`);
  });
};

startServer();
