const fs = require('fs');
const filePath = 'src/utils/mockChallenges.ts';
let content = fs.readFileSync(filePath, 'utf8');

// Replace the literal string ',\n    ' with an actual comma and newline
content = content.replace(/,\\n\s*/g, ',\n  ');

fs.writeFileSync(filePath, content);
console.log('Fixed newlines!');
