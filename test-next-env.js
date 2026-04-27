const { loadEnvConfig } = require('@next/env');
const fs = require('fs');

const cases = [
  "ADMIN_PASSWORD_HASH=\"\\$2b\\$10\\$mqpb5kndS27uvxMjf7TrZu7Wxb801Gwuum8jON7CkL9x9k78nczyy\"",
  "ADMIN_PASSWORD_HASH='\\$2b\\$10\\$mqpb5kndS27uvxMjf7TrZu7Wxb801Gwuum8jON7CkL9x9k78nczyy'",
  "ADMIN_PASSWORD_HASH=\\$2b\\$10\\$mqpb5kndS27uvxMjf7TrZu7Wxb801Gwuum8jON7CkL9x9k78nczyy"
];

const backup = fs.readFileSync('.env.local', 'utf8');

for (let i = 0; i < cases.length; i++) {
  fs.writeFileSync('.env.local', backup.replace(/ADMIN_PASSWORD_HASH=.*/, cases[i]));
  delete require.cache[require.resolve('@next/env')];
  const { loadEnvConfig: freshLoad } = require('@next/env');
  const { combinedEnv } = freshLoad(process.cwd(), true);
  console.log(`Case ${i+1}:`, combinedEnv.ADMIN_PASSWORD_HASH);
}

fs.writeFileSync('.env.local', backup);
