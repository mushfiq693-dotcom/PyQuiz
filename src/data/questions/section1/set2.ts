import { Question } from '../types';

export const section1Set2Questions: Question[] = [
  // EASY (1-10)
  {
    id: "sec1-set2-q01",
    question: "What is the output of the 'len()' function on the string 'Hello, World!'?",
    code: "print(len('Hello, World!'))",
    options: ["12", "13", "11", "14"],
    correctAnswer: 1,
    difficulty: "easy",
    topic: "Strings & Built-ins",
    explanation: "'Hello, World!' has 13 characters including letters, punctuation, and the space."
  },
  {
    id: "sec1-set2-q02",
    question: "What does the 'isinstance()' function return in the following check?",
    code: "print(isinstance(True, int))",
    options: ["True", "False", "TypeError", "None"],
    correctAnswer: 0,
    difficulty: "easy",
    topic: "Type Hierarchy",
    explanation: "In Python, the 'bool' class is a subclass of 'int'. Therefore, 'True' is an instance of 'int'."
  },
  {
    id: "sec1-set2-q03",
    question: "What will be printed when slicing a list with negative indexing?",
    code: "numbers = [10, 20, 30, 40, 50]\nprint(numbers[-2])",
    options: ["50", "40", "30", "20"],
    correctAnswer: 1,
    difficulty: "easy",
    topic: "List Indexing",
    explanation: "Negative indexing counts from the end of the list. -1 is 50, and -2 is 40."
  },
  {
    id: "sec1-set2-q04",
    question: "Which of the following creates an empty set in Python?",
    code: undefined,
    options: ["{}", "set()", "[]", "()"],
    correctAnswer: 1,
    difficulty: "easy",
    topic: "Data Types",
    explanation: "'{}' creates an empty dictionary in Python. To create an empty set, you must use 'set()'."
  },
  {
    id: "sec1-set2-q05",
    question: "What is the output of the string method 'strip()'?",
    code: "text = '   Python 3   '\nprint(f\"'{text.strip()}'\")",
    options: ["'   Python 3'", "'Python 3   '", "'Python 3'", "'Python3'"],
    correctAnswer: 2,
    difficulty: "easy",
    topic: "String Methods",
    explanation: "'strip()' removes leading and trailing whitespace from the string, leaving inner spaces intact."
  },
  {
    id: "sec1-set2-q06",
    question: "What will the following 'while' loop print?",
    code: "count = 3\nwhile count > 0:\n    count -= 1\nprint(count)",
    options: ["3", "1", "0", "-1"],
    correctAnswer: 2,
    difficulty: "easy",
    topic: "While Loops",
    explanation: "The loop decrements count from 3 to 2, 1, and finally 0. When count is 0, 'count > 0' becomes False and the loop exits."
  },
  {
    id: "sec1-set2-q07",
    question: "What is the exponentiation operator in Python?",
    code: undefined,
    options: ["^", "**", "^^", "exp()"],
    correctAnswer: 1,
    difficulty: "easy",
    topic: "Operators",
    explanation: "'**' is the power/exponentiation operator in Python (e.g. 2 ** 3 = 8). '^' is the bitwise XOR operator."
  },
  {
    id: "sec1-set2-q08",
    question: "What is the output of converting float 9.99 to an integer?",
    code: "print(int(9.99))",
    options: ["10", "9", "9.0", "Error"],
    correctAnswer: 1,
    difficulty: "easy",
    topic: "Type Conversion",
    explanation: "int() truncates floating-point numbers towards zero, discarding the fractional part."
  },
  {
    id: "sec1-set2-q09",
    question: "What keyword is used to skip the rest of the current loop iteration and move to the next?",
    code: undefined,
    options: ["skip", "pass", "continue", "next"],
    correctAnswer: 2,
    difficulty: "easy",
    topic: "Loop Control",
    explanation: "'continue' stops the current iteration and advances execution to the next iteration of the loop."
  },
  {
    id: "sec1-set2-q10",
    question: "What does the expression 'not (5 > 2 and 3 < 1)' evaluate to?",
    code: undefined,
    options: ["True", "False", "None", "SyntaxError"],
    correctAnswer: 0,
    difficulty: "easy",
    topic: "Logical Operators",
    explanation: "5 > 2 is True; 3 < 1 is False. 'True and False' is False. 'not False' evaluates to True."
  },

  // MEDIUM (11-20)
  {
    id: "sec1-set2-q11",
    question: "What is the output of the string 'find()' method when the substring is not found?",
    code: "s = 'python'\nprint(s.find('z'))",
    options: ["False", "None", "-1", "ValueError"],
    correctAnswer: 2,
    difficulty: "medium",
    topic: "String Methods",
    explanation: "'str.find()' returns -1 if the substring is not found, whereas 'str.index()' raises a ValueError."
  },
  {
    id: "sec1-set2-q12",
    question: "What is the result of the following list multiplication?",
    code: "matrix = [[0]] * 3\nmatrix[0][0] = 5\nprint(matrix)",
    options: ["[[5], [0], [0]]", "[[5], [5], [5]]", "[[0], [0], [5]]", "Error"],
    correctAnswer: 1,
    difficulty: "medium",
    topic: "Shallow Copy Pitfalls",
    explanation: "List multiplication '[[0]] * 3' creates a list containing 3 references to the same inner list. Modifying matrix[0][0] modifies all 3 references."
  },
  {
    id: "sec1-set2-q13",
    question: "What is the output of the 'enumerate()' function when unpacked in a loop?",
    code: "items = ['a', 'b']\nresult = [f'{i}:{v}' for i, v in enumerate(items, start=1)]\nprint(result)",
    options: ["['0:a', '1:b']", "['1:a', '2:b']", "['a:1', 'b:2']", "['1:items', '2:items']"],
    correctAnswer: 1,
    difficulty: "medium",
    topic: "Enumerate Built-in",
    explanation: "'enumerate(items, start=1)' yields (1, 'a') and (2, 'b'), producing ['1:a', '2:b']."
  },
  {
    id: "sec1-set2-q14",
    question: "What is the output of the 'all()' and 'any()' functions on the following list?",
    code: "data = [True, 1, 'text', []]\nprint(all(data), any(data))",
    options: ["True True", "False True", "False False", "True False"],
    correctAnswer: 1,
    difficulty: "medium",
    topic: "Built-in Truth Functions",
    explanation: "'all()' requires all elements to be truthy (it fails on empty list []). 'any()' returns True if at least one element is truthy."
  },
  {
    id: "sec1-set2-q15",
    question: "What is the output of sorting strings with uppercase and lowercase letters by default?",
    code: "words = ['banana', 'Apple', 'cherry']\nwords.sort()\nprint(words)",
    options: ["['Apple', 'banana', 'cherry']", "['banana', 'Apple', 'cherry']", "['banana', 'cherry', 'Apple']", "['Apple', 'cherry', 'banana']"],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "Lexicographical Sorting",
    explanation: "Default string sort orders characters by ASCII/Unicode code points. Uppercase letters (A-Z: 65-90) precede lowercase letters (a-z: 97-122)."
  },
  {
    id: "sec1-set2-q16",
    question: "What does the following 'zip()' call return when converted to a dictionary?",
    code: "keys = ['x', 'y', 'z']\nvals = [10, 20]\nprint(dict(zip(keys, vals)))",
    options: ["{'x': 10, 'y': 20, 'z': None}", "{'x': 10, 'y': 20}", "ValueError", "{10: 'x', 20: 'y'}"],
    correctAnswer: 1,
    difficulty: "medium",
    topic: "Zip & Dictionaries",
    explanation: "'zip()' truncates to the length of the shortest input iterable. 'z' is omitted, resulting in {'x': 10, 'y': 20}."
  },
  {
    id: "sec1-set2-q17",
    question: "What is the output of bitwise XOR on numbers 6 and 3?",
    code: "print(6 ^ 3)",
    options: ["5", "7", "2", "9"],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "Bitwise XOR",
    explanation: "6 is binary 110, 3 is binary 011. 110 XOR 011 = 101, which is decimal 5."
  },
  {
    id: "sec1-set2-q18",
    question: "What is printed by this string slicing expression with omitted indices?",
    code: "msg = 'Assessment'\nprint(msg[2:8:2])",
    options: ["sss", "ses", "sem", "sse"],
    correctAnswer: 1,
    difficulty: "medium",
    topic: "Slicing with Step",
    explanation: "msg[2] is 's', msg[4] is 'e', msg[6] is 's'. The slice extracts indices 2, 4, 6 -> 'ses'."
  },
  {
    id: "sec1-set2-q19",
    question: "What does the 'round()' function evaluate to for half-integers in Python 3?",
    code: "print(round(2.5), round(3.5))",
    options: ["3 4", "2 4", "2 3", "3 3"],
    correctAnswer: 1,
    difficulty: "medium",
    topic: "Round Half to Even",
    explanation: "Python 3 uses 'round half to even' (banker's rounding). 2.5 rounds down to 2 (even), and 3.5 rounds up to 4 (even)."
  },
  {
    id: "sec1-set2-q20",
    question: "What will be printed when checking 'in' on a dictionary?",
    code: "d = {'a': 1, 'b': 2}\nprint(1 in d, 'a' in d)",
    options: ["True True", "False True", "True False", "False False"],
    correctAnswer: 1,
    difficulty: "medium",
    topic: "Dictionary Membership",
    explanation: "The 'in' operator checks against dictionary keys by default, not values. '1' is a value (False), while 'a' is a key (True)."
  },

  // HARD (21-30)
  {
    id: "sec1-set2-q21",
    question: "What is the output of the following list comprehension with variable leakage in Python 3?",
    code: "x = 10\nres = [x for x in range(5)]\nprint(x)",
    options: ["4", "5", "10", "NameError"],
    correctAnswer: 2,
    difficulty: "hard",
    topic: "Comprehension Scope",
    explanation: "In Python 3, list comprehensions have their own local function-level scope. The iteration variable 'x' does not overwrite the outer variable 'x = 10'."
  },
  {
    id: "sec1-set2-q22",
    question: "What is the output when evaluating custom objects with identical hash but distinct equality?",
    code: "class Item:\n    def __init__(self, val):\n        self.val = val\n    def __hash__(self):\n        return 42\n    def __eq__(self, other):\n        return self.val == other.val\n\ns = {Item(1), Item(1), Item(2)}\nprint(len(s))",
    options: ["1", "2", "3", "TypeError: unhashable type"],
    correctAnswer: 1,
    difficulty: "hard",
    topic: "Hashing & Set Deduplication",
    explanation: "Sets check both hash equality and object equality. Item(1) and Item(1) have identical hash (42) and equal values, so one is deduplicated. Item(2) has hash 42 but unequal value, so it is retained. Total items = 2."
  },
  {
    id: "sec1-set2-q23",
    question: "What is the output of the following chained comparison with side effects?",
    code: "def f(msg, ret):\n    print(msg, end=' ')\n    return ret\n\nx = f('A', 1) < f('B', 2) < f('C', 0) < f('D', 4)",
    options: ["A B C D", "A B C", "A B", "SyntaxError"],
    correctAnswer: 1,
    difficulty: "hard",
    topic: "Chained Comparison Short-Circuit",
    explanation: "f('A', 1) < f('B', 2) evaluates to 1 < 2 (True). Next, f('C', 0) is called to evaluate 2 < 0 (False). Because 2 < 0 is False, short-circuiting stops evaluation before f('D', 4) is called. Output: 'A B C '."
  },
  {
    id: "sec1-set2-q24",
    question: "What is the output of modifying a slice with a step?",
    code: "nums = [1, 2, 3, 4, 5, 6]\nnums[::2] = [10, 30, 50]\nprint(nums)",
    options: ["[10, 2, 30, 4, 50, 6]", "[10, 30, 50, 4, 5, 6]", "[10, 30, 50]", "ValueError"],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Extended Slice Assignment",
    explanation: "Extended slice assignment with step requires the replacement sequence to have exact matching length. It replaces indices 0, 2, 4 with 10, 30, 50."
  },
  {
    id: "sec1-set2-q25",
    question: "What is the output of following nested unpacking with the asterisk operator?",
    code: "a, *b, c = range(5)\nprint(a, b, c)",
    options: ["0 [1, 2, 3] 4", "0 (1, 2, 3) 4", "[0] [1, 2, 3] [4]", "0 1 4"],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Extended Iterable Unpacking",
    explanation: "'a' captures the first element (0), 'c' captures the last element (4), and '*b' collects all middle elements as a list: [1, 2, 3]."
  },
  {
    id: "sec1-set2-q26",
    question: "What does the following recursive list reference structure print for length?",
    code: "a = [1, 2]\na.append(a)\nprint(len(a), a[2] is a)",
    options: ["2 False", "3 True", "Infinite loop", "RecursionError"],
    correctAnswer: 1,
    difficulty: "hard",
    topic: "Self-Referential Objects",
    explanation: "Appending 'a' to itself adds a third element which is a reference back to the list itself. len(a) is 3, and a[2] is identical to a (True)."
  },
  {
    id: "sec1-set2-q27",
    question: "What happens when using 'del' on a dictionary key while iterating over the dictionary keys?",
    code: "d = {'x': 1, 'y': 2}\ntry:\n    for k in d:\n        if k == 'x':\n            del d[k]\nexcept RuntimeError as e:\n    print('RuntimeError')",
    options: ["RuntimeError", "Deletes key silently", "TypeError", "Infinite loop"],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Dictionary Mutation during Iteration",
    explanation: "Modifying the size of a dictionary during direct iteration raises a 'RuntimeError: dictionary changed size during iteration'."
  },
  {
    id: "sec1-set2-q28",
    question: "What is the output of the following bitwise NOT operation on 0?",
    code: "print(~0, ~(-1))",
    options: ["-1 0", "1 0", "-1 -2", "0 -1"],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Two's Complement & Bitwise NOT",
    explanation: "In two's complement representation, ~x = -(x + 1). Therefore, ~0 = -(0 + 1) = -1, and ~(-1) = -(-1 + 1) = 0."
  },
  {
    id: "sec1-set2-q29",
    question: "What is printed when using an 'or' expression in a function argument default call?",
    code: "def greet(name=None):\n    target = name or 'Guest'\n    return f'Hello, {target}'\n\nprint(greet(''), greet('Alex'))",
    options: ["Hello,  Hello, Alex", "Hello, Guest Hello, Alex", "Hello, None Hello, Alex", "Error"],
    correctAnswer: 1,
    difficulty: "hard",
    topic: "Falsy Argument Fallback",
    explanation: "An empty string '' is falsy. 'name or Guest' evaluates to 'Guest' when name is '', printing 'Hello, Guest'."
  },
  {
    id: "sec1-set2-q30",
    question: "What is the behavior of '__debug__' constant in Python?",
    code: "print(type(__debug__), __debug__)",
    options: ["<class 'bool'> True", "<class 'int'> 1", "<class 'NoneType'> None", "NameError"],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Python Internal Constants",
    explanation: "'__debug__' is a built-in boolean constant that is True unless Python is started with the -O (optimize) flag."
  }
];
