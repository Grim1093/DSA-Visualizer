const fs = require('fs');

let content = fs.readFileSync('src/utils/mockChallenges.ts', 'utf8');

// 1. We need to clear the generated test cases for product-except-self.
// We can just use a regex to replace the entire testCases block for it with the clean version.
const cleanBlock = `testCases: [
      { input: [[1,2,3,4]], expected: [24,12,8,6] },
      { input: [[-1,1,0,-3,3]], expected: [0,0,9,0,0] }
    ]`;

// Find where product-except-self starts
const pidx = content.indexOf("id: 'product-except-self'");
const tcIdx = content.indexOf("testCases: [", pidx);
const tcEndIdx = content.indexOf("    ]\n  },", tcIdx);

content = content.slice(0, tcIdx) + cleanBlock + content.slice(tcEndIdx + 5);

// Let's also re-inject SAFE product-except-self tests
const newTests = [];
for (let i = 0; i < 10; i++) {
    const length = 10; // SMALL length to avoid exceeding 32-bit int!
    const nums = Array.from({length}, () => Math.floor(Math.random() * 5) + 1); // 1 to 5
    const expected = [];
    for (let j = 0; j < length; j++) {
        let prod = 1;
        for (let k = 0; k < length; k++) {
            if (j !== k) prod *= nums[k];
        }
        expected.push(prod);
    }
    newTests.push({ input: [nums], expected });
}

const testsString = newTests.map(tc => `\n      { input: ${JSON.stringify(tc.input)}, expected: ${JSON.stringify(tc.expected)} },`).join('');
const insertPoint = content.indexOf("testCases: [", content.indexOf("id: 'product-except-self'")) + "testCases: [".length;

content = content.slice(0, insertPoint) + testsString + content.slice(insertPoint);

fs.writeFileSync('src/utils/mockChallenges.ts', content, 'utf8');
console.log("Fixed product-except-self test cases!");
