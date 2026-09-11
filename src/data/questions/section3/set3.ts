import { Question } from '../types';

export const section3Set3Questions: Question[] = [
  // EASY (1-10)
  {
    id: "sec3-set3-q01",
    question: "What is the output of 'len()' on a dictionary with 3 key-value pairs?",
    code: "d = {'x': 1, 'y': 2, 'z': 3}\nprint(len(d))",
    options: ["3", "6", "1", "TypeError"],
    correctAnswer: 0,
    difficulty: "easy",
    topic: "Dictionary Length",
    explanation: "'len(d)' counts the number of key-value pairs (3)."
  },
  {
    id: "sec3-set3-q02",
    question: "How do you check if an element exists in a list?",
    code: "fruits = ['apple', 'banana']\n# Expression to check if 'apple' is in fruits:",
    options: ["'apple' in fruits", "fruits.has('apple')", "fruits.contains('apple')", "in('apple', fruits)"],
    correctAnswer: 0,
    difficulty: "easy",
    topic: "Membership Operator",
    explanation: "The 'in' operator tests membership in Python collections: ''apple' in fruits'."
  },
  {
    id: "sec3-set3-q03",
    question: "What is the output of 'list.remove(x)'?",
    code: "nums = [1, 2, 3, 2]\nnums.remove(2)\nprint(nums)",
    options: ["[1, 3, 2]", "[1, 3]", "[1, 2, 3]", "[3, 2]"],
    correctAnswer: 0,
    difficulty: "easy",
    topic: "List Remove",
    explanation: "'list.remove(x)' removes the FIRST occurrence of value x: [1, 3, 2]."
  },
  {
    id: "sec3-set3-q04",
    question: "What is the output of string 'join()' on a list of characters?",
    code: "chars = ['P', 'y', 't', 'h', 'o', 'n']\nprint(''.join(chars))",
    options: ["Python", "P y t h o n", "['Python']", "Error"],
    correctAnswer: 0,
    difficulty: "easy",
    topic: "String Join",
    explanation: "''.join(chars)' concatenates elements using an empty separator string -> 'Python'."
  },
  {
    id: "sec3-set3-q05",
    question: "Which collection type preserves the order of elements and does not allow duplicate keys?",
    code: undefined,
    options: ["dict", "set", "tuple", "frozenset"],
    correctAnswer: 0,
    difficulty: "easy",
    topic: "Data Structure Characteristics",
    explanation: "Python dictionaries (dict) preserve key insertion order (since Python 3.7) and enforce unique keys."
  },
  {
    id: "sec3-set3-q06",
    question: "What is the output of multiplying a tuple '(1, 2)' by 2?",
    code: "t = (1, 2) * 2\nprint(t)",
    options: ["(1, 2, 1, 2)", "(2, 4)", "((1, 2), (1, 2))", "Error"],
    correctAnswer: 0,
    difficulty: "easy",
    topic: "Tuple Repetition",
    explanation: "Multiplying a sequence by an integer repeats the sequence: (1, 2, 1, 2)."
  },
  {
    id: "sec3-set3-q07",
    question: "What is the output of 'set.isdisjoint()' when two sets have no common elements?",
    code: "s1 = {1, 2}\ns2 = {3, 4}\nprint(s1.isdisjoint(s2))",
    options: ["True", "False", "None", "{}"],
    correctAnswer: 0,
    difficulty: "easy",
    topic: "Set Disjoint Check",
    explanation: "'isdisjoint()' returns True if two sets have a null intersection."
  },
  {
    id: "sec3-set3-q08",
    question: "What does 'del list[index]' do in Python?",
    code: "nums = [10, 20, 30]\ndel nums[1]\nprint(nums)",
    options: ["[10, 30]", "[20, 30]", "[10, 20]", "None"],
    correctAnswer: 0,
    difficulty: "easy",
    topic: "Del Statement",
    explanation: "'del nums[1]' deletes the item at index 1 (20), shifting subsequent elements."
  },
  {
    id: "sec3-set3-q09",
    question: "What is the output of 'dict.items()' converted to a list?",
    code: "d = {'a': 1}\nprint(list(d.items()))",
    options: ["[('a', 1)]", "[('a': 1)]", "['a', 1]", "{'a': 1}"],
    correctAnswer: 0,
    difficulty: "easy",
    topic: "Dictionary Items View",
    explanation: "'d.items()' yields 2-tuples of (key, value): [('a', 1)]."
  },
  {
    id: "sec3-set3-q10",
    question: "How do you clear all items from a Python set?",
    code: "s = {1, 2, 3}\ns.clear()\nprint(s)",
    options: ["set()", "{}", "None", "[]"],
    correctAnswer: 0,
    difficulty: "easy",
    topic: "Set Clear",
    explanation: "'s.clear()' empties the set, represented in console output as 'set()'."
  },

  // MEDIUM (11-20)
  {
    id: "sec3-set3-q11",
    question: "What is the output of sorting strings by length, using length as key and character value as tiebreaker?",
    code: "words = ['banana', 'fig', 'date', 'apple', 'kiwi']\nsorted_w = sorted(words, key=lambda w: (len(w), w))\nprint(sorted_w[:2])",
    options: ["['fig', 'date']", "['fig', 'kiwi']", "['apple', 'banana']", "['date', 'fig']"],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "Tuple Key Sorting",
    explanation: "'fig' has len 3 (shortest). 'date' and 'kiwi' have len 4, with 'date' preceding 'kiwi' alphabetically. The first two are ['fig', 'date']."
  },
  {
    id: "sec3-set3-q12",
    question: "What is the output of 'dict.copy()' on nested dictionaries?",
    code: "d1 = {'user': {'name': 'Sam'}}\nd2 = d1.copy()\nd2['user']['name'] = 'Max'\nprint(d1['user']['name'])",
    options: ["Max", "Sam", "Error", "None"],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "Dict Shallow Copy Mutation",
    explanation: "'dict.copy()' is a shallow copy. The nested inner dictionary {'name': 'Sam'} is shared, so modifying d2 alters d1 to 'Max'."
  },
  {
    id: "sec3-set3-q13",
    question: "What does the following generator comprehension produce when wrapped in 'sum()'?",
    code: "res = sum(x for x in range(10) if x % 3 == 0)\nprint(res)",
    options: ["18", "9", "27", "15"],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "Generator Reduction",
    explanation: "The numbers < 10 divisible by 3 are 0, 3, 6, 9. Sum = 0 + 3 + 6 + 9 = 18."
  },
  {
    id: "sec3-set3-q14",
    question: "What is the output of the 'set.difference_update()' method?",
    code: "s1 = {1, 2, 3}\ns1.difference_update({2, 3, 4})\nprint(s1)",
    options: ["{1}", "{1, 4}", "{4}", "set()"],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "In-place Set Difference",
    explanation: "'difference_update()' mutates s1 in place, removing all elements present in the other set ({2, 3}), leaving {1}."
  },
  {
    id: "sec3-set3-q15",
    question: "What is the output of tuple unpacking in a list comprehension?",
    code: "points = [(1, 2), (3, 4)]\nsums = [x + y for x, y in points]\nprint(sums)",
    options: ["[3, 7]", "[(1, 2), (3, 4)]", "[1, 2, 3, 4]", "10"],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "Tuple Unpacking in Comprehensions",
    explanation: "1+2=3, 3+4=7, resulting in [3, 7]."
  },
  {
    id: "sec3-set3-q16",
    question: "What is the output of slicing a list with a step that skips every other item?",
    code: "nums = [0, 1, 2, 3, 4, 5, 6, 7]\nprint(nums[1::2])",
    options: ["[1, 3, 5, 7]", "[0, 2, 4, 6]", "[1, 2, 3, 4]", "[7, 5, 3, 1]"],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "Odd Index Slicing",
    explanation: "'nums[1::2]' begins at index 1 and steps by 2, extracting elements at odd indices: [1, 3, 5, 7]."
  },
  {
    id: "sec3-set3-q17",
    question: "What is the output of passing a custom key to 'max()' on a dictionary?",
    code: "inventory = {'apples': 5, 'oranges': 12, 'bananas': 8}\nprint(max(inventory, key=inventory.get))",
    options: ["oranges", "12", "bananas", "apples"],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "Max with Dict Key Extractor",
    explanation: "'max(inventory, key=inventory.get)' compares dictionary keys by their integer values, returning 'oranges' (12)."
  },
  {
    id: "sec3-set3-q18",
    question: "What is the output of creating a set of tuples vs a set of lists?",
    code: "s = {(1, 2), (1, 2), (2, 3)}\nprint(len(s))",
    options: ["2", "3", "1", "TypeError"],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "Hashable Tuples in Sets",
    explanation: "Tuples with immutable elements are hashable. Deduplication leaves {(1, 2), (2, 3)} with len = 2."
  },
  {
    id: "sec3-set3-q19",
    question: "What is the output of 'collections.deque' with 'rotate()'?",
    code: "from collections import deque\nd = deque([1, 2, 3, 4])\nd.rotate(1)\nprint(list(d))",
    options: ["[4, 1, 2, 3]", "[2, 3, 4, 1]", "[1, 2, 3, 4]", "[4, 3, 2, 1]"],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "Deque Rotation",
    explanation: "'rotate(1)' rotates elements 1 step to the right, moving 4 to the front: [4, 1, 2, 3]."
  },
  {
    id: "sec3-set3-q20",
    question: "What is the output of reversing a dictionary in Python 3.8+ using 'reversed()'?",
    code: "d = {'a': 1, 'b': 2, 'c': 3}\nprint(list(reversed(d)))",
    options: ["['c', 'b', 'a']", "['a', 'b', 'c']", "[3, 2, 1]", "TypeError"],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "Reversed Dictionary Keys",
    explanation: "In Python 3.8+, dictionaries implement '__reversed__()', allowing reverse iteration of keys: ['c', 'b', 'a']."
  },

  // HARD (21-30)
  {
    id: "sec3-set3-q21",
    question: "What is the output of 'itertools.permutations' vs 'itertools.combinations' on a 3-element list with r=2?",
    code: "import itertools\nitems = [1, 2, 3]\nperms = len(list(itertools.permutations(items, 2)))\ncombs = len(list(itertools.combinations(items, 2)))\nprint(perms, combs)",
    options: ["6 3", "3 6", "6 6", "9 3"],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Permutations vs Combinations",
    explanation: "Permutations of 3 items taken 2 at a time is 3! / (3-2)! = 6. Combinations is 3! / (2! * 1!) = 3. Output: 6 3."
  },
  {
    id: "sec3-set3-q22",
    question: "What happens when you pass a list with nan (float('nan')) values to a set?",
    code: "nan1 = float('nan')\nnan2 = float('nan')\ns = {nan1, nan2}\nprint(len(s), nan1 == nan2)",
    options: [
      "2 False",
      "1 True",
      "1 False",
      "2 True"
    ],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Float NaN Inequality & Set Deduplication",
    explanation: "By IEEE 754 standards, float('nan') != float('nan') is always False. Because equality fails, the set cannot deduplicate them, storing both (len = 2)."
  },
  {
    id: "sec3-set3-q23",
    question: "What is the output of 'bisect.bisect_left' vs 'bisect.bisect_right' on duplicates?",
    code: "import bisect\nnums = [10, 20, 20, 20, 30]\nidx_left = bisect.bisect_left(nums, 20)\nidx_right = bisect.bisect_right(nums, 20)\nprint(idx_left, idx_right)",
    options: ["1 4", "1 3", "2 4", "0 4"],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Bisect Left and Right Bounds",
    explanation: "'bisect_left' returns the index of the first occurrence (1), while 'bisect_right' returns the index after the last occurrence (4)."
  },
  {
    id: "sec3-set3-q24",
    question: "What is the output of 'itertools.product()' with repeat=2 on a 2-element list?",
    code: "import itertools\nprod = list(itertools.product([0, 1], repeat=2))\nprint(len(prod), prod[1])",
    options: ["4 (0, 1)", "4 (1, 0)", "2 (0, 1)", "8 (0, 0)"],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Cartesian Product with Repeat",
    explanation: "Cartesian product of [0, 1] x [0, 1] generates [(0,0), (0,1), (1,0), (1,1)]. len = 4, index 1 is (0, 1)."
  },
  {
    id: "sec3-set3-q25",
    question: "What is the output of 'collections.deque' appendleft and popleft operations?",
    code: "from collections import deque\nd = deque()\nd.append(1)\nd.appendleft(2)\nd.append(3)\nprint(d.popleft(), d.pop())",
    options: ["2 3", "1 3", "2 1", "3 2"],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Double-Ended Queue Operations",
    explanation: "d becomes [2, 1, 3]. popleft() removes 2 from the left, and pop() removes 3 from the right: '2 3'."
  },
  {
    id: "sec3-set3-q26",
    question: "What is the output of 'itertools.accumulate()' with a custom binary function?",
    code: "import itertools\nnums = [1, 2, 3, 4]\nrunning_max = list(itertools.accumulate([3, 1, 4, 2], max))\nprint(running_max)",
    options: ["[3, 3, 4, 4]", "[3, 1, 4, 2]", "[3, 4, 4, 4]", "[4, 4, 4, 4]"],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Itertools Accumulate Custom Reducer",
    explanation: "Running maximum: max(3)=3, max(3,1)=3, max(3,4)=4, max(4,2)=4 -> [3, 3, 4, 4]."
  },
  {
    id: "sec3-set3-q27",
    question: "What is the output of the built-in 'memoryview' slicing without copying memory?",
    code: "b = bytearray(b'ABCDEF')\nmv = memoryview(b)\nmv[1:3] = b'ZZ'\nprint(bytes(b))",
    options: ["b'AZZDEF'", "b'ABCDEF'", "b'ZZCDEF'", "TypeError"],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Zero-Copy Memoryview Mutations",
    explanation: "'memoryview' allows zero-copy buffer modifications in place. Mutating mv[1:3] modifies the underlying bytearray: b'AZZDEF'."
  },
  {
    id: "sec3-set3-q28",
    question: "What is the output of passing a custom '__missing__' method to a dict subclass?",
    code: "class DefaultZeroDict(dict):\n    def __missing__(self, key):\n        self[key] = 0\n        return 0\n\nd = DefaultZeroDict()\nd['score'] += 10\nprint(d['score'], len(d))",
    options: ["10 1", "0 1", "KeyError", "10 0"],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Dict __missing__ Protocol",
    explanation: "When d['score'] is first read during +=, '__missing__' is invoked, creating 'score': 0. Then += 10 updates it to 10, leaving len(d) = 1."
  },
  {
    id: "sec3-set3-q29",
    question: "What is the output of 'itertools.dropwhile' vs 'itertools.takewhile'?",
    code: "import itertools\nnums = [1, 2, 5, 1, 2]\ndropped = list(itertools.dropwhile(lambda x: x < 3, nums))\nprint(dropped)",
    options: ["[5, 1, 2]", "[5]", "[1, 2, 1, 2]", "[1, 2]"],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Itertools Dropwhile Predicate",
    explanation: "'dropwhile' discards elements as long as the predicate (x < 3) is True. As soon as it encounters 5, it yields all remaining elements: [5, 1, 2]."
  },
  {
    id: "sec3-set3-q30",
    question: "What is the output of 'heapq.heapify' on an existing list in place?",
    code: "import heapq\nlst = [50, 30, 40, 10, 20]\nheapq.heapify(lst)\nprint(lst[0])",
    options: ["10", "50", "20", "30"],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Heapify Min Element Invariant",
    explanation: "'heapify' transforms the list into a min-heap in O(N) linear time. lst[0] is guaranteed to be the smallest item (10)."
  }
];
