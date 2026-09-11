import { Question } from '../types';

export const section3Set2Questions: Question[] = [
  // EASY (1-10)
  {
    id: "sec3-set2-q01",
    question: "What does the 'list.reverse()' method do in Python?",
    code: "nums = [1, 2, 3]\nres = nums.reverse()\nprint(res, nums)",
    options: ["None [3, 2, 1]", "[3, 2, 1] [3, 2, 1]", "[3, 2, 1] None", "Error"],
    correctAnswer: 0,
    difficulty: "easy",
    topic: "List In-Place Methods",
    explanation: "'list.reverse()' modifies the list in place and returns 'None'."
  },
  {
    id: "sec3-set2-q02",
    question: "Which of the following methods removes all elements from a dictionary?",
    code: undefined,
    options: ["clear()", "empty()", "remove_all()", "delete()"],
    correctAnswer: 0,
    difficulty: "easy",
    topic: "Dictionary Methods",
    explanation: "'dict.clear()' removes all key-value pairs from the dictionary."
  },
  {
    id: "sec3-set2-q03",
    question: "What is the output of 'count()' method on a list with repeated elements?",
    code: "nums = [1, 2, 2, 3, 2, 4]\nprint(nums.count(2))",
    options: ["3", "2", "6", "1"],
    correctAnswer: 0,
    difficulty: "easy",
    topic: "List Count",
    explanation: "'list.count(x)' returns the total number of occurrences of x in the list (3)."
  },
  {
    id: "sec3-set2-q04",
    question: "What will be the result of adding an element to a set using 'add()' if it already exists?",
    code: "s = {1, 2, 3}\ns.add(2)\nprint(len(s))",
    options: ["3", "4", "Error: DuplicateElement", "2"],
    correctAnswer: 0,
    difficulty: "easy",
    topic: "Set Idempotence",
    explanation: "Sets enforce uniqueness; adding an existing element is a no-op, leaving length as 3."
  },
  {
    id: "sec3-set2-q05",
    question: "What is the output of converting a dictionary to a list?",
    code: "d = {'a': 10, 'b': 20}\nprint(list(d))",
    options: ["['a', 'b']", "[10, 20]", "[('a', 10), ('b', 20)]", "['a': 10, 'b': 20]"],
    correctAnswer: 0,
    difficulty: "easy",
    topic: "Dictionary Conversion",
    explanation: "Passing a dictionary to 'list()' creates a list of its keys: ['a', 'b']."
  },
  {
    id: "sec3-set2-q06",
    question: "What is the output of list slicing 'items[1:3]' for list ['a', 'b', 'c', 'd']?",
    code: "items = ['a', 'b', 'c', 'd']\nprint(items[1:3])",
    options: ["['b', 'c']", "['b', 'c', 'd']", "['a', 'b']", "['a', 'b', 'c']"],
    correctAnswer: 0,
    difficulty: "easy",
    topic: "List Slicing",
    explanation: "Slice 1:3 extracts indices 1 and 2, which are ['b', 'c']."
  },
  {
    id: "sec3-set2-q07",
    question: "Which built-in function returns a sorted copy of an iterable without modifying the original?",
    code: undefined,
    options: ["sorted()", "sort()", "order()", "arrange()"],
    correctAnswer: 0,
    difficulty: "easy",
    topic: "Sorting Built-ins",
    explanation: "'sorted(iterable)' returns a new sorted list, unlike 'list.sort()' which mutates in place."
  },
  {
    id: "sec3-set2-q08",
    question: "What is the output of 'tuple([1, 2, 3])'?",
    code: "print(tuple([1, 2, 3]))",
    options: ["(1, 2, 3)", "[1, 2, 3]", "((1, 2, 3))", "TypeError"],
    correctAnswer: 0,
    difficulty: "easy",
    topic: "Tuple Constructor",
    explanation: "'tuple()' converts the list into an immutable tuple: (1, 2, 3)."
  },
  {
    id: "sec3-set2-q09",
    question: "What is the output of checking set superset 's1.issuperset(s2)'?",
    code: "s1 = {1, 2, 3, 4}\ns2 = {2, 3}\nprint(s1.issuperset(s2))",
    options: ["True", "False", "None", "{1, 4}"],
    correctAnswer: 0,
    difficulty: "easy",
    topic: "Set Superset",
    explanation: "All elements of s2 ({2, 3}) are contained within s1, so s1 is a superset of s2 (True)."
  },
  {
    id: "sec3-set2-q10",
    question: "What happens when calling 'dict.values()' on a dictionary?",
    code: "d = {'x': 100, 'y': 200}\nprint(sum(d.values()))",
    options: ["300", "0", "TypeError", "KeyError"],
    correctAnswer: 0,
    difficulty: "easy",
    topic: "Dictionary Values",
    explanation: "'d.values()' yields the view of values (100, 200), and sum() computes 100 + 200 = 300."
  },

  // MEDIUM (11-20)
  {
    id: "sec3-set2-q11",
    question: "What is the output of list comprehension with an 'if-else' ternary expression?",
    code: "nums = [1, 2, 3, 4]\nlabels = ['Even' if n % 2 == 0 else 'Odd' for n in nums]\nprint(labels)",
    options: [
      "['Odd', 'Even', 'Odd', 'Even']",
      "['Even', 'Odd', 'Even', 'Odd']",
      "['Even', 'Even']",
      "SyntaxError"
    ],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "Comprehensions with Ternary",
    explanation: "The 'if-else' expression before 'for' transforms each element: 1->Odd, 2->Even, 3->Odd, 4->Even."
  },
  {
    id: "sec3-set2-q12",
    question: "What is the output of set union using the '|' operator vs method 'union()'?",
    code: "s = {1, 2}\nprint(s | {2, 3} | {3, 4})",
    options: ["{1, 2, 3, 4}", "{1, 2, 2, 3, 3, 4}", "{1, 4}", "{2, 3}"],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "Set Union",
    explanation: "Chained set union gathers all unique elements across all three sets: {1, 2, 3, 4}."
  },
  {
    id: "sec3-set2-q13",
    question: "What is the output of removing an element from a set with 'discard()' vs 'remove()' when absent?",
    code: "s = {1, 2}\ns.discard(99)\nprint(s)",
    options: ["{1, 2}", "KeyError", "None", "{1, 2, 99}"],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "Set Discard vs Remove",
    explanation: "'discard(x)' safely ignores missing elements, while 'remove(x)' would raise a KeyError."
  },
  {
    id: "sec3-set2-q14",
    question: "What is the result of 'copy.copy()' vs 'copy.deepcopy()' on a nested list?",
    code: "import copy\norig = [[1, 2], [3, 4]]\nshallow = copy.copy(orig)\nshallow[0][0] = 99\nprint(orig[0][0])",
    options: ["99", "1", "[[99, 2], [3, 4]]", "Error"],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "Shallow vs Deep Copy",
    explanation: "A shallow copy creates a new outer list but copies references to inner objects. Mutating shallow[0][0] alters orig[0][0] to 99."
  },
  {
    id: "sec3-set2-q15",
    question: "What is the output of 'collections.namedtuple' field access?",
    code: "from collections import namedtuple\nPoint = namedtuple('Point', ['x', 'y'])\npt = Point(10, 20)\nprint(pt.x, pt[1])",
    options: ["10 20", "10 10", "20 10", "Point(10, 20)"],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "Named Tuples",
    explanation: "Named tuples support both named attribute access (pt.x = 10) and standard tuple index access (pt[1] = 20)."
  },
  {
    id: "sec3-set2-q16",
    question: "What is the output of slicing with omitted start and negative stop?",
    code: "s = 'abcdef'\nprint(s[:-2])",
    options: ["abcd", "cdef", "ef", "abcdef"],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "Negative Slicing Bounds",
    explanation: "'s[:-2]' extracts characters from index 0 up to (excluding) the last 2 characters ('e' and 'f'), giving 'abcd'."
  },
  {
    id: "sec3-set2-q17",
    question: "What will be printed when checking subset with '<=' on sets?",
    code: "a = {1, 2}\nb = {1, 2, 3}\nprint(a <= b, a < a)",
    options: ["True False", "True True", "False False", "False True"],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "Set Comparison Operators",
    explanation: "'<=' tests for subset (True), while '<' tests for strict proper subset (a is not a proper subset of itself, so False)."
  },
  {
    id: "sec3-set2-q18",
    question: "What is the output of inserting an element at index 0 in a list?",
    code: "nums = [2, 3]\nnums.insert(0, 1)\nprint(nums)",
    options: ["[1, 2, 3]", "[2, 3, 1]", "[1, 3]", "[0, 2, 3]"],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "List Insert",
    explanation: "'insert(index, element)' shifts existing elements to the right and inserts the new element at index 0."
  },
  {
    id: "sec3-set2-q19",
    question: "What is the result of 'dict.popitem()' in Python 3.7+?",
    code: "d = {'a': 1, 'b': 2, 'c': 3}\nitem = d.popitem()\nprint(item)",
    options: ["('c', 3)", "('a', 1)", "3", "KeyError"],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "Popitem LIFO Guarantee",
    explanation: "In Python 3.7+, dictionaries preserve insertion order, and 'popitem()' is guaranteed to remove and return the last key-value pair in LIFO order (('c', 3))."
  },
  {
    id: "sec3-set2-q20",
    question: "What is the output of set comprehension stripping whitespace and deduplicating?",
    code: "words = [' cat ', 'DOG', 'cat', ' dog ']\ncleaned = {w.strip().lower() for w in words}\nprint(sorted(cleaned))",
    options: ["['cat', 'dog']", "[' cat ', 'dog']", "['cat', 'dog', 'dog']", "['cat']"],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "Set Comprehensions",
    explanation: "Stripping and lowercasing reduces all four words to 'cat' and 'dog', which the set deduplicates."
  },

  // HARD (21-30)
  {
    id: "sec3-set2-q21",
    question: "What is the output of modifying a list element via a tuple reference inside a set?",
    code: "try:\n    t = ([1, 2], 3)\n    s = {t}\nexcept TypeError:\n    print('Unhashable TypeError')",
    options: ["Unhashable TypeError", "{([1, 2], 3)}", "None", "KeyError"],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Tuple Containing Mutable Elements in Sets",
    explanation: "A tuple is only hashable if all of its elements are hashable. Because list [1, 2] is mutable, the containing tuple cannot be hashed into a set."
  },
  {
    id: "sec3-set2-q22",
    question: "What is the output of 'collections.defaultdict' used with a recursive tree structure?",
    code: "from collections import defaultdict\ndef tree(): return defaultdict(tree)\nt = tree()\nt['users']['admin']['active'] = True\nprint(t['users']['admin']['active'])",
    options: ["True", "defaultdict", "KeyError", "RecursionError"],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Autovivification Tree with Defaultdict",
    explanation: "The lambda-like recursive factory dynamically provisions nested dictionaries on demand (autovivification), storing and returning True."
  },
  {
    id: "sec3-set2-q23",
    question: "What is the output of 'array.array' with typecode 'i'?",
    code: "import array\na = array.array('i', [1, 2, 3])\na.append(4)\nprint(type(a), len(a))",
    options: ["<class 'array.array'> 4", "<class 'list'> 4", "TypeError", "<class 'int'> 4"],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Array Module Compact Storage",
    explanation: "The 'array' module provides compact, homogeneous numerical arrays of C-types ('i' represents signed integer)."
  },
  {
    id: "sec3-set2-q24",
    question: "What is the result of evaluating 'sys.getsizeof()' comparing list vs tuple with identical elements?",
    code: "import sys\ntup = (1, 2, 3, 4, 5)\nlst = [1, 2, 3, 4, 5]\nprint(sys.getsizeof(tup) < sys.getsizeof(lst))",
    options: ["True", "False", "Equal", "TypeError"],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Memory Layout: Tuple vs List Overhead",
    explanation: "Tuples are immutable and allocated with exact fixed memory size, whereas lists allocate extra over-provisioned buffer space for future appends. Hence tuple size < list size (True)."
  },
  {
    id: "sec3-set2-q25",
    question: "What is the output of 'bisect.insort' maintaining sorted list order?",
    code: "import bisect\nnums = [10, 20, 30, 40]\nbisect.insort(nums, 25)\nprint(nums)",
    options: ["[10, 20, 25, 30, 40]", "[25, 10, 20, 30, 40]", "[10, 20, 30, 40, 25]", "ValueError"],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Bisect Module In-Order Insertion",
    explanation: "'bisect.insort()' performs binary search to locate the correct insertion point and inserts 25 in sorted order: [10, 20, 25, 30, 40]."
  },
  {
    id: "sec3-set2-q26",
    question: "What is the output of dictionary key view set operations?",
    code: "d1 = {'a': 1, 'b': 2}\nd2 = {'b': 20, 'c': 30}\ncommon_keys = d1.keys() & d2.keys()\nprint(common_keys)",
    options: ["{'b'}", "['b']", "{'b': 2}", "TypeError"],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Dict Keys Set-Like View Operations",
    explanation: "In Python 3, 'dict.keys()' returns a set-like dict_keys view supporting standard set operations like '&' without manual conversion: {'b'}."
  },
  {
    id: "sec3-set2-q27",
    question: "What happens when using list multiplication on a slice assigned to a variable?",
    code: "a = [0]\nb = a * 3\nb[1] = 99\nprint(a, b)",
    options: ["[0] [0, 99, 0]", "[0, 99, 0] [0, 99, 0]", "[0] [99, 99, 99]", "Error"],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Primitive Repetition vs Object References",
    explanation: "Integers are immutable. Mutating b[1] does not affect list 'a' or other elements of 'b': a is [0], b is [0, 99, 0]."
  },
  {
    id: "sec3-set2-q28",
    question: "What is the output of 'weakref.WeakValueDictionary' when referenced objects lose strong references?",
    code: "import weakref\nclass Node:\n    pass\nn = Node()\nwd = weakref.WeakValueDictionary({'n': n})\ndel n\nprint(len(wd))",
    options: ["0", "1", "KeyError", "TypeError"],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Weak References & Garbage Collection",
    explanation: "When the sole strong reference 'n' is deleted, the object is garbage collected, and WeakValueDictionary automatically removes the entry (len = 0)."
  },
  {
    id: "sec3-set2-q29",
    question: "What is the output of using 'heapq.nlargest' on a list of dictionaries with a key extractor?",
    code: "import heapq\nitems = [{'v': 5}, {'v': 1}, {'v': 9}, {'v': 3}]\ntop2 = heapq.nlargest(2, items, key=lambda x: x['v'])\nprint([x['v'] for x in top2])",
    options: ["[9, 5]", "[5, 9]", "[9, 3]", "[1, 3]"],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Heapq nlargest with Key",
    explanation: "'heapq.nlargest(2, ...)' retrieves the 2 largest elements sorted descending: [9, 5]."
  },
  {
    id: "sec3-set2-q30",
    question: "What is the result of checking 'types.MappingProxyType' for immutability?",
    code: "from types import MappingProxyType\norig = {'a': 1}\nproxy = MappingProxyType(orig)\ntry:\n    proxy['a'] = 2\nexcept TypeError:\n    print('Read-Only MappingProxy')",
    options: ["Read-Only MappingProxy", "{'a': 2}", "None", "KeyError"],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "MappingProxyType Read-Only Dict View",
    explanation: "'MappingProxyType' provides a read-only proxy of a dictionary. Attempting to write to it raises a TypeError."
  }
];
