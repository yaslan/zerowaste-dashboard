import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Read .env manually
const envPath = path.resolve('.env');
const envContent = fs.readFileSync(envPath, 'utf8');
const envVars = {};
envContent.split('\n').forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
        envVars[match[1]] = match[2];
    }
});

const url = envVars['VITE_SUPABASE_URL'];
const key = envVars['VITE_SUPABASE_ANON_KEY'];

if (!url || !key) {
    console.error('Test Error - Missing Supabase credentials in .env');
    process.exit(1);
}

const supabase = createClient(url, key);

async function testConnection() {
    console.log('Testing Supabase Connection...');
    console.log('URL:', url);

    try {
        const { data, error } = await supabase.from('batches').select('*').limit(1);

        if (error) {
            console.error('\n--- DB CONNECTION ERROR ---');
            console.error('Test Error - Failed to fetch from batches:', error.message || error);
            console.error('Details:', error.details || 'None');
            console.error('Hint:', error.hint || 'None');
        } else {
            console.log('\n--- DB CONNECTION SUCCESS ---');
            console.log('Successfully connected and queried "batches" table.');
            console.log('Rows found:', data.length);
        }

    } catch (e) {
        console.error('Exception during fetch:', e.message);
    }
}

testConnection();
