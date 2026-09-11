import { Question } from '../types';

export const section1Set3Questions: Question[] = [
  // EASY (1-10)
  {
    id: "sec1-set3-q01",
    question: "Which function is used to take user input from the console in Python 3?",
    code: undefined,
    options: ["raw_input()", "input()", "read()", "scan()"],
    correctAnswer: 1,
    difficulty: "easy",
    topic: "Console I/O",
    explanation: "In Python 3, 'input()' is the standard built-in function to read a line of text from standard input."
  },
  {
    id: "sec1-set3-q02",
    question: "What is the result of '10 // 3' in Python?",
    code: "print(10 // 3)",
    options: ["3.333", "3", "4", "3.0"],
    correctAnswer: 1,
    difficulty: "easy",
    topic: "Operators",
    explanation: "'//' is the floor division operator, returning the largest integer less than or equal to the quotient (3)."
  },
  {
    id: "sec1-set3-q03",
    question: "What is the output of the string 'lower()' method?",
    code: "print('PYTHON'.lower())",
    options: ["python", "Python", "PYTHON", "PyThOn"],
    correctAnswer: 0,
    difficulty: "easy",
    topic: "String Methods",
    explanation: "'lower()' returns a copy of the string converted to lowercase."
  },
  {
    id: "sec1-set3-q04",
    question: "How do you write a single-line comment in Python?",
    code: undefined,
    options: ["// comment", "# comment", "/* comment */", "-- comment"],
    correctAnswer: 1,
    difficulty: "easy",
    topic: "Syntax",
    explanation: "Single line comments in Python start with the '#' character."
  },
  {
    id: "sec1-set3-q05",
    question: "What is the output of the 'abs()' function on -15.5?",
    code: "print(abs(-15.5))",
    options: ["-15.5", "15.5", "15", "-15"],
    correctAnswer: 1,
    difficulty: "easy",
    topic: "Built-in Functions",
    explanation: "'abs()' returns the absolute (non-negative) magnitude of a number."
  },
  {
    id: "sec1-set3-q06",
    question: "Which of the following data types is mutable?",
    code: undefined,
    options: ["tuple", "int", "list", "str"],
    correctAnswer: 2,
    difficulty: "easy",
    topic: "Mutability",
    explanation: "Lists are mutable in Python (elements can be modified in place). Tuples, ints, and strings are immutable."
  },
  {
    id: "sec1-set3-q07",
    question: "What will be printed by 'print(type([]))'?",
    code: "print(type([]))",
    options: ["<class 'array'>", "<class 'list'>", "<class 'vector'>", "<class 'sequence'>"],
    correctAnswer: 1,
    difficulty: "easy",
    topic: "Data Types",
    explanation: "The square brackets '[]' denote a Python 'list' object."
  },
  {
    id: "sec1-set3-q08",
    question: "What is the output of 'min(3, 1, 4, 1, 5, 9)'?",
    code: "print(min(3, 1, 4, 1, 5, 9))",
    options: ["3", "1", "9", "4"],
    correctAnswer: 1,
    difficulty: "easy",
    topic: "Built-in Functions",
    explanation: "'min()' returns the smallest item from the given arguments."
  },
  {
    id: "sec1-set3-q09",
    question: "What is the output of the logical operator expression 'True or False and False'?",
    code: "print(True or False and False)",
    options: ["True", "False", "None", "Error"],
    correctAnswer: 0,
    difficulty: "easy",
    topic: "Operator Precedence",
    explanation: "'and' has higher precedence than 'or'. 'False and False' evaluates to False. Then 'True or False' evaluates to True."
  },
  {
    id: "sec1-set3-q10",
    question: "What does 'str(100)' do?",
    code: "print(str(100) + ' items')",
    options: ["100 items", "Error", "100items", "[100] items"],
    correctAnswer: 0,
    difficulty: "easy",
    topic: "Type Casting",
    explanation: "'str(100)' converts the integer 100 to the string '100', which concatenates with ' items'."
  },

  // MEDIUM (11-20)
  {
    id: "sec1-set3-q11",
    question: "What is the output of splitting a string without arguments?",
    code: "text = '  apple   banana \\t orange \\n '\nprint(text.split())",
    options: [
      "['', '', 'apple', '', '', 'banana', 'orange', '']",
      "['apple', 'banana', 'orange']",
      "['apple banana orange']",
      "TypeError: missing delimiter"
    ],
    correctAnswer: 1,
    difficulty: "medium",
    topic: "String Splitting",
    explanation: "When 'split()' is called with no arguments, consecutive whitespace characters (spaces, tabs, newlines) are grouped as a single delimiter and leading/trailing whitespace is discarded."
  },
  {
    id: "sec1-set3-q12",
    question: "What is the output of the string 'replace()' method with a count limit?",
    code: "s = 'banana'\nprint(s.replace('a', 'o', 2))",
    options: ["bonona", "bonona", "bonana", "bonona"], // Note: option 1 bonona vs option 2 bonana
    correctAnswer: 1,
    difficulty: "medium",
    topic: "String Methods",
    explanation: "'s.replace(old, new, count)' replaces at most 'count' occurrences. Replacing the first two 'a's with 'o' gives 'bonona'."
  },
  {
    id: "sec1-set3-q13",
    question: "What is the output of the 'chr()' and 'ord()' reciprocal functions?",
    code: "print(chr(ord('A') + 3))",
    options: ["A", "C", "D", "E"],
    correctAnswer: 2,
    difficulty: "medium",
    topic: "Character Codes",
    explanation: "ord('A') is 65. 65 + 3 = 68. chr(68) is 'D'."
  },
  {
    id: "sec1-set3-q14",
    question: "What is the output of the 'divmod()' built-in function?",
    code: "print(divmod(17, 5))",
    options: ["(3.4, 2)", "(3, 2)", "[3, 2]", "(2, 3)"],
    correctAnswer: 1,
    difficulty: "medium",
    topic: "Divmod Built-in",
    explanation: "'divmod(a, b)' returns a pair of numbers consisting of their quotient and remainder: (a // b, a % b) -> (3, 2)."
  },
  {
    id: "sec1-set3-q15",
    question: "What will be printed when checking string prefix using 'startswith()' with a tuple?",
    code: "filename = 'report.pdf'\nprint(filename.startswith(('doc', 'pdf', 'rep')))",
    options: ["True", "False", "TypeError", "None"],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "String Prefix Matching",
    explanation: "'startswith()' can accept a tuple of prefixes and returns True if the string starts with any of them ('rep')."
  },
  {
    id: "sec1-set3-q16",
    question: "What is the output of passing a negative step to the 'range()' constructor?",
    code: "print(list(range(5, 0, -2)))",
    options: ["[5, 3, 1]", "[5, 3, 1, -1]", "[5, 4, 3, 2, 1]", "[]"],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "Range with Step",
    explanation: "range(5, 0, -2) starts at 5, steps by -2, and stops before 0. Elements are 5, 3, 1."
  },
  {
    id: "sec1-set3-q17",
    question: "What will be printed when chaining assignments?",
    code: "x = y = [1, 2]\nx.append(3)\nprint(y)",
    options: ["[1, 2]", "[1, 2, 3]", "Error", "None"],
    correctAnswer: 1,
    difficulty: "medium",
    topic: "Chained Assignment References",
    explanation: "'x = y = [1, 2]' assigns the same list object to both variables. Appending to 'x' modifies the underlying object referenced by 'y'."
  },
  {
    id: "sec1-set3-q18",
    question: "What is the output of formatting numbers with comma thousand separators?",
    code: "val = 1000000\nprint(f'{val:,}')",
    options: ["1,000,000", "1000,000", "1.000.000", "1000000"],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "F-String Formatting",
    explanation: "The ', ' format specifier in f-strings formats numbers using commas as thousand separators: '1,000,000'."
  },
  {
    id: "sec1-set3-q19",
    question: "What is the output of checking identity on empty tuples vs empty lists?",
    code: "t1 = ()\nt2 = ()\nprint(t1 is t2)",
    options: ["True", "False", "TypeError", "None"],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "Tuple Singleton Interning",
    explanation: "Because tuples are immutable, CPython optimizes empty tuples by sharing a single canonical empty tuple singleton object. 't1 is t2' is True."
  },
  {
    id: "sec1-set3-q20",
    question: "What does the following compound boolean condition return?",
    code: "a = 5\nb = 10\nprint(a > 0 and (b := b - 5) > 0, b)",
    options: ["True 5", "True 10", "False 5", "SyntaxError"],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "Walrus Assignment in Conditions",
    explanation: "a > 0 is True, so the right side is evaluated: (b := 10 - 5) assigns 5 to b, and 5 > 0 is True. Output: 'True 5'."
  },

  // HARD (21-30)
  {
    id: "sec1-set3-q21",
    question: "What is the output of the following recursive lambda with a conditional ternary?",
    code: "f = lambda n: 1 if n <= 1 else n * f(n - 1)\nprint(f(4))",
    options: ["24", "12", "16", "RecursionError"],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Recursive Lambdas",
    explanation: "The lambda calculates factorial: 4 * 3 * 2 * 1 = 24."
  },
  {
    id: "sec1-set3-q22",
    question: "What is the output of modifying a global variable inside a function without the 'global' keyword?",
    code: "val = 10\ndef test():\n    try:\n        print(val)\n        val = 20\n    except UnboundLocalError:\n        print('UnboundLocalError')\ntest()",
    options: ["10", "UnboundLocalError", "20", "None"],
    correctAnswer: 1,
    difficulty: "hard",
    topic: "LEGB Scope & UnboundLocalError",
    explanation: "Because 'val = 20' assigns to 'val' anywhere inside the function body, Python treats 'val' as local throughout the entire scope. Referencing 'val' before the assignment raises an UnboundLocalError."
  },
  {
    id: "sec1-set3-q23",
    question: "What is the output of the following complex zip unpacking?",
    code: "data = [(1, 'a'), (2, 'b'), (3, 'c')]\nnums, chars = zip(*data)\nprint(nums, chars)",
    options: [
      "(1, 2, 3) ('a', 'b', 'c')",
      "[1, 2, 3] ['a', 'b', 'c']",
      "((1, 2, 3), ('a', 'b', 'c'))",
      "TypeError: cannot unpack"
    ],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Zip Unpacking & Transpose",
    explanation: "'zip(*data)' transposes the pairs into two tuples: (1, 2, 3) and ('a', 'b', 'c')."
  },
  {
    id: "sec1-set3-q24",
    question: "What is the result of comparing instances of different user-defined classes without __eq__?",
    code: "class A: pass\nclass B: pass\na = A()\nb = B()\nprint(a == b, a != b)",
    options: ["False True", "True False", "TypeError", "False False"],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Default Object Equality",
    explanation: "By default, user-defined instances fall back to identity comparison. Since 'a' and 'b' are distinct objects, 'a == b' is False and 'a != b' is True."
  },
  {
    id: "sec1-set3-q25",
    question: "What is the output of the following dictionary comprehension with key collisions?",
    code: "d = {k: v for k, v in [('a', 1), ('b', 2), ('a', 3)]}\nprint(d)",
    options: ["{'a': 1, 'b': 2}", "{'a': 3, 'b': 2}", "{'a': [1, 3], 'b': 2}", "KeyError"],
    correctAnswer: 1,
    difficulty: "hard",
    topic: "Dictionary Comprehension Overwrite",
    explanation: "Later pairs in dictionary comprehensions overwrite earlier values for matching keys. ('a', 3) overwrites ('a', 1), yielding {'a': 3, 'b': 2}."
  },
  {
    id: "sec1-set3-q26",
    question: "What is the output when an exception occurs in a 'finally' block?",
    code: "def test():\n    try:\n        return 1\n    finally:\n        return 2\nprint(test())",
    options: ["1", "2", "1 then 2", "SyntaxError"],
    correctAnswer: 1,
    difficulty: "hard",
    topic: "Finally Block Return Overwrite",
    explanation: "A return statement in a 'finally' block supersedes and overrides any return value or unhandled exception originating from the 'try' block."
  },
  {
    id: "sec1-set3-q27",
    question: "What is the output of the following nested list indexing using negative steps?",
    code: "matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]\nprint([row[::-1] for row in matrix[::-1]])",
    options: [
      "[[9, 8, 7], [6, 5, 4], [3, 2, 1]]",
      "[[7, 8, 9], [4, 5, 6], [1, 2, 3]]",
      "[[3, 2, 1], [6, 5, 4], [9, 8, 7]]",
      "[[1, 2, 3], [4, 5, 6], [7, 8, 9]]"
    ],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Nested Slicing Reversal",
    explanation: "matrix[::-1] reverses the rows ([7,8,9], [4,5,6], [1,2,3]), and row[::-1] reverses the elements of each row, giving [[9, 8, 7], [6, 5, 4], [3, 2, 1]]."
  },
  {
    id: "sec1-set3-q28",
    question: "What is the result of using a mutable object as a dictionary key?",
    code: "try:\n    d = {[1, 2]: 'val'}\nexcept TypeError as e:\n    print('TypeError caught')\n",
    options: ["TypeError caught", "{[1, 2]: 'val'}", "None", "KeyError"],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Unhashable Types as Keys",
    explanation: "Dictionary keys must be hashable. Lists are mutable and unhashable, so creating a dict with a list key raises a TypeError."
  },
  {
    id: "sec1-set3-q29",
    question: "What does the following string encoding and decoding operation produce?",
    code: "raw = b'Python\\x61'\nprint(raw.decode('utf-8'))",
    options: ["Pythona", "Python\\x61", "Python61", "UnicodeDecodeError"],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Bytes & Hex Encoding",
    explanation: "\\x61 is hexadecimal ASCII for lowercase 'a'. Decoding the bytes object b'Python\\x61' yields 'Pythona'."
  },
  {
    id: "sec1-set3-q30",
    question: "What is the output of the following boolean reduction with empty collections?",
    code: "print(all([]), any([]))",
    options: ["True False", "False True", "False False", "True True"],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Vacuous Truth in all() and any()",
    explanation: "'all([])' is vacuously True (there are no False elements in the iterable). 'any([])' is False (there are no True elements). Result: 'True False'."
  }
];
