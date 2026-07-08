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
      {
        input: 'nums = [-1,0,3,5,9,12], target = 9',
        output: '4',
        explanation: '9 exists in nums and its index is 4'
      },
      {
        input: 'nums = [-1,0,3,5,9,12], target = 2',
        output: '-1',
        explanation: '2 does not exist in nums so return -1'
      }
    ],
    constraints: [
      '1 <= nums.length <= 10^4',
      '-10^4 < nums[i], target < 10^4',
      'All the integers in nums are unique.',
      'nums is sorted in ascending order.'
    ],
    starterCode: {
      python: `def search(nums, target):
    pass`,
      javascript: `function search(nums, target) {

}`,
      cpp: `#include <vector>
#include <iostream>
using namespace std;

class Solution {
public:
    int search(vector<int>& nums, int target) {
        
    }
};`
    },
    testCases: [
      { input: [[-1,0,3,5,9,12], 9], expected: 4 },
      { input: [[-1,0,3,5,9,12], 2], expected: -1 },
      { input: [[5], 5], expected: 0 },
      { input: [[5], -5], expected: -1 }
    ]
  },
  {
    id: 'merge-sort',
    title: 'Sort an Array',
    category: 'algorithms',
    difficulty: 'Medium',
    description: 'Given an array of integers nums, sort the array in ascending order and return it.\n\nYou must solve the problem without using any built-in functions in O(n log(n)) time complexity and with the smallest space complexity possible.',
    functionName: 'sortArray',
    examples: [
      {
        input: 'nums = [5,2,3,1]',
        output: '[1,2,3,5]'
      }
    ],
    constraints: [
      '1 <= nums.length <= 5 * 10^4',
      '-5 * 10^4 <= nums[i] <= 5 * 10^4'
    ],
    starterCode: {
      python: `def sortArray(nums):
    pass`,
      javascript: `function sortArray(nums) {

}`,
      cpp: `#include <vector>
#include <iostream>
using namespace std;

class Solution {
public:
    vector<int> sortArray(vector<int>& nums) {
        
    }
};`
    },
    testCases: [
      { input: [[5,2,3,1]], expected: [1,2,3,5] },
      { input: [[5,1,1,2,0,0]], expected: [0,0,1,1,2,5] },
      { input: [[-1,2,-8,-10]], expected: [-10,-8,-1,2] }
    ]
  },
  {
    id: 'reverse-linked-list',
    title: 'Reverse Linked List',
    category: 'data-structures',
    difficulty: 'Easy',
    description: 'Given the head of a singly linked list, reverse the list, and return the reversed list.',
    functionName: 'reverseList',
    examples: [
      {
        input: 'head = [1,2,3,4,5]',
        output: '[5,4,3,2,1]'
      }
    ],
    constraints: [
      'The number of nodes in the list is the range [0, 5000].',
      '-5000 <= Node.val <= 5000'
    ],
    starterCode: {
      python: `# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
def reverseList(head):
    pass`,
      javascript: `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
function reverseList(head) {

}`,
      cpp: `#include <iostream>
using namespace std;

/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        
    }
};`
    },
    testCases: [
      // For a complex object like a linked list, we'll need special handling in the wrapper,
      // but we represent the input/output as arrays here for simplicity.
      { input: [[1,2,3,4,5]], expected: [5,4,3,2,1] },
      { input: [[1,2]], expected: [2,1] },
      { input: [[]], expected: [] }
    ]
  }
];

export const getChallengeById = (id: string) => {
  return mockChallenges.find(c => c.id === id);
};

export const getChallengesByCategory = (category: 'algorithms' | 'data-structures') => {
  return mockChallenges.filter(c => c.category === category);
};
