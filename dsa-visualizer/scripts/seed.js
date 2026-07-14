process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
require('dotenv').config({ path: '.env.local' });
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const challenges = [
  {
    id: 'binary-search',
    title: 'Implement Binary Search',
    difficulty: 'Easy',
    category: 'algorithms',
    description: 'Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.\n\nYou must write an algorithm with O(log n) runtime complexity.',
    constraints: [
      '1 <= nums.length <= 10^4',
      '-10^4 < nums[i], target < 10^4',
      'All the integers in nums are unique.',
      'nums is sorted in ascending order.'
    ],
    testCases: [
      { input: [[-1,0,3,5,9,12], 9], expected: 4 },
      { input: [[-1,0,3,5,9,12], 2], expected: -1 },
      { input: [[5], 5], expected: 0 },
      { input: [[5], -5], expected: -1 }
    ]
  },
  {
    id: 'valid-parentheses',
    title: 'Valid Parentheses',
    category: 'data-structures',
    difficulty: 'Easy',
    description: 'Given a string s containing just the characters "(", ")", "{", "}", "[" and "]", determine if the input string is valid.\n\nAn input string is valid if: Open brackets must be closed by the same type of brackets, and Open brackets must be closed in the correct order.',
    constraints: ['1 <= s.length <= 10^4', 's consists of parentheses only "()[]{}"'],
    testCases: [
      { input: ["()"], expected: true },
      { input: ["()[]{}"], expected: true },
      { input: ["(]"], expected: false },
      { input: ["([)]"], expected: false },
      { input: ["{[]}"], expected: true }
    ]
  },
  {
    id: 'kth-largest-element',
    title: 'Kth Largest Element in an Array (Heap)',
    category: 'data-structures',
    difficulty: 'Medium',
    description: 'Given an integer array nums and an integer k, return the kth largest element in the array.\n\nNote that it is the kth largest element in the sorted order, not the kth distinct element.\n\nYou must solve it in O(n) time complexity.',
    constraints: ['1 <= k <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4'],
    testCases: [
      { input: [[3,2,1,5,6,4], 2], expected: 5 },
      { input: [[3,2,3,1,2,4,5,5,6], 4], expected: 4 },
      { input: [[1], 1], expected: 1 }
    ]
  },
  {
    id: 'climbing-stairs',
    title: 'Climbing Stairs (Dynamic Programming)',
    category: 'algorithms',
    difficulty: 'Easy',
    description: 'You are climbing a staircase. It takes n steps to reach the top.\n\nEach time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?',
    constraints: ['1 <= n <= 45'],
    testCases: [
      { input: [2], expected: 2 },
      { input: [3], expected: 3 },
      { input: [4], expected: 5 },
      { input: [5], expected: 8 }
    ]
  },
  {
    id: 'coin-change',
    title: 'Coin Change (Dynamic Programming)',
    category: 'algorithms',
    difficulty: 'Medium',
    description: 'You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.\n\nReturn the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.\n\nYou may assume that you have an infinite number of each kind of coin.',
    constraints: ['1 <= coins.length <= 12', '1 <= coins[i] <= 2^31 - 1', '0 <= amount <= 10^4'],
    testCases: [
      { input: [[1,2,5], 11], expected: 3 },
      { input: [[2], 3], expected: -1 },
      { input: [[1], 0], expected: 0 },
      { input: [[186,419,83,408], 6249], expected: 20 }
    ]
  },
  {
    id: 'network-delay-time',
    title: 'Network Delay Time (Dijkstra)',
    category: 'algorithms',
    difficulty: 'Medium',
    description: 'You are given a network of n nodes, labeled from 1 to n. You are also given times, a list of travel times as directed edges times[i] = (ui, vi, wi), where ui is the source node, vi is the target node, and wi is the time it takes for a signal to travel from source to target.\n\nWe will send a signal from a given node k. Return the minimum time it takes for all the n nodes to receive the signal. If it is impossible for all the n nodes to receive the signal, return -1.',
    constraints: ['1 <= k <= n <= 100', '1 <= times.length <= 6000', 'times[i].length == 3', '0 <= wi <= 100'],
    testCases: [
      { input: [[[2,1,1],[2,3,1],[3,4,1]], 4, 2], expected: 2 },
      { input: [[[1,2,1]], 2, 1], expected: 1 },
      { input: [[[1,2,1]], 2, 2], expected: -1 }
    ]
  }
];

async function seed() {
  try {
    console.log('Seeding challenges...');
    
    await pool.query('DELETE FROM testcases');
    await pool.query('DELETE FROM challenges');

    for (const c of challenges) {
      await pool.query(
        `INSERT INTO challenges (id, title, difficulty, category, description, constraints)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [c.id, c.title, c.difficulty, c.category, c.description, c.constraints]
      );
      
      for (const tc of c.testCases) {
        await pool.query(
          `INSERT INTO testcases (challenge_id, input, expected_output, is_hidden)
           VALUES ($1, $2, $3, $4)`,
          [c.id, JSON.stringify(tc.input), JSON.stringify(tc.expected), false]
        );
      }
      console.log(`Inserted challenge: \${c.title}`);
    }
    console.log('Seeding completed!');
  } catch (error) {
    console.error('Seeding error:', error);
  } finally {
    pool.end();
  }
}

seed();
