const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let memoryServer;

const connectDB = async () => {
  let uri = process.env.MONGO_URI || '';

  try {
    if (!uri) {
      memoryServer = await MongoMemoryServer.create();
      uri = memoryServer.getUri();
      console.log('Using in-memory MongoDB for local development');
    }

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    if (memoryServer) {
      await memoryServer.stop().catch(() => { });
    }
    process.exit(1);
  }
};

module.exports = connectDB;
