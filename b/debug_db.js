const { Client } = require('pg');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });
const connectionString = process.env.DATABASE_URL;

async function testMode(name, config) {
  console.log(`\n🔍 Testing Mode: ${name}...`);
  const client = new Client(config);
  try {
    await client.connect();
    console.log(`✅ ${name} SUCCESS!`);
    const res = await client.query('SELECT NOW()');
    console.log('⏱ Time:', res.rows[0].now);
    await client.end();
    return true;
  } catch (err) {
    console.log(`❌ ${name} FAILED: ${err.message}`);
    return false;
  }
}

async function runAll() {
  // Mode 1: URL + Object SSL (Standard)
  await testMode("URL_OBJ_SSL", {
    connectionString: connectionString,
    ssl: { rejectUnauthorized: false }
  });

  // Mode 2: URL + Explicit SSL (Railway Special)
  await testMode("URL_EXP_SSL", {
    connectionString: connectionString,
    ssl: { require: true, rejectUnauthorized: false }
  });

  // Mode 3: Raw Params (No URL)
  const regex = /postgresql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/;
  const match = connectionString.match(regex);
  if (match) {
    const [, user, password, host, port, database] = match;
    await testMode("RAW_PARAMS_SSL", {
      user, password, host, port, database,
      ssl: { rejectUnauthorized: false }
    });
  }

  // Mode 4: No SSL (Just in case)
  await testMode("NO_SSL", {
    connectionString: connectionString,
    ssl: false
  });
}

runAll();
