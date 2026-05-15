import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('MONGODB_URI not set');
  process.exit(1);
}

const UserSchema = new mongoose.Schema({}, { strict: false, collection: 'users' });
const User = mongoose.model('User', UserSchema);

async function run() {
  try {
    await mongoose.connect(uri, { dbName: undefined });
    console.log('Connected to MongoDB');
    const emails = ['test+ai4@example.com', 'test+ai3@example.com', 'test+ai2@example.com', 'test@example.com'];
    for (const email of emails) {
      const u = await User.findOne({ email }).lean();
      console.log(email, u ? 'FOUND' : 'NOT FOUND');
      if (u) console.log(JSON.stringify(u));
    }
    await mongoose.disconnect();
  } catch (err) {
    console.error('Error:', err.message || err);
    process.exit(1);
  }
}

run();
