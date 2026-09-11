import { Question } from '../types';

export const section2Set3Questions: Question[] = [
  // EASY (1-10)
  {
    id: "sec2-set3-q01",
    question: "What built-in function returns the memory address/identity of an object?",
    code: undefined,
    options: ["id()", "mem()", "address()", "hash()"],
    correctAnswer: 0,
    difficulty: "easy",
    topic: "Built-in Functions",
    explanation: "'id(obj)' returns the unique integer representing the identity/memory address of the object."
  },
  {
    id: "sec2-set3-q02",
    question: "How do you define a function that does nothing when called?",
    code: "def noop():\n    pass",
    options: [
      "Using the 'pass' keyword as the function body",
      "By omitting the function body entirely",
      "Using the 'empty' keyword",
      "Using 'return False'"
    ],
    correctAnswer: 0,
    difficulty: "easy",
    topic: "Function Syntax",
    explanation: "Because Python requires indented blocks, 'pass' is used as a no-op placeholder body."
  },
  {
    id: "sec2-set3-q03",
    question: "What is the output of 'math.pow(2, 3)'?",
    code: "import math\nprint(math.pow(2, 3))",
    options: ["8.0", "8", "6", "9.0"],
    correctAnswer: 0,
    difficulty: "easy",
    topic: "Math Module",
    explanation: "'math.pow()' converts both arguments to float and always returns a floating-point number (8.0)."
  },
  {
    id: "sec2-set3-q04",
    question: "Which keyword allows you to modify a global variable from inside a function?",
    code: undefined,
    options: ["global", "outer", "extern", "var"],
    correctAnswer: 0,
    difficulty: "easy",
    topic: "Global Scope",
    explanation: "The 'global' keyword informs Python that assignments to a specific variable name target module-level scope."
  },
  {
    id: "sec2-set3-q05",
    question: "What will 'print(*[1, 2, 3])' output?",
    code: "print(*[1, 2, 3])",
    options: ["1 2 3", "[1, 2, 3]", "(1, 2, 3)", "Error"],
    correctAnswer: 0,
    difficulty: "easy",
    topic: "Argument Unpacking",
    explanation: "'*[1, 2, 3]' unpacks the list elements into individual positional arguments for print(): '1 2 3'."
  },
  {
    id: "sec2-set3-q06",
    question: "What is the output of the 'type()' function on a lambda expression?",
    code: "f = lambda x: x\nprint(type(f))",
    options: ["<class 'function'>", "<class 'lambda'>", "<class 'anonymous'>", "<class 'closure'>"],
    correctAnswer: 0,
    difficulty: "easy",
    topic: "Lambda Type",
    explanation: "In Python, lambda expressions produce regular function instances of type '<class 'function'>'."
  },
  {
    id: "sec2-set3-q07",
    question: "What is the output of 'bool(all([1, 2, 3]))'?",
    code: "print(all([1, 2, 3]))",
    options: ["True", "False", "1", "3"],
    correctAnswer: 0,
    difficulty: "easy",
    topic: "Built-in Truth Checks",
    explanation: "All elements (1, 2, 3) are truthy non-zero integers, so all() returns True."
  },
  {
    id: "sec2-set3-q08",
    question: "What is the output of 'math.sqrt(16)'?",
    code: "import math\nprint(math.sqrt(16))",
    options: ["4.0", "4", "2.0", "16.0"],
    correctAnswer: 0,
    difficulty: "easy",
    topic: "Math Module",
    explanation: "'math.sqrt(x)' returns the square root of x as a float (4.0)."
  },
  {
    id: "sec2-set3-q09",
    question: "Can multiple functions have the same name in the same scope in Python?",
    code: "def test(): return 1\ndef test(): return 2\nprint(test())",
    options: ["2", "1", "OverloadError", "SyntaxError"],
    correctAnswer: 0,
    difficulty: "easy",
    topic: "Function Rebinding",
    explanation: "Python does not support traditional name-based function overloading; the second definition rebinds the identifier 'test' to the new function returning 2."
  },
  {
    id: "sec2-set3-q10",
    question: "Which built-in function returns an integer count of the elements in an iterable?",
    code: undefined,
    options: ["len()", "count()", "size()", "length()"],
    correctAnswer: 0,
    difficulty: "easy",
    topic: "Built-in Functions",
    explanation: "'len()' is the built-in function that returns the number of items of an object."
  },

  // MEDIUM (11-20)
  {
    id: "sec2-set3-q11",
    question: "What is the output of chaining 'map()' and 'filter()' with lambda expressions?",
    code: "nums = [1, 2, 3, 4, 5]\nres = list(map(lambda x: x * 10, filter(lambda x: x % 2 != 0, nums)))\nprint(res)",
    options: ["[10, 30, 50]", "[20, 40]", "[10, 20, 30, 40, 50]", "[1, 3, 5]"],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "Functional Pipeline",
    explanation: "filter keeps odd numbers [1, 3, 5], and map multiplies each by 10 -> [10, 30, 50]."
  },
  {
    id: "sec2-set3-q12",
    question: "What is the output of unpacking a nested tuple in a function argument list?",
    code: "def display((a, b)): pass  # In Python 3, tuple parameter unpacking was removed",
    options: [
      "SyntaxError in Python 3",
      "Valid syntax that unpacks the tuple",
      "TypeError at runtime",
      "Warning only"
    ],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "Python 3 Syntax Removals",
    explanation: "Tuple parameter unpacking like 'def fn((a, b)):' was explicitly removed in Python 3 and raises a SyntaxError (PEP 3113)."
  },
  {
    id: "sec2-set3-q13",
    question: "What does 'itertools.chain()' do when given multiple iterables?",
    code: "import itertools\ncombined = list(itertools.chain([1, 2], ['a', 'b']))\nprint(combined)",
    options: ["[1, 2, 'a', 'b']", "[[1, 2], ['a', 'b']]", "[(1, 'a'), (2, 'b')]", "TypeError"],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "Itertools Chain",
    explanation: "'itertools.chain(*iterables)' produces elements from the first iterable until exhausted, then proceeds to the next: [1, 2, 'a', 'b']."
  },
  {
    id: "sec2-set3-q14",
    question: "What is the output of the recursive string reversal function?",
    code: "def rev(s):\n    if len(s) <= 1: return s\n    return rev(s[1:]) + s[0]\nprint(rev('quiz'))",
    options: ["ziuq", "quiz", "ziqu", "quzi"],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "Recursive String Manipulation",
    explanation: "The recursive step peels the head character and appends it to the reversed tail, producing 'ziuq'."
  },
  {
    id: "sec2-set3-q15",
    question: "What will be printed when passing mutable vs immutable objects to a function?",
    code: "def modify(n, lst):\n    n += 10\n    lst.append(99)\n\nx = 5\nl = [1]\nmodify(x, l)\nprint(x, l)",
    options: ["5 [1, 99]", "15 [1, 99]", "5 [1]", "15 [1]"],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "Pass-by-Object-Reference",
    explanation: "Integers are immutable so re-binding 'n += 10' does not affect external 'x'. The list 'l' is mutable and modified in place ([1, 99])."
  },
  {
    id: "sec2-set3-q16",
    question: "What is the output of 'collections.defaultdict' with an integer factory?",
    code: "from collections import defaultdict\nd = defaultdict(int)\nd['apple'] += 3\nprint(d['apple'], d['banana'])",
    options: ["3 0", "3 KeyError", "3 None", "{'apple': 3}"],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "Collections Defaultdict",
    explanation: "'defaultdict(int)' initializes missing keys with int() = 0, so d['banana'] is automatically 0."
  },
  {
    id: "sec2-set3-q17",
    question: "What is the output of 'collections.Counter' counting character frequencies?",
    code: "from collections import Counter\nc = Counter('abracadabra')\nprint(c['a'], c['b'])",
    options: ["5 2", "4 2", "5 1", "3 2"],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "Collections Counter",
    explanation: "In 'abracadabra', 'a' appears 5 times and 'b' appears 2 times."
  },
  {
    id: "sec2-set3-q18",
    question: "What is the output of the 'math.isclose()' function for float equality comparison?",
    code: "import math\nprint(math.isclose(0.1 + 0.2, 0.3))",
    options: ["True", "False", "0.3", "TypeError"],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "Math isclose for Floats",
    explanation: "'math.isclose(a, b)' tests whether two floating-point values are close with relative tolerance (True)."
  },
  {
    id: "sec2-set3-q19",
    question: "What is the output of the built-in 'vars()' function on an object?",
    code: "class Point:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\npt = Point(3, 4)\nprint(vars(pt))",
    options: ["{'x': 3, 'y': 4}", "['x', 'y']", "(3, 4)", "None"],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "Vars Built-in",
    explanation: "'vars(obj)' returns the '__dict__' attribute of an object as a dictionary: {'x': 3, 'y': 4}."
  },
  {
    id: "sec2-set3-q20",
    question: "What is the output of using 'sorted()' with a custom tuple sort key?",
    code: "students = [('Alice', 85), ('Bob', 90), ('Charlie', 85)]\n# Sort by score descending, then name ascending\nsorted_s = sorted(students, key=lambda s: (-s[1], s[0]))\nprint(sorted_s[0][0], sorted_s[1][0])",
    options: ["Bob Alice", "Bob Charlie", "Alice Charlie", "Charlie Bob"],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "Multi-criteria Sorting with Tuples",
    explanation: "Bob has the highest score 90 (-90 is smallest). Alice and Charlie tie at 85 (-85), with Alice preceding Charlie alphabetically. Order: Bob, Alice, Charlie."
  },

  // HARD (21-30)
  {
    id: "sec2-set3-q21",
    question: "What is the output of 'functools.singledispatch' generic function mechanism?",
    code: "from functools import singledispatch\n@singledispatch\ndef process(arg):\n    return f'default: {arg}'\n\n@process.register(int)\ndef _(arg):\n    return f'int: {arg * 2}'\n\n@process.register(str)\ndef _(arg):\n    return f'str: {arg.upper()}'\n\nprint(process(10), process('hi'), process(3.14))",
    options: [
      "int: 20 str: HI default: 3.14",
      "default: 10 default: hi default: 3.14",
      "int: 20 str: hi default: 3.14",
      "TypeError"
    ],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Single-Dispatch Generic Functions",
    explanation: "'@singledispatch' routes the call based on the runtime type of the first argument: int -> 'int: 20', str -> 'str: HI', float -> fallback 'default: 3.14'."
  },
  {
    id: "sec2-set3-q22",
    question: "What is the output of 'sys.settrace()' or inspecting frame local variables via 'inspect.currentframe()'?",
    code: "import inspect\ndef outer_frame_test():\n    local_secret = 999\n    return inspect.currentframe().f_locals['local_secret']\nprint(outer_frame_test())",
    options: ["999", "None", "KeyError", "AttributeError"],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Frame Inspection & Locals",
    explanation: "The Python call stack frame's 'f_locals' attribute exposes a dictionary mapping local variable names to current values (999)."
  },
  {
    id: "sec2-set3-q23",
    question: "What is the result of using a custom generator with 'close()' and GeneratorExit exception?",
    code: "def gen_cleanup():\n    try:\n        yield 1\n        yield 2\n    finally:\n        print('Cleaned', end=' ')\n\ng = gen_cleanup()\nnext(g)\ng.close()",
    options: ["Cleaned ", "1 Cleaned ", "Nothing is printed", "GeneratorExit"],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Generator Lifecycle & Cleanup",
    explanation: "'g.close()' raises a 'GeneratorExit' exception at the suspension point inside the generator, triggering its 'finally' block ('Cleaned ')."
  },
  {
    id: "sec2-set3-q24",
    question: "What is the output of using '__code__.co_varnames' and '__code__.co_argcount' on a function?",
    code: "def sample(a, b=2, *args, c=3, **kwargs):\n    x = 10\nprint(sample.__code__.co_argcount)",
    options: ["2", "4", "5", "1"],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Code Object Bytecode Introspection",
    explanation: "'co_argcount' counts regular positional/positional-or-keyword arguments only (here 'a' and 'b' = 2), excluding varargs, kw-only args, and varkwargs."
  },
  {
    id: "sec2-set3-q25",
    question: "What happens when using 'typing.get_type_hints()' on a class with forward references?",
    code: "from typing import get_type_hints\nclass Node:\n    next: 'Node'\nprint(get_type_hints(Node)['next'])",
    options: ["<class '__main__.Node'>", "'Node'", "None", "NameError"],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Type Hints Forward Reference Resolution",
    explanation: "'get_type_hints()' evaluates string forward references against the class/module namespace, resolving 'Node' to the actual class object."
  },
  {
    id: "sec2-set3-q26",
    question: "What is the output of 'itertools.groupby()' on unsorted vs sorted lists?",
    code: "import itertools\ndata = [1, 1, 2, 1, 1]\ngroups = [k for k, g in itertools.groupby(data)]\nprint(groups)",
    options: ["[1, 2, 1]", "[1, 2]", "[1, 1, 2, 1, 1]", "[2, 1]"],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Itertools Groupby Consecutive Grouping",
    explanation: "'groupby()' groups consecutive matching keys. Because the input is not pre-sorted, it yields 1 (first run), 2 (second run), and 1 (third run) -> [1, 2, 1]."
  },
  {
    id: "sec2-set3-q27",
    question: "What is the output of modifying '__defaults__' on a Python function directly?",
    code: "def f(a, b=10):\n    return a + b\nf.__defaults__ = (50,)\nprint(f(5))",
    options: ["55", "15", "TypeError", "AttributeError: __defaults__ is read-only"],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Function Bytecode __defaults__ Mutation",
    explanation: "'__defaults__' is a writable tuple on function objects holding default positional argument values. Setting it to (50,) makes b=50 -> 5 + 50 = 55."
  },
  {
    id: "sec2-set3-q28",
    question: "What is the output of the following chained coroutine delegator using yield?",
    code: "def reader():\n    val = yield\n    yield val * 10\n\nr = reader()\nnext(r)\nprint(r.send(5))",
    options: ["50", "5", "None", "StopIteration"],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Two-way Coroutine Communication",
    explanation: "next(r) pauses at 'yield'. r.send(5) sets val = 5 and resumes to 'yield val * 10', which evaluates to 50 and yields it back."
  },
  {
    id: "sec2-set3-q29",
    question: "What is the behavior of 'importlib.reload()' on an imported module with modified state?",
    code: "import importlib\n# Assume module 'm' is loaded and reloaded with importlib.reload(m)",
    options: [
      "It re-executes the module code in place, updating the existing module dictionary",
      "It creates a completely new module object and invalidates all existing references",
      "It raises an ImportError if the module was already imported",
      "It reboots the Python virtual machine process"
    ],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Importlib Module Reloading",
    explanation: "'importlib.reload()' re-parses and re-initializes the module's file in place within the existing module object in sys.modules."
  },
  {
    id: "sec2-set3-q30",
    question: "What does 'types.MethodType' do when binding a standalone function to an instance?",
    code: "import types\nclass Agent: pass\ndef act(self): return 'Action'\n\na = Agent()\na.act = types.MethodType(act, a)\nprint(a.act())",
    options: ["Action", "TypeError: missing 1 required positional argument: 'self'", "None", "AttributeError"],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Dynamic Method Binding with MethodType",
    explanation: "'types.MethodType(fn, instance)' dynamically binds a function to a specific instance so that calling 'a.act()' passes 'a' as 'self' automatically."
  }
];
