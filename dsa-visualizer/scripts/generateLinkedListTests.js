const fs = require('fs');
const path = require('path');

function generateTests() {
  const challenges = [
    {
      id: 'reverse-linked-list',
      title: 'Reverse Linked List',
      description: 'Given the head of a singly linked list, reverse the list, and return the reversed list.',
      difficulty: 'Easy',
      category: 'data-structures',
      topic: 'Linked Lists',
      examples: [
        {
          input: 'head = [1,2,3,4,5]',
          output: '[5,4,3,2,1]',
          explanation: ''
        }
      ],
      constraints: [
        'The number of nodes in the list is the range [0, 5000].',
        '-5000 <= Node.val <= 5000'
      ],
      starterCode: {
        python: '# class ListNode:\n#     def __init__(self, val=0, next=None):\n#         self.val = val\n#         self.next = next\nclass Solution:\n    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:\n        ',
        javascript: '/**\n * Definition for singly-linked list.\n * function ListNode(val, next) {\n *     this.val = (val===undefined ? 0 : val)\n *     this.next = (next===undefined ? null : next)\n * }\n */\n/**\n * @param {ListNode} head\n * @return {ListNode}\n */\nvar reverseList = function(head) {\n    \n};',
        cpp: 'class Solution {\npublic:\n    ListNode* reverseList(ListNode* head) {\n        \n    }\n};',
        java: 'class Solution {\n    public ListNode reverseList(ListNode head) {\n        \n    }\n}',
        go: 'func reverseList(head *ListNode) *ListNode {\n    \n}',
        kotlin: 'class Solution {\n    fun reverseList(head: ListNode?): ListNode? {\n        \n    }\n}'
      },
      functionName: 'reverseList',
      testCases: [
        { input: [[1, 2, 3, 4, 5]], expected: [5, 4, 3, 2, 1] }
      ]
    },
    {
      id: 'middle-of-the-linked-list',
      title: 'Middle of the Linked List',
      description: 'Given the head of a singly linked list, return the middle node of the linked list.\n\nIf there are two middle nodes, return the second middle node.',
      difficulty: 'Easy',
      category: 'data-structures',
      topic: 'Linked Lists',
      examples: [
        {
          input: 'head = [1,2,3,4,5]',
          output: '[3,4,5]',
          explanation: 'The middle node of the list is node 3.'
        }
      ],
      constraints: [
        'The number of nodes in the list is in the range [1, 100].',
        '1 <= Node.val <= 100'
      ],
      starterCode: {
        python: 'class Solution:\n    def middleNode(self, head: Optional[ListNode]) -> Optional[ListNode]:\n        ',
        javascript: 'var middleNode = function(head) {\n    \n};',
        cpp: 'class Solution {\npublic:\n    ListNode* middleNode(ListNode* head) {\n        \n    }\n};',
        java: 'class Solution {\n    public ListNode middleNode(ListNode head) {\n        \n    }\n}',
        go: 'func middleNode(head *ListNode) *ListNode {\n    \n}',
        kotlin: 'class Solution {\n    fun middleNode(head: ListNode?): ListNode? {\n        \n    }\n}'
      },
      functionName: 'middleNode',
      testCases: [
        { input: [[1, 2, 3, 4, 5]], expected: [3, 4, 5] },
        { input: [[1, 2, 3, 4, 5, 6]], expected: [4, 5, 6] }
      ]
    },
    {
      id: 'reverse-doubly-linked-list',
      title: 'Reverse a Doubly Linked List',
      description: 'Given the head of a doubly linked list, reverse the list, and return the reversed list.',
      difficulty: 'Medium',
      category: 'data-structures',
      topic: 'Linked Lists',
      examples: [
        {
          input: 'head = [1,2,3,4,5]',
          output: '[5,4,3,2,1]',
          explanation: ''
        }
      ],
      constraints: [
        'The number of nodes in the list is the range [0, 5000].',
        '-5000 <= Node.val <= 5000'
      ],
      starterCode: {
        python: 'class Solution:\n    def reverseDoublyList(self, head: Optional[DoubleNode]) -> Optional[DoubleNode]:\n        ',
        javascript: 'var reverseDoublyList = function(head) {\n    \n};',
        cpp: 'class Solution {\npublic:\n    DoubleNode* reverseDoublyList(DoubleNode* head) {\n        \n    }\n};',
        java: 'class Solution {\n    public DoubleNode reverseDoublyList(DoubleNode head) {\n        \n    }\n}',
        go: 'func reverseDoublyList(head *DoubleNode) *DoubleNode {\n    \n}',
        kotlin: 'class Solution {\n    fun reverseDoublyList(head: DoubleNode?): DoubleNode? {\n        \n    }\n}'
      },
      functionName: 'reverseDoublyList',
      testCases: [
        { input: [[1, 2, 3, 4, 5]], expected: [5, 4, 3, 2, 1] }
      ]
    },
    {
      id: 'delete-all-occurrences',
      title: 'Remove Occurrences in Doubly Linked List',
      description: 'Given the head of a doubly linked list and a value key, remove all nodes containing that key.',
      difficulty: 'Medium',
      category: 'data-structures',
      topic: 'Linked Lists',
      examples: [
        {
          input: 'head = [2,2,10,2,4,2], key = 2',
          output: '[10,4]',
          explanation: 'All nodes with value 2 are removed.'
        }
      ],
      constraints: [
        'The number of nodes in the list is the range [0, 5000].'
      ],
      starterCode: {
        python: 'class Solution:\n    def deleteAllOccurrences(self, head: Optional[DoubleNode], key: int) -> Optional[DoubleNode]:\n        ',
        javascript: 'var deleteAllOccurrences = function(head, key) {\n    \n};',
        cpp: 'class Solution {\npublic:\n    DoubleNode* deleteAllOccurrences(DoubleNode* head, int key) {\n        \n    }\n};',
        java: 'class Solution {\n    public DoubleNode deleteAllOccurrences(DoubleNode head, int key) {\n        \n    }\n}',
        go: 'func deleteAllOccurrences(head *DoubleNode, key int) *DoubleNode {\n    \n}',
        kotlin: 'class Solution {\n    fun deleteAllOccurrences(head: DoubleNode?, key: Int): DoubleNode? {\n        \n    }\n}'
      },
      functionName: 'deleteAllOccurrences',
      testCases: [
        { input: [[2, 2, 10, 2, 4, 2], 2], expected: [10, 4] }
      ]
    },
    {
      id: 'linked-list-cycle',
      title: 'Linked List Cycle',
      description: 'Given head, the head of a linked list, determine if the linked list has a cycle in it.\n\nNote: For the test cases, the cycle is represented by pointing the last node to a node at the given index. If there is no cycle, index is -1. (Your function only receives the head pointer).',
      difficulty: 'Medium',
      category: 'data-structures',
      topic: 'Linked Lists',
      examples: [
        {
          input: 'head = [3,2,0,-4], pos = 1',
          output: 'true',
          explanation: 'There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).'
        }
      ],
      constraints: [
        'The number of the nodes in the list is in the range [0, 10^4].'
      ],
      starterCode: {
        python: 'class Solution:\n    def hasCycle(self, head: Optional[ListNode]) -> bool:\n        ',
        javascript: 'var hasCycle = function(head) {\n    \n};',
        cpp: 'class Solution {\npublic:\n    bool hasCycle(ListNode *head) {\n        \n    }\n};',
        java: 'public class Solution {\n    public boolean hasCycle(ListNode head) {\n        \n    }\n}',
        go: 'func hasCycle(head *ListNode) bool {\n    \n}',
        kotlin: 'class Solution {\n    fun hasCycle(head: ListNode?): Boolean {\n        \n    }\n}'
      },
      functionName: 'hasCycle',
      testCases: [
        { input: [[3, 2, 0, -4], 1], expected: true },
        { input: [[1, 2], 0], expected: true },
        { input: [[1], -1], expected: false }
      ]
    },
    {
      id: 'insert-circular',
      title: 'Insert into a Sorted Circular Linked List',
      description: 'Given a node from a Circular Linked List which is sorted in ascending order, write a function to insert a value insertVal into the list such that it remains a sorted circular list. The given node can be a reference to any single node in the list.',
      difficulty: 'Hard',
      category: 'data-structures',
      topic: 'Linked Lists',
      examples: [
        {
          input: 'head = [3,4,1], insertVal = 2',
          output: '[3,4,1,2]',
          explanation: 'The node 2 is inserted.'
        }
      ],
      constraints: [
        '0 <= Number of Nodes <= 5 * 10^4'
      ],
      starterCode: {
        python: 'class Solution:\n    def insertCircular(self, head: \'Optional[Node]\', insertVal: int) -> \'Node\':\n        ',
        javascript: 'var insertCircular = function(head, insertVal) {\n    \n};',
        cpp: 'class Solution {\npublic:\n    Node* insertCircular(Node* head, int insertVal) {\n        \n    }\n};',
        java: 'class Solution {\n    public Node insertCircular(Node head, int insertVal) {\n        \n    }\n}',
        go: 'func insertCircular(head *Node, insertVal int) *Node {\n    \n}',
        kotlin: 'class Solution {\n    fun insertCircular(head: Node?, insertVal: Int): Node? {\n        \n    }\n}'
      },
      functionName: 'insertCircular',
      testCases: [
        { input: [[3, 4, 1], 2], expected: [1, 2, 3, 4] }
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
    for (let i = 0; i < 5; i++) {
      const size = Math.floor(Math.random() * 200) + 50; 
      const nums = generateRandomArray(size);

      let tc = null;

      if (challenge.id === 'reverse-linked-list' || challenge.id === 'reverse-doubly-linked-list') {
        const expected = [...nums].reverse();
        tc = { input: [nums], expected, isHidden: true };
      } 
      else if (challenge.id === 'middle-of-the-linked-list') {
        const expected = nums.slice(Math.floor(nums.length / 2));
        tc = { input: [nums], expected, isHidden: true };
      }
      else if (challenge.id === 'delete-all-occurrences') {
        const key = nums[Math.floor(Math.random() * nums.length)];
        const expected = nums.filter(n => n !== key);
        tc = { input: [nums, key], expected, isHidden: true };
      }
      else if (challenge.id === 'linked-list-cycle') {
        const hasCycle = Math.random() > 0.5;
        const pos = hasCycle ? Math.floor(Math.random() * nums.length) : -1;
        tc = { input: [nums, pos], expected: hasCycle, isHidden: true };
      }
      else if (challenge.id === 'insert-circular') {
        nums.sort((a, b) => a - b);
        const insertVal = Math.floor(Math.random() * 2000) - 1000;
        const expected = [...nums, insertVal].sort((a, b) => a - b);
        tc = { input: [nums, insertVal], expected, isHidden: true };
      }

      if (tc) {
        challenge.testCases.push(tc);
      }
    }
  });

  const filePath = path.join(__dirname, '..', 'src', 'utils', 'mockChallenges.ts');
  let fileContent = fs.readFileSync(filePath, 'utf8');

  // Insert before the closing bracket of the mockChallenges array
  let newContent = fileContent.replace(/];\s*export const getChallengeById/g, '];\n\nexport const getChallengeById');
  const insertionPoint = newContent.lastIndexOf('];');
  if (insertionPoint !== -1) {
    let stringifiedChallenges = ',\\n  ' + JSON.stringify(challenges, null, 2).slice(1, -1);
    stringifiedChallenges = stringifiedChallenges.replace(/\\n/g, '\\n  ');
    
    newContent = newContent.substring(0, insertionPoint) + stringifiedChallenges + newContent.substring(insertionPoint);
    fs.writeFileSync(filePath, newContent);
    console.log('Successfully injected 6 Linked List challenges with massive test suites!');
  } else {
    console.error('Could not find the closing bracket of mockChallenges array.');
  }
}

generateTests();
