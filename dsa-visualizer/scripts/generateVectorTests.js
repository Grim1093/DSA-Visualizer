const fs = require('fs');
const path = require('path');

function generateTests() {
  const challenges = [
    {
      id: 'remove-element',
      title: 'Remove Element',
      description: 'Given an integer array nums and an integer val, remove all occurrences of val in nums in-place. The order of the elements may be changed. Then return the number of elements in nums which are not equal to val.\n\nConsider the number of elements in nums which are not equal to val be k, to get accepted, you need to do the following things:\n1. Change the array nums such that the first k elements of nums contain the elements which are not equal to val. The remaining elements of nums are not important as well as the size of nums.\n2. Return k.',
      difficulty: 'Easy',
      category: 'data-structures',
      topic: 'Vectors',
      examples: [
        {
          input: 'nums = [3,2,2,3], val = 3',
          output: '2, nums = [2,2,_,_]',
          explanation: 'Your function should return k = 2, with the first two elements of nums being 2.'
        }
      ],
      constraints: [
        '0 <= nums.length <= 100',
        '0 <= nums[i] <= 50',
        '0 <= val <= 100'
      ],
      starterCode: {
        python: 'class Solution:\n    def removeElement(self, nums: List[int], val: int) -> int:\n        ',
        javascript: '/**\n * @param {number[]} nums\n * @param {number} val\n * @return {number}\n */\nvar removeElement = function(nums, val) {\n    \n};',
        cpp: 'class Solution {\npublic:\n    int removeElement(vector<int>& nums, int val) {\n        \n    }\n};',
        java: 'class Solution {\n    public int removeElement(int[] nums, int val) {\n        \n    }\n}',
        go: 'func removeElement(nums []int, val int) int {\n    \n}',
        kotlin: 'class Solution {\n    fun removeElement(nums: IntArray, val: Int): Int {\n        \n    }\n}'
      },
      functionName: 'removeElement',
      testCases: [
        { input: [[3, 2, 2, 3], 3], expected: 2, isHidden: false },
        { input: [[0, 1, 2, 2, 3, 0, 4, 2], 2], expected: 5, isHidden: false }
      ]
    },
    {
      id: 'squares-of-a-sorted-array',
      title: 'Squares of a Sorted Array',
      description: 'Given an integer array nums sorted in non-decreasing order, return an array of the squares of each number sorted in non-decreasing order.',
      difficulty: 'Easy',
      category: 'data-structures',
      topic: 'Vectors',
      examples: [
        {
          input: 'nums = [-4,-1,0,3,10]',
          output: '[0,1,9,16,100]',
          explanation: 'After squaring, the array becomes [16,1,0,9,100]. After sorting, it becomes [0,1,9,16,100].'
        }
      ],
      constraints: [
        '1 <= nums.length <= 10^4',
        '-10^4 <= nums[i] <= 10^4',
        'nums is sorted in non-decreasing order.'
      ],
      starterCode: {
        python: 'class Solution:\n    def sortedSquares(self, nums: List[int]) -> List[int]:\n        ',
        javascript: '/**\n * @param {number[]} nums\n * @return {number[]}\n */\nvar sortedSquares = function(nums) {\n    \n};',
        cpp: 'class Solution {\npublic:\n    vector<int> sortedSquares(vector<int>& nums) {\n        \n    }\n};',
        java: 'class Solution {\n    public int[] sortedSquares(int[] nums) {\n        \n    }\n}',
        go: 'func sortedSquares(nums []int) []int {\n    \n}',
        kotlin: 'class Solution {\n    fun sortedSquares(nums: IntArray): IntArray {\n        \n    }\n}'
      },
      functionName: 'sortedSquares',
      testCases: [
        { input: [[-4, -1, 0, 3, 10]], expected: [0, 1, 9, 16, 100], isHidden: false },
        { input: [[-7, -3, 2, 3, 11]], expected: [4, 9, 9, 49, 121], isHidden: false }
      ]
    },
    {
      id: 'maximum-subarray',
      title: 'Maximum Subarray',
      description: 'Given an integer array nums, find the subarray with the largest sum, and return its sum.',
      difficulty: 'Medium',
      category: 'data-structures',
      topic: 'Vectors',
      examples: [
        {
          input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]',
          output: '6',
          explanation: 'The subarray [4,-1,2,1] has the largest sum 6.'
        }
      ],
      constraints: [
        '1 <= nums.length <= 10^5',
        '-10^4 <= nums[i] <= 10^4'
      ],
      starterCode: {
        python: 'class Solution:\n    def maxSubArray(self, nums: List[int]) -> int:\n        ',
        javascript: '/**\n * @param {number[]} nums\n * @return {number}\n */\nvar maxSubArray = function(nums) {\n    \n};',
        cpp: 'class Solution {\npublic:\n    int maxSubArray(vector<int>& nums) {\n        \n    }\n};',
        java: 'class Solution {\n    public int maxSubArray(int[] nums) {\n        \n    }\n}',
        go: 'func maxSubArray(nums []int) int {\n    \n}',
        kotlin: 'class Solution {\n    fun maxSubArray(nums: IntArray): Int {\n        \n    }\n}'
      },
      functionName: 'maxSubArray',
      testCases: [
        { input: [[-2, 1, -3, 4, -1, 2, 1, -5, 4]], expected: 6, isHidden: false },
        { input: [[1]], expected: 1, isHidden: false },
        { input: [[5, 4, -1, 7, 8]], expected: 23, isHidden: false }
      ]
    },
    {
      id: 'subarray-sum-equals-k',
      title: 'Subarray Sum Equals K',
      description: 'Given an array of integers nums and an integer k, return the total number of subarrays whose sum equals to k. A subarray is a contiguous non-empty sequence of elements within an array.',
      difficulty: 'Medium',
      category: 'data-structures',
      topic: 'Vectors',
      examples: [
        {
          input: 'nums = [1,1,1], k = 2',
          output: '2',
          explanation: ''
        }
      ],
      constraints: [
        '1 <= nums.length <= 2 * 10^4',
        '-1000 <= nums[i] <= 1000',
        '-10^7 <= k <= 10^7'
      ],
      starterCode: {
        python: 'class Solution:\n    def subarraySum(self, nums: List[int], k: int) -> int:\n        ',
        javascript: '/**\n * @param {number[]} nums\n * @param {number} k\n * @return {number}\n */\nvar subarraySum = function(nums, k) {\n    \n};',
        cpp: 'class Solution {\npublic:\n    int subarraySum(vector<int>& nums, int k) {\n        \n    }\n};',
        java: 'class Solution {\n    public int subarraySum(int[] nums, int k) {\n        \n    }\n}',
        go: 'func subarraySum(nums []int, k int) int {\n    \n}',
        kotlin: 'class Solution {\n    fun subarraySum(nums: IntArray, k: Int): Int {\n        \n    }\n}'
      },
      functionName: 'subarraySum',
      testCases: [
        { input: [[1, 1, 1], 2], expected: 2, isHidden: false },
        { input: [[1, 2, 3], 3], expected: 2, isHidden: false }
      ]
    },
    {
      id: 'longest-consecutive-sequence',
      title: 'Longest Consecutive Sequence',
      description: 'Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.\n\nYou must write an algorithm that runs in O(n) time.',
      difficulty: 'Hard',
      category: 'data-structures',
      topic: 'Vectors',
      examples: [
        {
          input: 'nums = [100,4,200,1,3,2]',
          output: '4',
          explanation: 'The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.'
        }
      ],
      constraints: [
        '0 <= nums.length <= 10^5',
        '-10^9 <= nums[i] <= 10^9'
      ],
      starterCode: {
        python: 'class Solution:\n    def longestConsecutive(self, nums: List[int]) -> int:\n        ',
        javascript: '/**\n * @param {number[]} nums\n * @return {number}\n */\nvar longestConsecutive = function(nums) {\n    \n};',
        cpp: 'class Solution {\npublic:\n    int longestConsecutive(vector<int>& nums) {\n        \n    }\n};',
        java: 'class Solution {\n    public int longestConsecutive(int[] nums) {\n        \n    }\n}',
        go: 'func longestConsecutive(nums []int) int {\n    \n}',
        kotlin: 'class Solution {\n    fun longestConsecutive(nums: IntArray): Int {\n        \n    }\n}'
      },
      functionName: 'longestConsecutive',
      testCases: [
        { input: [[100, 4, 200, 1, 3, 2]], expected: 4, isHidden: false },
        { input: [[0, 3, 7, 2, 5, 8, 4, 6, 0, 1]], expected: 9, isHidden: false }
      ]
    },
    {
      id: 'sliding-window-maximum',
      title: 'Sliding Window Maximum',
      description: 'You are given an array of integers nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position.\n\nReturn the max sliding window.',
      difficulty: 'Hard',
      category: 'data-structures',
      topic: 'Vectors',
      examples: [
        {
          input: 'nums = [1,3,-1,-3,5,3,6,7], k = 3',
          output: '[3,3,5,5,6,7]',
          explanation: 'Window position                Max\n---------------               -----\n[1  3  -1] -3  5  3  6  7       3\n 1 [3  -1  -3] 5  3  6  7       3\n 1  3 [-1  -3  5] 3  6  7       5\n 1  3  -1 [-3  5  3] 6  7       5\n 1  3  -1  -3 [5  3  6] 7       6\n 1  3  -1  -3  5 [3  6  7]      7'
        }
      ],
      constraints: [
        '1 <= nums.length <= 10^5',
        '-10^4 <= nums[i] <= 10^4',
        '1 <= k <= nums.length'
      ],
      starterCode: {
        python: 'class Solution:\n    def maxSlidingWindow(self, nums: List[int], k: int) -> List[int]:\n        ',
        javascript: '/**\n * @param {number[]} nums\n * @param {number} k\n * @return {number[]}\n */\nvar maxSlidingWindow = function(nums, k) {\n    \n};',
        cpp: 'class Solution {\npublic:\n    vector<int> maxSlidingWindow(vector<int>& nums, int k) {\n        \n    }\n};',
        java: 'class Solution {\n    public int[] maxSlidingWindow(int[] nums, int k) {\n        \n    }\n}',
        go: 'func maxSlidingWindow(nums []int, k int) []int {\n    \n}',
        kotlin: 'class Solution {\n    fun maxSlidingWindow(nums: IntArray, k: Int): IntArray {\n        \n    }\n}'
      },
      functionName: 'maxSlidingWindow',
      testCases: [
        { input: [[1, 3, -1, -3, 5, 3, 6, 7], 3], expected: [3, 3, 5, 5, 6, 7], isHidden: false },
        { input: [[1], 1], expected: [1], isHidden: false }
      ]
    }
  ];

  // Generate massive test cases
  const generateRandomArray = (size, min = -1000, max = 1000) => {
    const arr = [];
    for (let i = 0; i < size; i++) {
      arr.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return arr;
  };

  challenges.forEach(challenge => {
    for (let i = 0; i < 10; i++) {
      const size = Math.floor(Math.random() * 500) + 100; // Large size arrays
      const nums = generateRandomArray(size);

      let tc = null;

      if (challenge.id === 'remove-element') {
        const val = nums[Math.floor(Math.random() * nums.length)];
        let count = 0;
        for (let j = 0; j < nums.length; j++) {
          if (nums[j] !== val) count++;
        }
        tc = { input: [nums, val], expected: count, isHidden: true };
      } 
      else if (challenge.id === 'squares-of-a-sorted-array') {
        nums.sort((a, b) => a - b);
        const expected = nums.map(x => x * x).sort((a, b) => a - b);
        tc = { input: [nums], expected, isHidden: true };
      } 
      else if (challenge.id === 'maximum-subarray') {
        let max_so_far = -Infinity;
        let current_max = 0;
        for (let j = 0; j < nums.length; j++) {
          current_max = Math.max(nums[j], current_max + nums[j]);
          max_so_far = Math.max(max_so_far, current_max);
        }
        tc = { input: [nums], expected: max_so_far, isHidden: true };
      } 
      else if (challenge.id === 'subarray-sum-equals-k') {
        const k = Math.floor(Math.random() * 2000) - 1000;
        let count = 0;
        let sum = 0;
        const prefixSum = new Map();
        prefixSum.set(0, 1);
        for (let j = 0; j < nums.length; j++) {
          sum += nums[j];
          if (prefixSum.has(sum - k)) count += prefixSum.get(sum - k);
          prefixSum.set(sum, (prefixSum.get(sum) || 0) + 1);
        }
        tc = { input: [nums, k], expected: count, isHidden: true };
      } 
      else if (challenge.id === 'longest-consecutive-sequence') {
        const set = new Set(nums);
        let maxLen = 0;
        for (const num of set) {
          if (!set.has(num - 1)) {
            let currentNum = num;
            let currentStreak = 1;
            while (set.has(currentNum + 1)) {
              currentNum++;
              currentStreak++;
            }
            maxLen = Math.max(maxLen, currentStreak);
          }
        }
        tc = { input: [nums], expected: maxLen, isHidden: true };
      } 
      else if (challenge.id === 'sliding-window-maximum') {
        const k = Math.floor(Math.random() * (size / 2)) + 1;
        const expected = [];
        for (let j = 0; j <= nums.length - k; j++) {
          let max = -Infinity;
          for (let m = j; m < j + k; m++) {
            if (nums[m] > max) max = nums[m];
          }
          expected.push(max);
        }
        tc = { input: [nums, k], expected, isHidden: true };
      }

      if (tc) {
        challenge.testCases.push(tc);
      }
    }
  });

  const filePath = path.join(__dirname, '..', 'src', 'utils', 'mockChallenges.ts');
  let fileContent = fs.readFileSync(filePath, 'utf8');

  // Insert before the closing bracket of the mockChallenges array
  const insertionPoint = fileContent.lastIndexOf('];');
  if (insertionPoint !== -1) {
    const stringifiedChallenges = ',\n' + JSON.stringify(challenges, null, 2);
    fileContent = fileContent.substring(0, insertionPoint) + stringifiedChallenges + fileContent.substring(insertionPoint);
    fs.writeFileSync(filePath, fileContent);
    console.log('Successfully injected 6 Vector challenges with massive test suites!');
  } else {
    console.error('Could not find the closing bracket of mockChallenges array.');
  }
}

generateTests();
