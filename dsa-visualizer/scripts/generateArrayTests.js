const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'utils', 'mockChallenges.ts');
let fileContent = fs.readFileSync(filePath, 'utf8');

function injectTests(challengeId, newTests) {
    const searchString = `id: '${challengeId}'`;
    const startIndex = fileContent.indexOf(searchString);
    if (startIndex === -1) {
        console.log(`Challenge ${challengeId} not found!`);
        return;
    }

    const testCasesIndex = fileContent.indexOf('testCases: [', startIndex);
    if (testCasesIndex === -1) return;

    // We want to insert the new tests right after the opening bracket of testCases: [
    const insertPoint = testCasesIndex + 'testCases: ['.length;

    const testsString = newTests.map(tc => `\n      { input: ${JSON.stringify(tc.input)}, expected: ${JSON.stringify(tc.expected)} },`).join('');
    
    fileContent = fileContent.slice(0, insertPoint) + testsString + fileContent.slice(insertPoint);
    console.log(`Injected ${newTests.length} tests into ${challengeId}`);
}

// 1. Two Sum
function generateTwoSumTests(count) {
    const tests = [];
    for (let i = 0; i < count; i++) {
        const length = 500;
        const nums = Array.from({length}, () => Math.floor(Math.random() * 2000) - 1000);
        const idx1 = Math.floor(Math.random() * length);
        let idx2 = Math.floor(Math.random() * length);
        while (idx1 === idx2) idx2 = Math.floor(Math.random() * length);
        const target = nums[idx1] + nums[idx2];
        
        // Ensure this is the unique solution by breaking other pairs manually if needed (simplified for mock)
        // A simple correct solution:
        let expected = [];
        for (let j = 0; j < nums.length; j++) {
            for (let k = j + 1; k < nums.length; k++) {
                if (nums[j] + nums[k] === target) {
                    expected = [j, k];
                    break;
                }
            }
            if (expected.length) break;
        }
        tests.push({ input: [nums, target], expected });
    }
    return tests;
}

// 2. Contains Duplicate
function generateContainsDuplicate(count) {
    const tests = [];
    for (let i = 0; i < count; i++) {
        const length = 1000;
        const nums = Array.from({length}, () => Math.floor(Math.random() * 5000));
        // Force duplicates in half of them
        if (i % 2 === 0) {
            nums[0] = nums[nums.length - 1]; // Guaranteed dup
        } else {
            // Guarantee no dup
            for (let j = 0; j < length; j++) nums[j] = j;
        }
        const expected = new Set(nums).size !== nums.length;
        tests.push({ input: [nums], expected });
    }
    return tests;
}

// 3. Product Except Self
function generateProductExceptSelf(count) {
    const tests = [];
    for (let i = 0; i < count; i++) {
        const length = 100;
        const nums = Array.from({length}, () => Math.floor(Math.random() * 10) + 1);
        const expected = [];
        for (let j = 0; j < length; j++) {
            let prod = 1;
            for (let k = 0; k < length; k++) {
                if (j !== k) prod *= nums[k];
            }
            expected.push(prod);
        }
        tests.push({ input: [nums], expected });
    }
    return tests;
}

// 4. Container With Most Water
function generateMaxArea(count) {
    const tests = [];
    for (let i = 0; i < count; i++) {
        const length = 500;
        const nums = Array.from({length}, () => Math.floor(Math.random() * 1000));
        let max = 0;
        for (let j = 0; j < length; j++) {
            for (let k = j + 1; k < length; k++) {
                const area = Math.min(nums[j], nums[k]) * (k - j);
                if (area > max) max = area;
            }
        }
        tests.push({ input: [nums], expected: max });
    }
    return tests;
}

// 5. Trapping Rain Water
function generateTrap(count) {
    const tests = [];
    for (let i = 0; i < count; i++) {
        const length = 500;
        const height = Array.from({length}, () => Math.floor(Math.random() * 100));
        let water = 0;
        for (let j = 0; j < length; j++) {
            let leftMax = 0;
            let rightMax = 0;
            for (let k = 0; k <= j; k++) leftMax = Math.max(leftMax, height[k]);
            for (let k = j; k < length; k++) rightMax = Math.max(rightMax, height[k]);
            water += Math.min(leftMax, rightMax) - height[j];
        }
        tests.push({ input: [height], expected: water });
    }
    return tests;
}

// 6. First Missing Positive
function generateFirstMissingPositive(count) {
    const tests = [];
    for (let i = 0; i < count; i++) {
        const length = 500;
        const nums = Array.from({length}, () => Math.floor(Math.random() * 600) - 100);
        let expected = 1;
        const set = new Set(nums);
        while (set.has(expected)) expected++;
        tests.push({ input: [nums], expected });
    }
    return tests;
}

console.log("Generating tests...");
injectTests('two-sum', generateTwoSumTests(10));
injectTests('contains-duplicate', generateContainsDuplicate(10));
injectTests('product-except-self', generateProductExceptSelf(10));
injectTests('container-with-most-water', generateMaxArea(10));
injectTests('trapping-rain-water', generateTrap(10));
injectTests('first-missing-positive', generateFirstMissingPositive(10));

fs.writeFileSync(filePath, fileContent, 'utf8');
console.log("Test generation complete.");
