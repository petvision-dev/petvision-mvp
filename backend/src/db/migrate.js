require('dotenv').config();
const fs = require('fs');
const path = require('path');
const db = require('./connection');

async function migrate() {
  console.log('🚀 Starting database migration...');
  
  try {
    // Read schema file
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    // Execute schema
    await db.query(schema);
    console.log('✅ Database schema created successfully');
    
    // Verify tables exist
    const tables = await db.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    console.log(`✅ Created ${tables.rows.length} tables:`, tables.rows.map(t => t.table_name).join(', '));
    
    console.log('🎉 Migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  }
}

// Run migration
migrate();
