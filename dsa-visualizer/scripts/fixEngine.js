const fs = require('fs');
const filePath = 'src/utils/testWrapperGenerator.ts';
let content = fs.readFileSync(filePath, 'utf8');

// Replace \` with `
content = content.replace(/\\`/g, '`');

// Wait, I also need to make sure I didn't inject \$ instead of $
// In my script I wrote \${userCode}
// In Node template string, \${userCode} becomes ${userCode} without evaluation.
// But what about \\\${functionName}? It became \${functionName}. 
// In the TS file, the template string needs ${functionName} to interpolate the variable!
// If the TS file literally has \${functionName}, the template string will NOT evaluate it, it will literally output ${functionName}!
// Let's fix that as well.
content = content.replace(/\\\${/g, '${');

// Also fix \\n in the Python and JS wrappers. 
// I wrote \\\\n in the script, which became \\n in the TS file.
// In the TS template string, if it has \\n, it will output \n to the generated code. That is CORRECT for python print string.
// So \\n is fine.

fs.writeFileSync(filePath, content);
console.log('Fixed backticks and interpolation in TS file!');
