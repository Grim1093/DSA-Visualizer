const fs = require('fs');
const path = require('path');

const hashMapChallenges = [
  {
    id: 'two-sum',
    title: 'Two Sum',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.',
    difficulty: 'Easy',
    category: 'data-structures',
    topic: 'Hash Map',
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
      },
      {
        input: 'nums = [3,2,4], target = 6',
        output: '[1,2]'
      }
    ],
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.'
    ],
    starterCode: {
      python: 'class Solution:\\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\\n        ',
      javascript: 'var twoSum = function(nums, target) {\\n    \\n};',
      cpp: 'class Solution {\\npublic:\\n    vector<int> twoSum(vector<int>& nums, int target) {\\n        \\n    }\\n};',
      java: 'class Solution {\\n    public int[] twoSum(int[] nums, int target) {\\n        \\n    }\\n}',
      go: 'func twoSum(nums []int, target int) []int {\\n    \\n}',
      kotlin: 'class Solution {\\n    fun twoSum(nums: IntArray, target: Int): IntArray {\\n        \\n    }\\n}'
    },
    functionName: 'twoSum',
    testCases: [
      { input: [[2,7,11,15], 9], expected: [0,1] },
      { input: [[3,2,4], 6], expected: [1,2] },
      { input: [[3,3], 6], expected: [0,1] },
      { input: [[1, 5, 2, 8, 4, 10], 12], expected: [3, 4], isHidden: true },
      { input: [[-5, -2, -1, 0, 3, 7, 9], 8], expected: [2, 6], isHidden: true }
    ]
  },
  {
    id: 'contains-duplicate',
    title: 'Contains Duplicate',
    description: 'Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.',
    difficulty: 'Easy',
    category: 'data-structures',
    topic: 'Hash Map',
    examples: [
      {
        input: 'nums = [1,2,3,1]',
        output: 'true'
      },
      {
        input: 'nums = [1,2,3,4]',
        output: 'false'
      }
    ],
    constraints: [
      '1 <= nums.length <= 10^5',
      '-10^9 <= nums[i] <= 10^9'
    ],
    starterCode: {
      python: 'class Solution:\\n    def containsDuplicate(self, nums: List[int]) -> bool:\\n        ',
      javascript: 'var containsDuplicate = function(nums) {\\n    \\n};',
      cpp: 'class Solution {\\npublic:\\n    bool containsDuplicate(vector<int>& nums) {\\n        \\n    }\\n};',
      java: 'class Solution {\\n    public boolean containsDuplicate(int[] nums) {\\n        \\n    }\\n}',
      go: 'func containsDuplicate(nums []int) bool {\\n    \\n}',
      kotlin: 'class Solution {\\n    fun containsDuplicate(nums: IntArray): Boolean {\\n        \\n    }\\n}'
    },
    functionName: 'containsDuplicate',
    testCases: [
      { input: [[1,2,3,1]], expected: true },
      { input: [[1,2,3,4]], expected: false },
      { input: [[1,1,1,3,3,4,3,2,4,2]], expected: true },
      { input: [[10, 20, 30, 40, 50, 60, 70, 80, 90, 10]], expected: true, isHidden: true },
      { input: [[-100, -200, -300, -400, 100]], expected: false, isHidden: true }
    ]
  },
  {
    id: 'single-number',
    title: 'Single Number',
    description: 'Given a non-empty array of integers nums, every element appears twice except for one. Find that single one. You must implement a solution with a linear runtime complexity and use only constant extra space.',
    difficulty: 'Easy',
    category: 'data-structures',
    topic: 'Hash Map',
    examples: [
      {
        input: 'nums = [2,2,1]',
        output: '1'
      },
      {
        input: 'nums = [4,1,2,1,2]',
        output: '4'
      }
    ],
    constraints: [
      '1 <= nums.length <= 3 * 10^4',
      '-3 * 10^4 <= nums[i] <= 3 * 10^4',
      'Each element in the array appears twice except for one element which appears only once.'
    ],
    starterCode: {
      python: 'class Solution:\\n    def singleNumber(self, nums: List[int]) -> int:\\n        ',
      javascript: 'var singleNumber = function(nums) {\\n    \\n};',
      cpp: 'class Solution {\\npublic:\\n    int singleNumber(vector<int>& nums) {\\n        \\n    }\\n};',
      java: 'class Solution {\\n    public int singleNumber(int[] nums) {\\n        \\n    }\\n}',
      go: 'func singleNumber(nums []int) int {\\n    \\n}',
      kotlin: 'class Solution {\\n    fun singleNumber(nums: IntArray): Int {\\n        \\n    }\\n}'
    },
    functionName: 'singleNumber',
    testCases: [
      { input: [[2,2,1]], expected: 1 },
      { input: [[4,1,2,1,2]], expected: 4 },
      { input: [[1]], expected: 1 },
      { input: [[-10, -10, 50, 50, -30]], expected: -30, isHidden: true },
      { input: [[100, 200, 300, 400, 500, 400, 300, 200, 100]], expected: 500, isHidden: true }
    ]
  },
  {
    id: 'majority-element',
    title: 'Majority Element',
    description: 'Given an array nums of size n, return the majority element. The majority element is the element that appears more than ⌊n / 2⌋ times. You may assume that the majority element always exists in the array.',
    difficulty: 'Easy',
    category: 'data-structures',
    topic: 'Hash Map',
    examples: [
      {
        input: 'nums = [3,2,3]',
        output: '3'
      },
      {
        input: 'nums = [2,2,1,1,1,2,2]',
        output: '2'
      }
    ],
    constraints: [
      'n == nums.length',
      '1 <= n <= 5 * 10^4',
      '-10^9 <= nums[i] <= 10^9'
    ],
    starterCode: {
      python: 'class Solution:\\n    def majorityElement(self, nums: List[int]) -> int:\\n        ',
      javascript: 'var majorityElement = function(nums) {\\n    \\n};',
      cpp: 'class Solution {\\npublic:\\n    int majorityElement(vector<int>& nums) {\\n        \\n    }\\n};',
      java: 'class Solution {\\n    public int majorityElement(int[] nums) {\\n        \\n    }\\n}',
      go: 'func majorityElement(nums []int) int {\\n    \\n}',
      kotlin: 'class Solution {\\n    fun majorityElement(nums: IntArray): Int {\\n        \\n    }\\n}'
    },
    functionName: 'majorityElement',
    testCases: [
      { input: [[3,2,3]], expected: 3 },
      { input: [[2,2,1,1,1,2,2]], expected: 2 },
      { input: [[1]], expected: 1 },
      { input: [[5, 5, 5, 5, 2, 1, 5, 5, 10]], expected: 5, isHidden: true },
      { input: [[-1, 1, 1, 1, 2, 1]], expected: 1, isHidden: true }
    ]
  },
  {
    id: 'intersection-of-two-arrays',
    title: 'Intersection of Two Arrays',
    description: 'Given two integer arrays nums1 and nums2, return an array of their intersection. Each element in the result must be unique and you may return the result in any order.',
    difficulty: 'Easy',
    category: 'data-structures',
    topic: 'Hash Map',
    examples: [
      {
        input: 'nums1 = [1,2,2,1], nums2 = [2,2]',
        output: '[2]'
      },
      {
        input: 'nums1 = [4,9,5], nums2 = [9,4,9,8,4]',
        output: '[9,4]',
        explanation: '[4,9] is also accepted.'
      }
    ],
    constraints: [
      '1 <= nums1.length, nums2.length <= 1000',
      '0 <= nums1[i], nums2[i] <= 1000'
    ],
    starterCode: {
      python: 'class Solution:\\n    def intersection(self, nums1: List[int], nums2: List[int]) -> List[int]:\\n        ',
      javascript: 'var intersection = function(nums1, nums2) {\\n    \\n};',
      cpp: 'class Solution {\\npublic:\\n    vector<int> intersection(vector<int>& nums1, vector<int>& nums2) {\\n        \\n    }\\n};',
      java: 'class Solution {\\n    public int[] intersection(int[] nums1, int[] nums2) {\\n        \\n    }\\n}',
      go: 'func intersection(nums1 []int, nums2 []int) []int {\\n    \\n}',
      kotlin: 'class Solution {\\n    fun intersection(nums1: IntArray, nums2: IntArray): IntArray {\\n        \\n    }\\n}'
    },
    functionName: 'intersection',
    testCases: [
      { input: [[1,2,2,1], [2,2]], expected: [2] },
      { input: [[4,9,5], [9,4,9,8,4]], expected: [4,9] },
      { input: [[1,2,3], [4,5,6]], expected: [] },
      { input: [[1,1,1,1], [1,1]], expected: [1], isHidden: true },
      { input: [[100, 200, 300, 400], [200, 400, 600, 800]], expected: [200, 400], isHidden: true }
    ]
  },
  {
    id: 'find-duplicate',
    title: 'Find the Duplicate Number',
    description: 'Given an array of integers nums containing n + 1 integers where each integer is in the range [1, n] inclusive. There is only one repeated number in nums, return this repeated number.',
    difficulty: 'Medium',
    category: 'data-structures',
    topic: 'Hash Map',
    examples: [
      {
        input: 'nums = [1,3,4,2,2]',
        output: '2'
      },
      {
        input: 'nums = [3,1,3,4,2]',
        output: '3'
      }
    ],
    constraints: [
      '1 <= n <= 10^5',
      'nums.length == n + 1',
      '1 <= nums[i] <= n',
      'All the integers in nums appear only once except for precisely one integer which appears two or more times.'
    ],
    starterCode: {
      python: 'class Solution:\\n    def findDuplicate(self, nums: List[int]) -> int:\\n        ',
      javascript: 'var findDuplicate = function(nums) {\\n    \\n};',
      cpp: 'class Solution {\\npublic:\\n    int findDuplicate(vector<int>& nums) {\\n        \\n    }\\n};',
      java: 'class Solution {\\n    public int findDuplicate(int[] nums) {\\n        \\n    }\\n}',
      go: 'func findDuplicate(nums []int) int {\\n    \\n}',
      kotlin: 'class Solution {\\n    fun findDuplicate(nums: IntArray): Int {\\n        \\n    }\\n}'
    },
    functionName: 'findDuplicate',
    testCases: [
      { input: [[1,3,4,2,2]], expected: 2 },
      { input: [[3,1,3,4,2]], expected: 3 },
      { input: [[3,3,3,3,3]], expected: 3 },
      { input: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 10]], expected: 10, isHidden: true },
      { input: [[2, 2, 2, 2, 2, 2, 2, 2]], expected: 2, isHidden: true }
    ]
  }
];

const challengesPath = path.join(__dirname, '../src/utils/mockChallenges.ts');
let fileContent = fs.readFileSync(challengesPath, 'utf8');

const insertionPoint = fileContent.lastIndexOf('];');
if (insertionPoint !== -1) {
  const jsonToAdd = JSON.stringify(hashMapChallenges, null, 2);
  const newContent = fileContent.substring(0, insertionPoint) + '  ,\n' + jsonToAdd.substring(1, jsonToAdd.length - 1) + '\\n];\\n';
  fs.writeFileSync(challengesPath, newContent, 'utf8');
  console.log('Appended 6 Hash Map challenges to mockChallenges.ts');
} else {
  console.log('Could not find the end of the mockChallenges array.');
}
