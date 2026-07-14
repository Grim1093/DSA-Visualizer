export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface TestCase {
  input: any[];
  expected: any;
}

export interface Challenge {
  id: string;
  title: string;
  category: 'algorithms' | 'data-structures';
  difficulty: Difficulty;
  description: string;
  functionName: string;
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  constraints: string[];
  starterCode: {
    python: string;
    javascript: string;
    cpp: string;
    java?: string;
    go?: string;
    kotlin?: string;
  };
  testCases: TestCase[];
}

export const mockChallenges: Challenge[] = [
  {
    id: 'binary-search',
    title: 'Implement Binary Search',
    category: 'algorithms',
    difficulty: 'Easy',
    description: 'Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.\n\nYou must write an algorithm with O(log n) runtime complexity.',
    functionName: 'search',
    examples: [
      { input: 'nums = [-1,0,3,5,9,12], target = 9', output: '4', explanation: '9 exists in nums and its index is 4' },
      { input: 'nums = [-1,0,3,5,9,12], target = 2', output: '-1', explanation: '2 does not exist in nums so return -1' }
    ],
    constraints: [
      '1 <= nums.length <= 10^4',
      '-10^4 < nums[i], target < 10^4',
      'All the integers in nums are unique.',
      'nums is sorted in ascending order.'
    ],
    starterCode: {
      python: `def search(nums, target):\n    pass`,
      javascript: `function search(nums, target) {\n\n}`,
      cpp: `#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        \n    }\n};`,
      java: `class Solution {\n    public int search(int[] nums, int target) {\n        \n    }\n}`,
      go: `func search(nums []int, target int) int {\n    \n}`,
      kotlin: `class Solution {\n    fun search(nums: IntArray, target: Int): Int {\n        \n    }\n}`
    },
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
    functionName: 'isValid',
    examples: [
      { input: 's = "()"', output: 'true' },
      { input: 's = "()[]{}"', output: 'true' },
      { input: 's = "(]"', output: 'false' }
    ],
    constraints: ['1 <= s.length <= 10^4', 's consists of parentheses only "()[]{}"'],
    starterCode: {
      python: `def isValid(s):\n    pass`,
      javascript: `function isValid(s) {\n\n}`,
      cpp: `using namespace std;\n#include <string>\n\nclass Solution {\npublic:\n    bool isValid(string s) {\n        \n    }\n};`,
      java: `class Solution {\n    public boolean isValid(String s) {\n        \n    }\n}`,
      go: `func isValid(s string) bool {\n    \n}`,
      kotlin: `class Solution {\n    fun isValid(s: String): Boolean {\n        \n    }\n}`
    },
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
    functionName: 'findKthLargest',
    examples: [
      { input: 'nums = [3,2,1,5,6,4], k = 2', output: '5' },
      { input: 'nums = [3,2,3,1,2,4,5,5,6], k = 4', output: '4' }
    ],
    constraints: ['1 <= k <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4'],
    starterCode: {
      python: `def findKthLargest(nums, k):\n    pass`,
      javascript: `function findKthLargest(nums, k) {\n\n}`,
      cpp: `#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    int findKthLargest(vector<int>& nums, int k) {\n        \n    }\n};`,
      java: `class Solution {\n    public int findKthLargest(int[] nums, int k) {\n        \n    }\n}`,
      go: `func findKthLargest(nums []int, k int) int {\n    \n}`,
      kotlin: `class Solution {\n    fun findKthLargest(nums: IntArray, k: Int): Int {\n        \n    }\n}`
    },
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
    functionName: 'climbStairs',
    examples: [
      { input: 'n = 2', output: '2', explanation: '1. 1 step + 1 step\n2. 2 steps' },
      { input: 'n = 3', output: '3', explanation: '1. 1 step + 1 step + 1 step\n2. 1 step + 2 steps\n3. 2 steps + 1 step' }
    ],
    constraints: ['1 <= n <= 45'],
    starterCode: {
      python: `def climbStairs(n):\n    pass`,
      javascript: `function climbStairs(n) {\n\n}`,
      cpp: `class Solution {\npublic:\n    int climbStairs(int n) {\n        \n    }\n};`,
      java: `class Solution {\n    public int climbStairs(int n) {\n        \n    }\n}`,
      go: `func climbStairs(n int) int {\n    \n}`,
      kotlin: `class Solution {\n    fun climbStairs(n: Int): Int {\n        \n    }\n}`
    },
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
    functionName: 'coinChange',
    examples: [
      { input: 'coins = [1,2,5], amount = 11', output: '3', explanation: '11 = 5 + 5 + 1' },
      { input: 'coins = [2], amount = 3', output: '-1' }
    ],
    constraints: ['1 <= coins.length <= 12', '1 <= coins[i] <= 2^31 - 1', '0 <= amount <= 10^4'],
    starterCode: {
      python: `def coinChange(coins, amount):\n    pass`,
      javascript: `function coinChange(coins, amount) {\n\n}`,
      cpp: `#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    int coinChange(vector<int>& coins, int amount) {\n        \n    }\n};`,
      java: `class Solution {\n    public int coinChange(int[] coins, int amount) {\n        \n    }\n}`,
      go: `func coinChange(coins []int, amount int) int {\n    \n}`,
      kotlin: `class Solution {\n    fun coinChange(coins: IntArray, amount: Int): Int {\n        \n    }\n}`
    },
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
    functionName: 'networkDelayTime',
    examples: [
      { input: 'times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2', output: '2' },
      { input: 'times = [[1,2,1]], n = 2, k = 1', output: '1' }
    ],
    constraints: ['1 <= k <= n <= 100', '1 <= times.length <= 6000', 'times[i].length == 3', '0 <= wi <= 100'],
    starterCode: {
      python: `def networkDelayTime(times, n, k):\n    pass`,
      javascript: `function networkDelayTime(times, n, k) {\n\n}`,
      cpp: `#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    int networkDelayTime(vector<vector<int>>& times, int n, int k) {\n        \n    }\n};`,
      java: `class Solution {\n    public int networkDelayTime(int[][] times, int n, int k) {\n        \n    }\n}`,
      go: `func networkDelayTime(times [][]int, n int, k int) int {\n    \n}`,
      kotlin: `class Solution {\n    fun networkDelayTime(times: Array<IntArray>, n: Int, k: Int): Int {\n        \n    }\n}`
    },
    testCases: [
      { input: [[[2,1,1],[2,3,1],[3,4,1]], 4, 2], expected: 2 },
      { input: [[[1,2,1]], 2, 1], expected: 1 },
      { input: [[[1,2,1]], 2, 2], expected: -1 }
    ]
  }
];

export const getChallengeById = (id: string) => {
  return mockChallenges.find(c => c.id === id);
};

export const getChallengesByCategory = (category: 'algorithms' | 'data-structures') => {
  return mockChallenges.filter(c => c.category === category);
};
