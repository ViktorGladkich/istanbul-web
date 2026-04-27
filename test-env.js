const fs = require('fs');
fs.writeFileSync('.env.test', 'ADMIN_PASSWORD_HASH=\\$2b\\$10\\$mqpb5kndS27uvxMjf7TrZu7Wxb801Gwuum8jON7CkL9x9k78nczyy\n');
require('dotenv').config({ path: '.env.test' });
const expand = require('dotenv-expand');
expand.expand({ parsed: { ADMIN_PASSWORD_HASH: '\\$2b\\$10\\$mqpb5kndS27uvxMjf7TrZu7Wxb801Gwuum8jON7CkL9x9k78nczyy' } });
console.log("FINAL:", process.env.ADMIN_PASSWORD_HASH);
