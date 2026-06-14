const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  require('dotenv').config({ path: envPath });
}

const Settings = require('./models/Settings');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/3dotsadv';

async function updateReels() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected successfully.');

    const newReels = [
      "video:/uploads/reel4.mp4",
      "video:/uploads/reel3.mp4",
      "video:/uploads/reel 1.mp4",
      "video:/uploads/reel2.mp4"
    ];

    let reelsSetting = await Settings.findOne({ key: 'instagram_reels' });
    if (reelsSetting) {
      reelsSetting.value = newReels;
      await reelsSetting.save();
      console.log('Updated existing instagram_reels setting in MongoDB.');
    } else {
      await Settings.create({ key: 'instagram_reels', value: newReels });
      console.log('Created and seeded new instagram_reels setting in MongoDB.');
    }

    console.log('Database updated successfully with:', newReels);
  } catch (error) {
    console.error('Error updating database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  }
}

updateReels();
