const fs = require('fs');
const content = fs.readFileSync('src/utils/mockChallenges.ts', 'utf8');

let newContent = content.replace(/\]\];\s*export const getChallengeById/g, '];\n\nexport const getChallengeById');

newContent = newContent.replace(/,\n\[\n\s*{\n\s*"id": "remove-element"/, ',\n  {\n    "id": "remove-element"');

fs.writeFileSync('src/utils/mockChallenges.ts', newContent);
console.log('Fixed mockChallenges.ts');
