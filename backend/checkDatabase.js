const mongoose = require('mongoose');
require('dotenv').config();
const Club = require('./models/Club');

async function checkDatabase() {
  try {
    console.log('Connecting to MongoDB Atlas...');
    console.log('URI:', process.env.MONGODB_URI);
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ Connected successfully\n');

    // Check clubs
    const clubs = await Club.find({});
    console.log(`Found ${clubs.length} clubs in database:`);
    
    if (clubs.length > 0) {
      clubs.forEach((club, idx) => {
        console.log(`${idx + 1}. ${club.name} - ${club.category}`);
      });
    } else {
      console.log('❌ NO CLUBS FOUND IN DATABASE');
    }

    // Get collection info
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    console.log('\n📋 Collections in database:');
    collections.forEach(col => console.log(`  - ${col.name}`));

    // Check if Club collection exists and get count
    const clubCollection = db.collection('clubs');
    const count = await clubCollection.countDocuments({});
    console.log(`\n🔢 Total documents in 'clubs' collection: ${count}`);

    await mongoose.disconnect();
    console.log('\n✓ Disconnected from MongoDB');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    await mongoose.disconnect();
    process.exit(1);
  }
}

checkDatabase();
