import { Question } from '../types';

export const section3Set1Questions: Question[] = [
  // EASY (1-10)
  {
    id: "sec3-set1-q01",
    question: "Which method is used to add a single item to the end of a list?",
    code: "nums = [1, 2]\n# Which method appends 3 to nums?",
    options: ["append()", "push()", "add()", "insert_last()"],
    correctAnswer: 0,
    difficulty: "easy",
    topic: "List Methods",
    explanation: "In Python, 'list.append(item)' adds a single item to the end of the list."
  },
  {
    id: "sec3-set1-q02",
    question: "What is the result of accessing a non-existent key in a standard Python dictionary using bracket syntax 'd[key]'?",
    code: "d = {'a': 1}\n# What happens on d['b']?",
    options: ["KeyError", "None", "undefined", "IndexError"],
    correctAnswer: 0,
    difficulty: "easy",
    topic: "Dictionary Access",
    explanation: "Directly accessing a non-existent key with 'd[key]' raises a KeyError. Using 'd.get(key)' would safely return None."
  },
  {
    id: "sec3-set1-q03",
    question: "What is the output of the list 'pop()' method with no arguments?",
    code: "stack = [10, 20, 30]\nval = stack.pop()\nprint(val, stack)",
    options: ["30 [10, 20]", "10 [20, 30]", "30 [10, 20, 30]", "20 [10, 30]"],
    correctAnswer: 0,
    difficulty: "easy",
    topic: "List Methods",
    explanation: "'pop()' without arguments removes and returns the last element from the list."
  },
  {
    id: "sec3-set1-q04",
    question: "How are set elements guaranteed to be structured?",
    code: undefined,
    options: [
      "Unique (no duplicates) and unordered",
      "Ordered with duplicate values allowed",
      "Indexed by numeric keys from 0",
      "Sorted ascending automatically"
    ],
    correctAnswer: 0,
    difficulty: "easy",
    topic: "Set Characteristics",
    explanation: "Python sets contain unique, distinct elements and are unordered collections."
  },
  {
    id: "sec3-set1-q05",
    question: "What is the output of converting a string to a set?",
    code: "letters = set('mississippi')\nprint(len(letters))",
    options: ["4", "11", "1", "TypeError"],
    correctAnswer: 0,
    difficulty: "easy",
    topic: "Set Deduplication",
    explanation: "'mississippi' contains 4 unique characters: 'm', 'i', 's', 'p'."
  },
  {
    id: "sec3-set1-q06",
    question: "What is the output of dictionary 'keys()' method?",
    code: "d = {'x': 1, 'y': 2}\nprint(list(d.keys()))",
    options: ["['x', 'y']", "[1, 2]", "[('x', 1), ('y', 2)]", "['x': 1, 'y': 2]"],
    correctAnswer: 0,
    difficulty: "easy",
    topic: "Dictionary Keys",
    explanation: "'d.keys()' returns a dict_keys view of the keys, which converts to ['x', 'y']."
  },
  {
    id: "sec3-set1-q07",
    question: "What is the output of a basic list comprehension squaring numbers?",
    code: "squares = [x**2 for x in [1, 2, 3]]\nprint(squares)",
    options: ["[1, 4, 9]", "[1, 2, 3]", "[2, 4, 6]", "(1, 4, 9)"],
    correctAnswer: 0,
    difficulty: "easy",
    topic: "List Comprehensions",
    explanation: "The comprehension computes [1**2, 2**2, 3**2] = [1, 4, 9]."
  },
  {
    id: "sec3-set1-q08",
    question: "Which of the following creates a 1-element tuple?",
    code: undefined,
    options: ["(42,)", "(42)", "tuple[42]", "[42,]"],
    correctAnswer: 0,
    difficulty: "easy",
    topic: "Tuple Syntax",
    explanation: "A single-element tuple requires a trailing comma '(42,)'. Without the comma, '(42)' is just an integer in parentheses."
  },
  {
    id: "sec3-set1-q09",
    question: "What is the output of 'extend()' on a list?",
    code: "a = [1, 2]\na.extend([3, 4])\nprint(a)",
    options: ["[1, 2, 3, 4]", "[1, 2, [3, 4]]", "[3, 4, 1, 2]", "[1, 2, 7]"],
    correctAnswer: 0,
    difficulty: "easy",
    topic: "List Extend",
    explanation: "'extend()' iterates over its argument appending each element to the list."
  },
  {
    id: "sec3-set1-q10",
    question: "What does 'dict.get(key, default)' do when the key is absent?",
    code: "info = {'name': 'Alice'}\nprint(info.get('role', 'Member'))",
    options: ["Member", "None", "KeyError", "Alice"],
    correctAnswer: 0,
    difficulty: "easy",
    topic: "Dictionary Get Default",
    explanation: "'get(key, default)' returns the default value ('Member') when the key is not present in the dictionary."
  },

  // MEDIUM (11-20)
  {
    id: "sec3-set1-q11",
    question: "What is the output of set intersection using the '&' operator?",
    code: "s1 = {1, 2, 3, 4}\ns2 = {3, 4, 5, 6}\nprint(s1 & s2)",
    options: ["{3, 4}", "{1, 2, 3, 4, 5, 6}", "{1, 2}", "{5, 6}"],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "Set Operations",
    explanation: "The '&' operator computes the intersection (elements common to both sets): {3, 4}."
  },
  {
    id: "sec3-set1-q12",
    question: "What is the output of set difference 's1 - s2'?",
    code: "s1 = {1, 2, 3}\ns2 = {2, 3, 4}\nprint(s1 - s2)",
    options: ["{1}", "{4}", "{1, 4}", "{2, 3}"],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "Set Difference",
    explanation: "'s1 - s2' returns elements that are in s1 but not in s2 ({1})."
  },
  {
    id: "sec3-set1-q13",
    question: "What is the result of the dictionary 'update()' method?",
    code: "d = {'a': 1, 'b': 2}\nd.update({'b': 20, 'c': 30})\nprint(d)",
    options: ["{'a': 1, 'b': 20, 'c': 30}", "{'a': 1, 'b': 2, 'c': 30}", "{'b': 20, 'c': 30}", "Error"],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "Dictionary Update",
    explanation: "'update()' overwrites existing keys ('b' becomes 20) and inserts new keys ('c': 30)."
  },
  {
    id: "sec3-set1-q14",
    question: "What is the output of dictionary 'setdefault()' when the key already exists?",
    code: "d = {'count': 5}\nval = d.setdefault('count', 10)\nprint(val, d['count'])",
    options: ["5 5", "10 10", "5 10", "10 5"],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "Dictionary Setdefault",
    explanation: "If the key exists, 'setdefault()' returns the existing value without modifying the dictionary (5 5)."
  },
  {
    id: "sec3-set1-q15",
    question: "What is the output of sorting a dictionary by its values?",
    code: "scores = {'b': 2, 'a': 3, 'c': 1}\nsorted_keys = sorted(scores, key=scores.get)\nprint(sorted_keys)",
    options: ["['c', 'b', 'a']", "['a', 'b', 'c']", "[1, 2, 3]", "['c', 'a', 'b']"],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "Sorting by Dictionary Values",
    explanation: "scores.get maps 'c'->1, 'b'->2, 'a'->3. Sorting keys by this function yields ['c', 'b', 'a']."
  },
  {
    id: "sec3-set1-q16",
    question: "What is the output of flattening a 2D matrix using a nested list comprehension?",
    code: "matrix = [[1, 2], [3, 4]]\nflat = [x for row in matrix for x in row]\nprint(flat)",
    options: ["[1, 2, 3, 4]", "[[1, 2], [3, 4]]", "[1, 3, 2, 4]", "[4, 3, 2, 1]"],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "Nested Comprehensions",
    explanation: "The nested comprehension iterates over each row, then each element x in row: [1, 2, 3, 4]."
  },
  {
    id: "sec3-set1-q17",
    question: "What is the output of the 'list.index()' method with start and stop arguments?",
    code: "items = ['a', 'b', 'c', 'b', 'd']\nprint(items.index('b', 2))",
    options: ["3", "1", "4", "ValueError"],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "List Index with Bounds",
    explanation: "'items.index('b', 2)' searches for 'b' starting from index 2 onwards, finding it at index 3."
  },
  {
    id: "sec3-set1-q18",
    question: "What is the output of a dictionary comprehension with filtering?",
    code: "nums = [1, 2, 3, 4, 5]\nd = {x: x**2 for x in nums if x % 2 == 0}\nprint(d)",
    options: ["{2: 4, 4: 16}", "{1: 1, 3: 9, 5: 25}", "{2: 4, 4: 8}", "[4, 16]"],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "Dict Comprehension Filtering",
    explanation: "Only even numbers 2 and 4 satisfy the filter, producing {2: 4, 4: 16}."
  },
  {
    id: "sec3-set1-q19",
    question: "What is the output of symmetric difference '^' between two sets?",
    code: "s1 = {1, 2, 3}\ns2 = {3, 4, 5}\nprint(s1 ^ s2)",
    options: ["{1, 2, 4, 5}", "{3}", "{1, 2, 3, 4, 5}", "{}"],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "Symmetric Difference",
    explanation: "'^' (symmetric difference) returns elements in either set, but not in both ({1, 2, 4, 5})."
  },
  {
    id: "sec3-set1-q20",
    question: "What is the result of using the 'dict.fromkeys()' classmethod?",
    code: "d = dict.fromkeys(['x', 'y'], 0)\nprint(d)",
    options: ["{'x': 0, 'y': 0}", "{'x': None, 'y': None}", "['x', 'y', 0]", "{0: ['x', 'y']}"],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "Dict fromkeys",
    explanation: "'dict.fromkeys(seq, value)' creates a new dictionary with keys from seq and values set to the specified default: {'x': 0, 'y': 0}."
  },

  // HARD (21-30)
  {
    id: "sec3-set1-q21",
    question: "What is the trap when using 'dict.fromkeys()' with a mutable default value?",
    code: "d = dict.fromkeys(['a', 'b'], [])\nd['a'].append(1)\nprint(d)",
    options: [
      "{'a': [1], 'b': [1]}",
      "{'a': [1], 'b': []}",
      "{'a': 1, 'b': 0}",
      "TypeError"
    ],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "fromkeys Mutable Shared Reference",
    explanation: "'fromkeys' assigns the exact same empty list instance to all keys. Modifying d['a'] modifies the shared list for d['b'] as well: {'a': [1], 'b': [1]}."
  },
  {
    id: "sec3-set1-q22",
    question: "What is the output of dictionary merge '|' and update '|=' operators introduced in Python 3.9?",
    code: "d1 = {'a': 1, 'b': 2}\nd2 = {'b': 99, 'c': 3}\nmerged = d1 | d2\nprint(merged)",
    options: [
      "{'a': 1, 'b': 99, 'c': 3}",
      "{'a': 1, 'b': 2, 'c': 3}",
      "{'a': 1, 'b': [2, 99], 'c': 3}",
      "TypeError"
    ],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "PEP 584 Dictionary Merge Operator",
    explanation: "The '|' operator merges dictionaries where keys from the right-hand operand ('b': 99) overwrite keys from the left-hand operand."
  },
  {
    id: "sec3-set1-q23",
    question: "What is the time complexity of lookup in a Python set vs a Python list of N items?",
    code: undefined,
    options: [
      "Set: O(1) average; List: O(N)",
      "Set: O(N); List: O(1)",
      "Set: O(log N); List: O(N)",
      "Both are O(1)"
    ],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Complexity Analysis",
    explanation: "Python sets are implemented using hash tables providing O(1) average time complexity for lookups ('x in set'), while lists require O(N) linear scans."
  },
  {
    id: "sec3-set1-q24",
    question: "What is the output of using 'frozenset' as dictionary keys?",
    code: "fs1 = frozenset([1, 2])\nfs2 = frozenset([2, 1])\nd = {fs1: 'first'}\nd[fs2] = 'second'\nprint(len(d), d[fs1])",
    options: ["1 second", "2 first", "2 second", "TypeError: unhashable frozenset"],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Frozenset Hashability & Equality",
    explanation: "'frozenset' is immutable and hashable. Since fs1 and fs2 contain the same elements, fs1 == fs2 and hash(fs1) == hash(fs2), so 'd[fs2]' overwrites 'd[fs1]'."
  },
  {
    id: "sec3-set1-q25",
    question: "What is the output of 'collections.ChainMap' when performing key lookups and mutations?",
    code: "from collections import ChainMap\nd1 = {'a': 1, 'b': 2}\nd2 = {'b': 20, 'c': 30}\ncm = ChainMap(d1, d2)\ncm['b'] = 99\nprint(cm['b'], d1['b'], d2['b'])",
    options: ["99 99 20", "99 2 20", "99 99 99", "20 2 20"],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Collections ChainMap",
    explanation: "ChainMap searches mappings in order (d1 first). Writes and mutations always target the first mapping (d1), so d1['b'] becomes 99 while d2['b'] remains 20."
  },
  {
    id: "sec3-set1-q26",
    question: "What is the output of 'collections.deque' with a 'maxlen' limit?",
    code: "from collections import deque\ndq = deque(maxlen=3)\ndq.extend([1, 2, 3])\ndq.append(4)\nprint(list(dq))",
    options: ["[2, 3, 4]", "[1, 2, 3]", "[1, 2, 4]", "[3, 4]"],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Bounded Deque",
    explanation: "When a bounded deque is full, appending new items automatically discards items from the opposite end (1 is dropped, leaving [2, 3, 4])."
  },
  {
    id: "sec3-set1-q27",
    question: "What is the output of 'heapq.heappush' and 'heapq.heappop' in Python?",
    code: "import heapq\nh = []\nfor v in [30, 10, 20]:\n    heapq.heappush(h, v)\nprint(heapq.heappop(h), h[0])",
    options: ["10 20", "10 30", "30 20", "10 10"],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Heapq Min-Heap Invariant",
    explanation: "heapq maintains a min-heap. heappop(h) extracts the smallest item (10). The new root h[0] becomes the next minimum (20)."
  },
  {
    id: "sec3-set1-q28",
    question: "What is the output when unpacking a dictionary with '**' inside another dictionary with conflicting keys?",
    code: "base = {'x': 1, 'y': 2}\noverride = {'y': 20, 'z': 30}\nres = {**base, **override, 'x': 100}\nprint(res)",
    options: [
      "{'x': 100, 'y': 20, 'z': 30}",
      "{'x': 1, 'y': 2, 'z': 30}",
      "{'x': 100, 'y': 2, 'z': 30}",
      "SyntaxError"
    ],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Dictionary Literal Unpacking Order",
    explanation: "Keys are processed from left to right. 'override' replaces y:2 with y:20, and the explicit 'x': 100 replaces x:1 -> {'x': 100, 'y': 20, 'z': 30}."
  },
  {
    id: "sec3-set1-q29",
    question: "What happens when using a slice object with 'slice(None, None, -1)' on a list?",
    code: "rev_slice = slice(None, None, -1)\nnums = [1, 2, 3, 4]\nprint(nums[rev_slice])",
    options: ["[4, 3, 2, 1]", "[1, 2, 3, 4]", "[]", "TypeError"],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Slice Built-in Object",
    explanation: "'slice(None, None, -1)' is equivalent to the '[: : -1]' slice syntax, reversing the sequence to [4, 3, 2, 1]."
  },
  {
    id: "sec3-set1-q30",
    question: "What is the output of 'collections.OrderedDict' with 'move_to_end()'?",
    code: "from collections import OrderedDict\nod = OrderedDict([('a', 1), ('b', 2), ('c', 3)])\nod.move_to_end('a')\nprint(list(od.keys()))",
    options: ["['b', 'c', 'a']", "['a', 'b', 'c']", "['c', 'b', 'a']", "KeyError"],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "OrderedDict move_to_end",
    explanation: "'od.move_to_end('a')' relocates key 'a' to the right end of the ordered dictionary: ['b', 'c', 'a']."
  }
];
