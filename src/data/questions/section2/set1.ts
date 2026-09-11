import { Question } from '../types';

export const section2Set1Questions: Question[] = [
  // EASY (1-10)
  {
    id: "sec2-set1-q01",
    question: "Which keyword is used to define a function in Python?",
    code: undefined,
    options: ["function", "def", "func", "define"],
    correctAnswer: 1,
    difficulty: "easy",
    topic: "Function Definition",
    explanation: "Functions in Python are defined using the 'def' keyword followed by the function name and parentheses."
  },
  {
    id: "sec2-set1-q02",
    question: "What is the return value of a Python function that does not contain an explicit 'return' statement?",
    code: "def greet():\n    print('Hello')\nres = greet()\nprint(res)",
    options: ["0", "False", "None", "undefined"],
    correctAnswer: 2,
    difficulty: "easy",
    topic: "Default Return Value",
    explanation: "If a function finishes execution without hitting a return statement, it implicitly returns 'None'."
  },
  {
    id: "sec2-set1-q03",
    question: "What syntax is used to define an anonymous inline function in Python?",
    code: undefined,
    options: ["anon", "lambda", "inline", "arrow =>"],
    correctAnswer: 1,
    difficulty: "easy",
    topic: "Lambda Functions",
    explanation: "The 'lambda' keyword creates anonymous, one-line functions in Python."
  },
  {
    id: "sec2-set1-q04",
    question: "What is the output of the following function call with positional arguments?",
    code: "def add(a, b=5):\n    return a + b\nprint(add(3))",
    options: ["3", "5", "8", "Error"],
    correctAnswer: 2,
    difficulty: "easy",
    topic: "Default Arguments",
    explanation: "The argument 'a' receives 3, while 'b' uses its default value of 5. 3 + 5 = 8."
  },
  {
    id: "sec2-set1-q05",
    question: "What does '*args' in a function parameter list collect?",
    code: undefined,
    options: [
      "Keyword arguments as a dictionary",
      "Positional arguments as a tuple",
      "Required arguments as a list",
      "Type annotations as a string"
    ],
    correctAnswer: 1,
    difficulty: "easy",
    topic: "Variable-length Arguments",
    explanation: "'*args' captures extra positional arguments passed to a function into a tuple."
  },
  {
    id: "sec2-set1-q06",
    question: "What does '**kwargs' in a function signature capture?",
    code: undefined,
    options: [
      "Extra positional arguments as a list",
      "Keyword arguments as a dictionary",
      "Return types as a dictionary",
      "Default parameters as a tuple"
    ],
    correctAnswer: 1,
    difficulty: "easy",
    topic: "Keyword Arguments",
    explanation: "'**kwargs' collects any arbitrary keyword arguments into a standard Python dictionary."
  },
  {
    id: "sec2-set1-q07",
    question: "What is the output of the following lambda invocation?",
    code: "square = lambda x: x * x\nprint(square(6))",
    options: ["12", "36", "64", "6"],
    correctAnswer: 1,
    difficulty: "easy",
    topic: "Lambda Functions",
    explanation: "The lambda squares its input argument: 6 * 6 = 36."
  },
  {
    id: "sec2-set1-q08",
    question: "Which statement is used to import a specific function from a module?",
    code: undefined,
    options: [
      "import func from module",
      "from module import func",
      "require(module).func",
      "using module.func"
    ],
    correctAnswer: 1,
    difficulty: "easy",
    topic: "Module Imports",
    explanation: "The 'from <module> import <name>' statement is the standard Python syntax to import specific objects from a module."
  },
  {
    id: "sec2-set1-q09",
    question: "What is the output of the 'math.ceil()' function on 4.2?",
    code: "import math\nprint(math.ceil(4.2))",
    options: ["4", "5", "4.0", "5.0"],
    correctAnswer: 1,
    difficulty: "easy",
    topic: "Standard Library Math",
    explanation: "'math.ceil()' rounds up to the nearest integer greater than or equal to the argument (5)."
  },
  {
    id: "sec2-set1-q10",
    question: "What does a docstring at the beginning of a function define?",
    code: "def sample():\n    '''Documentation string'''\n    pass\nprint(sample.__doc__)",
    options: ["None", "Documentation string", "sample", "SyntaxError"],
    correctAnswer: 1,
    difficulty: "easy",
    topic: "Docstrings",
    explanation: "Triple-quoted strings placed directly under a function header populate its '__doc__' attribute."
  },

  // MEDIUM (11-20)
  {
    id: "sec2-set1-q11",
    question: "What is the output when unpacking a dictionary into keyword arguments?",
    code: "def greet(name, age):\n    return f'{name} is {age}'\ninfo = {'name': 'Sam', 'age': 25}\nprint(greet(**info))",
    options: ["Sam is 25", "name is age", "{'name': 'Sam', 'age': 25}", "TypeError"],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "Argument Unpacking",
    explanation: "'**info' unpacks the dictionary keys and values as keyword arguments 'name=Sam' and 'age=25'."
  },
  {
    id: "sec2-set1-q12",
    question: "What is the output of the 'map()' function combined with 'list()'?",
    code: "nums = [1, 2, 3, 4]\nresult = list(map(lambda x: x * 2, nums))\nprint(result)",
    options: ["[1, 2, 3, 4, 1, 2, 3, 4]", "[2, 4, 6, 8]", "[1, 4, 9, 16]", "[2, 4]"],
    correctAnswer: 1,
    difficulty: "medium",
    topic: "Map Built-in",
    explanation: "'map()' applies the lambda (multiplying each item by 2) to each element of nums, yielding [2, 4, 6, 8]."
  },
  {
    id: "sec2-set1-q13",
    question: "What is the output of the 'filter()' function filtering even numbers?",
    code: "nums = range(6)\nresult = list(filter(lambda x: x % 2 == 0, nums))\nprint(result)",
    options: ["[0, 2, 4]", "[2, 4]", "[1, 3, 5]", "[0, 1, 2, 3, 4, 5]"],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "Filter Built-in",
    explanation: "'filter()' keeps elements for which the predicate returns True. For range(6), 0, 2, and 4 are even."
  },
  {
    id: "sec2-set1-q14",
    question: "What is the output of keyword-only arguments separated by an asterisk '*'?",
    code: "def config(host, *, port=8080):\n    return f'{host}:{port}'\nprint(config('localhost', port=3000))",
    options: ["localhost:3000", "localhost:8080", "TypeError", "None"],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "Keyword-Only Parameters",
    explanation: "An isolated '*' in a function signature requires all subsequent parameters (like 'port') to be passed strictly as keyword arguments."
  },
  {
    id: "sec2-set1-q15",
    question: "What will happen if you attempt to call a keyword-only parameter positionally?",
    code: "def serve(*, secure=True):\n    return secure\ntry:\n    serve(False)\nexcept TypeError:\n    print('TypeError')",
    options: ["TypeError", "False", "True", "SyntaxError"],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "Keyword-Only Validation",
    explanation: "Calling 'serve(False)' positionally violates the keyword-only constraint, raising a TypeError."
  },
  {
    id: "sec2-set1-q16",
    question: "What is the output of a simple closure in Python?",
    code: "def make_multiplier(n):\n    return lambda x: x * n\ndouble = make_multiplier(2)\nprint(double(5))",
    options: ["10", "25", "7", "2"],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "Closures",
    explanation: "'double' closes over the variable 'n=2' from the enclosing scope. Calling double(5) calculates 5 * 2 = 10."
  },
  {
    id: "sec2-set1-q17",
    question: "What does the 'nonlocal' keyword do inside an inner nested function?",
    code: "def outer():\n    x = 10\n    def inner():\n        nonlocal x\n        x += 5\n    inner()\n    return x\nprint(outer())",
    options: ["10", "15", "5", "UnboundLocalError"],
    correctAnswer: 1,
    difficulty: "medium",
    topic: "Nonlocal Keyword",
    explanation: "'nonlocal' binds 'x' to the variable in the nearest enclosing non-global scope, allowing inner() to modify outer's 'x' to 15."
  },
  {
    id: "sec2-set1-q18",
    question: "What is the output of 'functools.reduce()' multiplying list items?",
    code: "from functools import reduce\nnums = [1, 2, 3, 4]\nprint(reduce(lambda a, b: a * b, nums))",
    options: ["10", "24", "12", "[1, 2, 6, 24]"],
    correctAnswer: 1,
    difficulty: "medium",
    topic: "Functools Reduce",
    explanation: "'reduce()' folds the function over elements: ((1 * 2) * 3) * 4 = 24."
  },
  {
    id: "sec2-set1-q19",
    question: "What is the value of '__name__' when a Python script is run directly?",
    code: "print(__name__ == '__main__')",
    options: ["True", "False", "None", "NameError"],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "Script Execution Scope",
    explanation: "When a script is run as the top-level program, the interpreter assigns the string '__main__' to the '__name__' variable."
  },
  {
    id: "sec2-set1-q20",
    question: "What is the output of the recursion base case and step in factorial calculation?",
    code: "def fact(n):\n    if n <= 1: return 1\n    return n * fact(n - 1)\nprint(fact(5))",
    options: ["120", "60", "24", "720"],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "Recursion",
    explanation: "fact(5) = 5 * 4 * 3 * 2 * 1 = 120."
  },

  // HARD (21-30)
  {
    id: "sec2-set1-q21",
    question: "What is the output of the late-binding closure pitfall in a list of lambdas?",
    code: "funcs = [lambda: i for i in range(3)]\nprint([f() for f in funcs])",
    options: ["[0, 1, 2]", "[2, 2, 2]", "[3, 3, 3]", "[0, 0, 0]"],
    correctAnswer: 1,
    difficulty: "hard",
    topic: "Late Binding Closures",
    explanation: "Python closures look up the variable 'i' at invocation time, not definition time. When the loop completes, 'i' is 2, so all 3 lambdas return 2."
  },
  {
    id: "sec2-set1-q22",
    question: "How do you correctly fix the late-binding closure pitfall in Python?",
    code: "funcs = [lambda i=i: i for i in range(3)]\nprint([f() for f in funcs])",
    options: ["[0, 1, 2]", "[2, 2, 2]", "SyntaxError", "[3, 3, 3]"],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Default Argument Binding",
    explanation: "Using a default parameter 'i=i' binds the current value of 'i' at definition time to the parameter, producing [0, 1, 2]."
  },
  {
    id: "sec2-set1-q23",
    question: "What is the output of positional-only parameters marked with a forward slash '/'?",
    code: "def calc(a, b, /, c=10):\n    return a + b + c\nprint(calc(1, 2, c=5))",
    options: ["8", "17", "TypeError: positional-only parameter passed as keyword", "13"],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Positional-Only Parameters",
    explanation: "Parameters before '/' ('a', 'b') must be passed positionally. Parameters after '/' ('c') can be passed either positionally or as keyword arguments. 1 + 2 + 5 = 8."
  },
  {
    id: "sec2-set1-q24",
    question: "What exception is raised when passing a positional-only argument as a keyword?",
    code: "def f(x, /):\n    return x\ntry:\n    f(x=10)\nexcept TypeError:\n    print('TypeError')",
    options: ["TypeError", "SyntaxError", "ValueError", "10"],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Positional-Only Constraints",
    explanation: "Passing positional-only parameter 'x' by keyword 'x=10' raises a TypeError."
  },
  {
    id: "sec2-set1-q25",
    question: "What is the output of inspecting function annotations via '__annotations__'?",
    code: "def process(x: int, flag: bool = False) -> str:\n    return str(x)\nprint(process.__annotations__['return'])",
    options: ["<class 'str'>", "'str'", "str", "None"],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Function Annotations",
    explanation: "Function annotations are stored in the '__annotations__' dictionary mapping parameter names and 'return' to their annotated types (<class 'str'>)."
  },
  {
    id: "sec2-set1-q26",
    question: "What is the output of a decorator that replaces a function with a wrapped version?",
    code: "def tag(fn):\n    def wrapper(*args):\n        return f'<b>{fn(*args)}</b>'\n    return wrapper\n\n@tag\ndef greet(name):\n    return f'Hi, {name}'\n\nprint(greet('Eve'))",
    options: ["<b>Hi, Eve</b>", "Hi, Eve", "<b>greet</b>", "TypeError"],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Decorators & Wrappers",
    explanation: "The '@tag' decorator wraps 'greet' so that calling greet('Eve') returns '<b>' + 'Hi, Eve' + '</b>'."
  },
  {
    id: "sec2-set1-q27",
    question: "What does 'functools.wraps' preserve when decorating a function?",
    code: "from functools import wraps\ndef my_dec(f):\n    @wraps(f)\n    def w(*args):\n        return f(*args)\n    return w\n\n@my_dec\ndef original():\n    '''Orig doc'''\n    pass\nprint(original.__name__, original.__doc__)",
    options: [
      "original Orig doc",
      "w None",
      "my_dec Orig doc",
      "original None"
    ],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Functools Wraps Metadata Preservation",
    explanation: "'@wraps(f)' copies metadata like '__name__', '__doc__', and '__module__' from the original function to the wrapper."
  },
  {
    id: "sec2-set1-q28",
    question: "What is the output of a recursive function calculating Fibonacci with memoization dict default?",
    code: "def fib(n, memo={0: 0, 1: 1}):\n    if n not in memo:\n        memo[n] = fib(n-1, memo) + fib(n-2, memo)\n    return memo[n]\nprint(fib(6))",
    options: ["8", "13", "5", "21"],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Memoization & Default Dictionaries",
    explanation: "The memoized fibonacci sequence (0, 1, 1, 2, 3, 5, 8) computes fib(6) = 8 efficiently."
  },
  {
    id: "sec2-set1-q29",
    question: "What happens when using 'yield' inside a function in Python?",
    code: "def count_up():\n    yield 1\n    yield 2\n\nc = count_up()\nprint(type(c), next(c), next(c))",
    options: [
      "<class 'generator'> 1 2",
      "<class 'tuple'> 1 2",
      "<class 'function'> 1 2",
      "<class 'list'> 1 2"
    ],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Generator Functions & Yield",
    explanation: "A function containing 'yield' becomes a generator function. Calling it returns a generator object that produces values on calls to next()."
  },
  {
    id: "sec2-set1-q30",
    question: "What does 'sys.setrecursionlimit()' modify in Python?",
    code: "import sys\nprint(sys.getrecursionlimit() >= 1000)",
    options: [
      "True",
      "False",
      "AttributeError",
      "TypeError"
    ],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Recursion Limit & Sys Module",
    explanation: "Python's default interpreter recursion limit is typically 1000 or higher (sys.getrecursionlimit() >= 1000 evaluates to True)."
  }
];
