const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

async function test() {
  console.log("ENV EMAIL:", process.env.ADMIN_EMAIL);
  console.log("ENV HASH:", process.env.ADMIN_PASSWORD_HASH);
  // test password... wait I don't know the password the user is typing!
  // But wait, what if the problem is that process.env.ADMIN_PASSWORD_HASH is being read without quotes, 
  // or it contains a dollar sign that got stripped?
  // Let's just print the variables from Next.js perspective by creating a small script that loads Next.js envs:
}
test();
