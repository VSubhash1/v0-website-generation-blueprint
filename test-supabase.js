// Quick test to verify Supabase connection
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('Testing Supabase connection...');
console.log('URL:', supabaseUrl ? 'Set' : 'NOT SET');
console.log('Key:', supabaseAnonKey ? 'Set' : 'NOT SET');

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('ERROR: Supabase credentials not set in environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Try a simple query
async function test() {
  try {
    console.log('\nAttempting to insert test data...');
    const { data, error } = await supabase
      .from('contacts')
      .insert([
        {
          full_name: 'Test User',
          email: 'test@example.com',
          phone: '1234567890',
          company_name: 'Test Company',
          message: 'This is a test'
        }
      ])
      .select();

    if (error) {
      console.error('Insert error:', error);
      console.error('Error message:', error.message);
      console.error('Error details:', error.details);
    } else {
      console.log('SUCCESS! Data inserted:', data);
    }
  } catch (err) {
    console.error('Connection error:', err);
  }
}

test();
