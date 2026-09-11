import { Question } from '../types';

export const section2Set2Questions: Question[] = [
  // EASY (1-10)
  {
    id: "sec2-set2-q01",
    question: "What is a parameter in a function definition vs an argument in a function call?",
    code: undefined,
    options: [
      "Parameters are variables in the definition; arguments are actual values passed",
      "Arguments are variables in the definition; parameters are actual values passed",
      "They are completely synonymous with no distinction",
      "Parameters must be integers, arguments must be strings"
    ],
    correctAnswer: 0,
    difficulty: "easy",
    topic: "Function Terminology",
    explanation: "Parameters are the variable names in the function header; arguments are the concrete values provided when calling the function."
  },
  {
    id: "sec2-set2-q02",
    question: "What is the output of calling a function with multiple return values?",
    code: "def get_point():\n    return 10, 20\npt = get_point()\nprint(type(pt), pt)",
    options: ["<class 'tuple'> (10, 20)", "<class 'list'> [10, 20]", "<class 'dict'> {10: 20}", "SyntaxError"],
    correctAnswer: 0,
    difficulty: "easy",
    topic: "Multiple Return Values",
    explanation: "Comma-separated return values in Python are automatically packed into a tuple."
  },
  {
    id: "sec2-set2-q03",
    question: "Which built-in module provides functions for generating pseudo-random numbers?",
    code: undefined,
    options: ["rand", "random", "pseudo", "math.random"],
    correctAnswer: 1,
    difficulty: "easy",
    topic: "Standard Library",
    explanation: "Python's standard library provides the 'random' module for random number generation, shuffling, and sampling."
  },
  {
    id: "sec2-set2-q04",
    question: "What does 'random.choice()' do on a non-empty sequence?",
    code: "import random\n# Given items = ['a', 'b', 'c']",
    options: [
      "Selects and returns a random single element from the sequence",
      "Sorts the sequence randomly",
      "Removes a random element from the sequence",
      "Returns the index of a random element"
    ],
    correctAnswer: 0,
    difficulty: "easy",
    topic: "Random Module",
    explanation: "'random.choice(seq)' returns a randomly chosen element from a non-empty sequence."
  },
  {
    id: "sec2-set2-q05",
    question: "What is the result of passing arguments by keyword out of order?",
    code: "def describe(animal, count):\n    return f'{count} {animal}s'\nprint(describe(count=3, animal='cat'))",
    options: ["3 cats", "cat 3s", "TypeError", "SyntaxError"],
    correctAnswer: 0,
    difficulty: "easy",
    topic: "Keyword Arguments",
    explanation: "Keyword arguments can be provided in any order because Python matches them by parameter name."
  },
  {
    id: "sec2-set2-q06",
    question: "Can a Python function call itself?",
    code: undefined,
    options: [
      "Yes, this programming technique is called recursion",
      "No, Python strictly prohibits self-calling functions",
      "Only if it is marked with the @recursive decorator",
      "Only inside class methods"
    ],
    correctAnswer: 0,
    difficulty: "easy",
    topic: "Recursion Basics",
    explanation: "Functions in Python can call themselves directly or indirectly, which is known as recursion."
  },
  {
    id: "sec2-set2-q07",
    question: "What is the output of the built-in 'sum()' function on a list of numbers?",
    code: "print(sum([10, 20, 30], start=5))",
    options: ["60", "65", "55", "TypeError"],
    correctAnswer: 1,
    difficulty: "easy",
    topic: "Sum Built-in",
    explanation: "'sum(iterable, start)' adds elements to the start value: 5 + 10 + 20 + 30 = 65."
  },
  {
    id: "sec2-set2-q08",
    question: "What does the 'os.path.join()' function do?",
    code: undefined,
    options: [
      "Concatenates path components using the OS-specific directory separator",
      "Creates a new directory on disk",
      "Finds files with matching names",
      "Opens multiple files at once"
    ],
    correctAnswer: 0,
    difficulty: "easy",
    topic: "OS Path Module",
    explanation: "'os.path.join()' intelligently joins one or more path components using the platform's separator ('/' or '\\')."
  },
  {
    id: "sec2-set2-q09",
    question: "What is the output of 'callable(print)' in Python?",
    code: "print(callable(print), callable(42))",
    options: ["True False", "True True", "False True", "False False"],
    correctAnswer: 0,
    difficulty: "easy",
    topic: "Callable Built-in",
    explanation: "'callable()' returns True if the argument is a function, method, or callable object, and False for primitives like 42."
  },
  {
    id: "sec2-set2-q10",
    question: "Which of the following functions transforms a list into an iterator?",
    code: undefined,
    options: ["iter()", "to_iter()", "loop()", "yield()"],
    correctAnswer: 0,
    difficulty: "easy",
    topic: "Iterators",
    explanation: "The built-in 'iter()' function returns an iterator object from any iterable container."
  },

  // MEDIUM (11-20)
  {
    id: "sec2-set2-q11",
    question: "What is the output of the following partial function application?",
    code: "from functools import partial\ndef power(base, exp):\n    return base ** exp\nsquare = partial(power, exp=2)\nprint(square(5))",
    options: ["25", "32", "10", "TypeError"],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "Functools Partial",
    explanation: "'partial(power, exp=2)' fixes the 'exp' keyword argument to 2. Calling square(5) evaluates power(5, exp=2) = 25."
  },
  {
    id: "sec2-set2-q12",
    question: "What is the output of sorting a list of tuples using a lambda key?",
    code: "pairs = [(1, 'one'), (3, 'three'), (2, 'two')]\npairs.sort(key=lambda p: p[1])\nprint(pairs[0])",
    options: ["(1, 'one')", "(3, 'three')", "(2, 'two')", "(1, 1)"],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "Custom Sort Key",
    explanation: "Sorting by p[1] (the string name) orders alphabetically: 'one' (starts with 'o'), 'three' ('t'), 'two' ('t'). 'one' comes first alphabetically among 'one', 'three', 'two'."
  },
  {
    id: "sec2-set2-q13",
    question: "What will happen if a recursive function lacks a base case?",
    code: "def loop():\n    return loop()\ntry:\n    loop()\nexcept RecursionError:\n    print('RecursionError caught')",
    options: ["RecursionError caught", "Infinite hang with no error", "StackOverflowError", "MemoryError"],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "Recursion Depth Exceeded",
    explanation: "Exceeding Python's maximum call stack limit raises a 'RecursionError: maximum recursion depth exceeded'."
  },
  {
    id: "sec2-set2-q14",
    question: "What is the output when defining a function with both *args and regular positional parameters?",
    code: "def show(a, b, *rest):\n    return f'a={a}, b={b}, rest={rest}'\nprint(show(1, 2, 3, 4, 5))",
    options: [
      "a=1, b=2, rest=(3, 4, 5)",
      "a=1, b=2, rest=[3, 4, 5]",
      "a=1, b=2, rest=3",
      "TypeError"
    ],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "Positional & Args Unpacking",
    explanation: "'a' takes 1, 'b' takes 2, and all remaining arguments are collected into a tuple in 'rest': (3, 4, 5)."
  },
  {
    id: "sec2-set2-q15",
    question: "What is the output of the 'math.gcd()' function in Python 3?",
    code: "import math\nprint(math.gcd(48, 18))",
    options: ["6", "3", "9", "2"],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "Math GCD",
    explanation: "The greatest common divisor of 48 and 18 is 6."
  },
  {
    id: "sec2-set2-q16",
    question: "What is the output of the 'any()' function with a generator expression checking for negative numbers?",
    code: "nums = [10, 20, -5, 30]\nprint(any(n < 0 for n in nums))",
    options: ["True", "False", "[-5]", "None"],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "Any with Generator",
    explanation: "Because -5 < 0 is True, 'any()' short-circuits and returns True immediately."
  },
  {
    id: "sec2-set2-q17",
    question: "What does the 'globals()' function return?",
    code: "print(type(globals()))",
    options: ["<class 'dict'>", "<class 'list'>", "<class 'set'>", "<class 'module'>"],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "Introspection & Globals",
    explanation: "'globals()' returns a dictionary representing the current global symbol table."
  },
  {
    id: "sec2-set2-q18",
    question: "What is the output of chaining two decorators on a function?",
    code: "def d1(f):\n    return lambda: f'[{f()}]'\ndef d2(f):\n    return lambda: f'({f()})'\n\n@d1\n@d2\ndef message():\n    return 'msg'\n\nprint(message())",
    options: ["[(msg)]", "([msg])", "[msg]", "(msg)"],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "Decorator Chaining Order",
    explanation: "Decorators are applied bottom-up: d2 wraps message first to return '(msg)', then d1 wraps that to produce '[(msg)]'."
  },
  {
    id: "sec2-set2-q19",
    question: "What is the output of passing a generator expression to 'join()'?",
    code: "print('-'.join(str(x) for x in range(4)))",
    options: ["0-1-2-3", "0-1-2-3-", "-0-1-2-3", "0 1 2 3"],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "String Join on Generators",
    explanation: "'str.join()' iterates through the generator and joins the string representations with '-' delimiters."
  },
  {
    id: "sec2-set2-q20",
    question: "What is the output of lambda functions used in 'sorted()' with reverse=True?",
    code: "words = ['a', 'ccc', 'bb']\nprint(sorted(words, key=lambda w: len(w), reverse=True))",
    options: ["['ccc', 'bb', 'a']", "['a', 'bb', 'ccc']", "['ccc', 'a', 'bb']", "['bb', 'ccc', 'a']"],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "Sorted with Key and Reverse",
    explanation: "Sorting by string length in descending order places 'ccc' (len 3), 'bb' (len 2), and 'a' (len 1)."
  },

  // HARD (21-30)
  {
    id: "sec2-set2-q21",
    question: "What is the output of a decorator taking arguments (decorator factory)?",
    code: "def repeat(n):\n    def decorator(fn):\n        def wrapper(*args, **kwargs):\n            res = []\n            for _ in range(n):\n                res.append(fn(*args, **kwargs))\n            return res\n        return wrapper\n    return decorator\n\n@repeat(3)\ndef ping():\n    return 'pong'\n\nprint(ping())",
    options: ["['pong', 'pong', 'pong']", "'pong pong pong'", "['pong']", "TypeError"],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Decorator Factories with Arguments",
    explanation: "'repeat(3)' returns a decorator configured to execute ping() 3 times and collect outputs in a list: ['pong', 'pong', 'pong']."
  },
  {
    id: "sec2-set2-q22",
    question: "What is the output of 'functools.lru_cache' on a recursive function with cache inspection?",
    code: "from functools import lru_cache\n@lru_cache(maxsize=None)\ndef count_ways(n):\n    if n <= 1: return 1\n    return count_ways(n-1) + count_ways(n-2)\n\nprint(count_ways(5), count_ways.cache_info().hits > 0)",
    options: ["8 True", "8 False", "5 True", "13 True"],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "LRU Cache & Memoization",
    explanation: "count_ways(5) calculates the 5th Fibonacci-style step (8), reusing memoized subcalls and recording multiple cache hits (True)."
  },
  {
    id: "sec2-set2-q23",
    question: "What is the output of generator delegation using the 'yield from' syntax?",
    code: "def sub_gen():\n    yield 'A'\n    yield 'B'\n\ndef main_gen():\n    yield 1\n    yield from sub_gen()\n    yield 2\n\nprint(list(main_gen()))",
    options: ["[1, 'A', 'B', 2]", "[1, <generator>, 2]", "[1, 2, 'A', 'B']", "TypeError"],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Yield From Generator Delegation",
    explanation: "'yield from' delegates iteration to the sub-generator transparently, yielding elements in order: [1, 'A', 'B', 2]."
  },
  {
    id: "sec2-set2-q24",
    question: "What is the output of sending values into a generator using 'send()'?",
    code: "def accumulator():\n    total = 0\n    while True:\n        val = yield total\n        if val is None: break\n        total += val\n\nacc = accumulator()\nprint(next(acc), acc.send(10), acc.send(20))",
    options: ["0 10 30", "0 0 10", "10 20 30", "TypeError"],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Coroutine Generators & send()",
    explanation: "'next(acc)' primes the generator and yields initial total (0). 'acc.send(10)' sets val=10 -> total=10 and yields 10. 'acc.send(20)' sets val=20 -> total=30 and yields 30."
  },
  {
    id: "sec2-set2-q25",
    question: "What is the behavior of function attribute assignment for state retention?",
    code: "def counter():\n    counter.count += 1\n    return counter.count\ncounter.count = 0\n\nprint(counter(), counter(), counter())",
    options: ["1 2 3", "1 1 1", "0 1 2", "AttributeError"],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Function Attributes as State",
    explanation: "Functions in Python are first-class objects capable of storing custom attributes. Calling counter() increments counter.count each time: 1 2 3."
  },
  {
    id: "sec2-set2-q26",
    question: "What is the result of applying 'inspect.signature()' to inspect default parameter values?",
    code: "import inspect\ndef fn(a, b=42, *, c='default'):\n    pass\nsig = inspect.signature(fn)\nprint(sig.parameters['b'].default, sig.parameters['c'].kind.name)",
    options: [
      "42 KEYWORD_ONLY",
      "42 POSITIONAL_OR_KEYWORD",
      "42 VAR_KEYWORD",
      "default KEYWORD_ONLY"
    ],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Inspect Module Signatures",
    explanation: "Parameter 'b' has default value 42, and parameter 'c' (following the bare '*') is of kind KEYWORD_ONLY."
  },
  {
    id: "sec2-set2-q27",
    question: "What happens when using 'contextlib.contextmanager' with a generator function?",
    code: "from contextlib import contextmanager\n\n@contextmanager\ndef managed_resource():\n    print('Enter', end=' ')\n    try:\n        yield 42\n    finally:\n        print('Exit', end=' ')\n\nwith managed_resource() as val:\n    print(f'Val={val}', end=' ')",
    options: [
      "Enter Val=42 Exit ",
      "Enter Exit Val=42 ",
      "Val=42 Enter Exit ",
      "SyntaxError"
    ],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Contextlib Context Managers",
    explanation: "The code before yield runs on entering the 'with' block ('Enter'), the yielded value 42 is bound to 'val' ('Val=42'), and the 'finally' block executes upon exiting ('Exit')."
  },
  {
    id: "sec2-set2-q28",
    question: "What is the output of 'operator.itemgetter()' with multiple keys?",
    code: "from operator import itemgetter\ngetter = itemgetter(1, 3)\nprint(getter(['a', 'b', 'c', 'd', 'e']))",
    options: ["('b', 'd')", "['b', 'd']", "('c', 'e')", "'bd'"],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Operator Module Itemgetter",
    explanation: "'itemgetter(1, 3)' fetches elements at index 1 ('b') and index 3 ('d') and returns them as a tuple ('b', 'd')."
  },
  {
    id: "sec2-set2-q29",
    question: "What is the result of using 'sys.modules' to dynamically inspect imported modules?",
    code: "import math\nimport sys\nprint('math' in sys.modules)",
    options: ["True", "False", "None", "KeyError"],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Sys Modules Table",
    explanation: "'sys.modules' is a dictionary containing all currently loaded/imported modules in the active Python session."
  },
  {
    id: "sec2-set2-q30",
    question: "What does 'itertools.islice()' do with infinite iterators?",
    code: "import itertools\ncount_gen = itertools.count(start=10, step=5)\nfirst_three = list(itertools.islice(count_gen, 3))\nprint(first_three)",
    options: ["[10, 15, 20]", "[10, 11, 12]", "[0, 5, 10]", "[15, 20, 25]"],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Itertools Infinite Slicing",
    explanation: "'itertools.count(10, 5)' produces 10, 15, 20, 25, ... and 'islice(..., 3)' extracts the first 3 values: [10, 15, 20]."
  }
];
