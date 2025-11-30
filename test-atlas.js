// test-atlas.js - Test YOUR specific connection
require('dotenv').config();
const mongoose = require('mongoose');

console.log('🔗 Testing connection to YOUR MongoDB Atlas...');
console.log('Cluster: Cluster0.4vderdr.mongodb.net');
console.log('User: folarinajisegiri_db_user');

async function testAtlasConnection() {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);

        console.log('\n✅ SUCCESS! Connected to YOUR MongoDB Atlas');
        console.log(`📍 Host: ${conn.connection.host}`);
        console.log(`📁 Database: ${conn.connection.name}`);
        console.log(`🔄 Ready State: ${conn.connection.readyState}`);

        // List collections to verify access
        const collections = await conn.connection.db.listCollections().toArray();
        console.log(`📊 Collections found: ${collections.length}`);

        collections.forEach(collection => {
            console.log(`   - ${collection.name}`);
        });

        await mongoose.connection.close();
        console.log('\n🎉 Your MongoDB Atlas is ready for CPAN 212 Movie App!');

    } catch (error) {
        console.error('\n❌ FAILED to connect to your MongoDB Atlas');
        console.error('Error:', error.message);
        console.log('\n🔧 Check these in MongoDB Atlas:');
        console.log('   1. Go to Network Access → Add IP Address → 0.0.0.0/0');
        console.log('   2. Verify user "folarinajisegiri_db_user" has read/write access');
        console.log('   3. Check if cluster "Cluster0" is running');
    }
}

