const mongoose = require('mongoose');
const Club = require('./models/Club');
require('dotenv').config();

async function createClubs() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ Connected to MongoDB...\n');

    // Delete existing clubs first (optional)
    await Club.deleteMany({});
    console.log('Cleared existing clubs\n');

    const clubs = [
      {
        name: 'Photography Club',
        description: 'For photography enthusiasts and learners. We do photo walks, workshops, and exhibitions.',
        category: 'Arts & Culture',
        requiredSkills: ['Photography', 'Creativity'],
        maxMembers: 30,
        image: 'https://via.placeholder.com/300?text=Photography+Club',
        isActive: true,
      },
      {
        name: 'Music Club',
        description: 'Learn and perform music. All instruments welcome. Weekly jam sessions and concerts.',
        category: 'Arts & Culture',
        requiredSkills: ['Music', 'Instrument Playing'],
        maxMembers: 25,
        image: 'https://via.placeholder.com/300?text=Music+Club',
        isActive: true,
      },
      {
        name: 'Coding Club',
        description: 'Programming, web development, and hackathons. Python, JavaScript, and more.',
        category: 'Technology',
        requiredSkills: ['Programming', 'Problem Solving'],
        maxMembers: 40,
        image: 'https://via.placeholder.com/300?text=Coding+Club',
        isActive: true,
      },
      {
        name: 'Sports Club',
        description: 'Basketball, football, volleyball, and fitness. All skill levels welcome.',
        category: 'Sports',
        requiredSkills: ['Sports', 'Team Work'],
        maxMembers: 50,
        image: 'https://via.placeholder.com/300?text=Sports+Club',
        isActive: true,
      },
      {
        name: 'Drama Club',
        description: 'Acting, theater, and performance art. Regular stage productions and workshops.',
        category: 'Arts & Culture',
        requiredSkills: ['Acting', 'Confidence'],
        maxMembers: 20,
        image: 'https://via.placeholder.com/300?text=Drama+Club',
        isActive: true,
      },
      {
        name: 'Debate Club',
        description: 'Public speaking, debate competitions, and critical thinking sessions.',
        category: 'Academics',
        requiredSkills: ['Speaking', 'Research'],
        maxMembers: 20,
        image: 'https://via.placeholder.com/300?text=Debate+Club',
        isActive: true,
      },
      {
        name: 'Environmental Club',
        description: 'Focus on sustainability, environmental projects, and awareness campaigns.',
        category: 'Social Cause',
        requiredSkills: ['Environmental Awareness', 'Leadership'],
        maxMembers: 35,
        image: 'https://via.placeholder.com/300?text=Environmental+Club',
        isActive: true,
      },
      {
        name: 'Chess Club',
        description: 'Chess tournaments, training sessions, and friendly matches every week.',
        category: 'Games',
        requiredSkills: ['Chess', 'Strategy'],
        maxMembers: 25,
        image: 'https://via.placeholder.com/300?text=Chess+Club',
        isActive: true,
      },
    ];

    const createdClubs = await Club.insertMany(clubs);
    console.log(`✓ Created ${createdClubs.length} clubs successfully!\n`);
    
    createdClubs.forEach((club, idx) => {
      console.log(`${idx + 1}. ${club.name}`);
      console.log(`   Category: ${club.category}`);
      console.log(`   Max Members: ${club.maxMembers}\n`);
    });

    console.log('You can now:');
    console.log('1. Login as student and see these clubs');
    console.log('2. Apply to any club');
    console.log('3. Login as admin and accept/reject applications');
    
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    await mongoose.disconnect();
    process.exit(1);
  }
}

createClubs();
