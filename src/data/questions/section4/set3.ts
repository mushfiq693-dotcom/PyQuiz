import { Question } from '../types';

export const section4Set3Questions: Question[] = [
  // EASY (1-10)
  {
    id: "sec4-set3-q01",
    question: "Which keyword is used to create a new class in Python?",
    code: undefined,
    options: ["class", "struct", "object", "type"],
    correctAnswer: 0,
    difficulty: "easy",
    topic: "Class Syntax",
    explanation: "Classes in Python are declared with the 'class' keyword followed by the class name."
  },
  {
    id: "sec4-set3-q02",
    question: "What does the 'pass' keyword do inside an empty class definition?",
    code: "class Empty:\n    pass",
    options: [
      "Provides a valid syntactic placeholder for an empty class body",
      "Skips class compilation",
      "Creates an instance automatically",
      "Raises an EmptyClassWarning"
    ],
    correctAnswer: 0,
    difficulty: "easy",
    topic: "Class Body",
    explanation: "Because Python requires an indented body for compound statements, 'pass' is used as a syntactic placeholder."
  },
  {
    id: "sec4-set3-q03",
    question: "What exception is raised when dividing any integer by zero in Python?",
    code: "x = 10 / 0",
    options: ["ZeroDivisionError", "ArithmeticError", "DivideByZeroException", "MathError"],
    correctAnswer: 0,
    difficulty: "easy",
    topic: "Built-in Exceptions",
    explanation: "Division or modulo by zero raises the built-in 'ZeroDivisionError'."
  },
  {
    id: "sec4-set3-q04",
    question: "Which file mode opens a file for writing, overwriting any existing contents?",
    code: undefined,
    options: ["'w'", "'r'", "'a'", "'x'"],
    correctAnswer: 0,
    difficulty: "easy",
    topic: "File Write Mode",
    explanation: "'w' opens a file for writing, truncating/overwriting any existing content."
  },
  {
    id: "sec4-set3-q05",
    question: "What is the return type of the 'type()' function when passed an object?",
    code: "class Car: pass\nc = Car()\nprint(type(c))",
    options: ["<class '__main__.Car'>", "<class 'object'>", "'Car'", "<type 'instance'>"],
    correctAnswer: 0,
    difficulty: "easy",
    topic: "Type Function",
    explanation: "'type(c)' returns the class object to which the instance belongs (<class '__main__.Car'>)."
  },
  {
    id: "sec4-set3-q06",
    question: "Which method is called when an object is converted to a string using 'str()'?",
    code: undefined,
    options: ["__str__", "__repr__", "__string__", "__format__"],
    correctAnswer: 0,
    difficulty: "easy",
    topic: "Dunder Methods",
    explanation: "'str(obj)' delegates to the '__str__' method of the object's class."
  },
  {
    id: "sec4-set3-q07",
    question: "What is the purpose of the 'finally' block in exception handling?",
    code: undefined,
    options: [
      "To execute clean-up code regardless of whether an exception occurred or was handled",
      "To re-raise the caught exception",
      "To catch only final critical system errors",
      "To prevent any further code execution"
    ],
    correctAnswer: 0,
    difficulty: "easy",
    topic: "Finally Semantics",
    explanation: "The 'finally' clause is always executed prior to leaving the try statement, whether an exception occurred or not."
  },
  {
    id: "sec4-set3-q08",
    question: "What does 'file.close()' do?",
    code: undefined,
    options: [
      "Flushes unwritten data and closes the open file descriptor",
      "Deletes the file from disk",
      "Clears the contents of the file",
      "Locks the file against other processes"
    ],
    correctAnswer: 0,
    difficulty: "easy",
    topic: "File Closure",
    explanation: "'close()' flushes any unwritten buffers and releases the operating system resource."
  },
  {
    id: "sec4-set3-q09",
    question: "How do you access a class attribute from within an instance method?",
    code: "class Bot:\n    version = '1.0'\n    def get_version(self):\n        return self.version",
    options: [
      "Via 'self.version' or 'Bot.version'",
      "Only via 'global version'",
      "Only via 'this.version'",
      "Via 'super.version'"
    ],
    correctAnswer: 0,
    difficulty: "easy",
    topic: "Class Attribute Access",
    explanation: "Class attributes can be accessed via instance lookup 'self.version' (if unshadowed) or directly via class name 'Bot.version'."
  },
  {
    id: "sec4-set3-q10",
    question: "What exception is raised when trying to open a non-existent file in read mode ('r')?",
    code: "open('non_existent_file.txt', 'r')",
    options: ["FileNotFoundError", "IOError", "FileMissingException", "PathError"],
    correctAnswer: 0,
    difficulty: "easy",
    topic: "File Exceptions",
    explanation: "In Python 3, opening a missing file for reading raises 'FileNotFoundError' (a subclass of OSError)."
  },

  // MEDIUM (11-20)
  {
    id: "sec4-set3-q11",
    question: "What is the output of implementing '__contains__' for custom 'in' membership tests?",
    code: "class RangeContainer:\n    def __init__(self, low, high):\n        self.low, self.high = low, high\n    def __contains__(self, item):\n        return self.low <= item <= self.high\n\nrc = RangeContainer(10, 50)\nprint(25 in rc, 100 in rc)",
    options: ["True False", "True True", "False False", "TypeError"],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "Membership Protocol with __contains__",
    explanation: "'__contains__' overloads the 'in' operator: 25 is within [10, 50] (True), while 100 is not (False)."
  },
  {
    id: "sec4-set3-q12",
    question: "What is the output of 'isinstance()' with a tuple of candidate classes?",
    code: "x = 3.14\nprint(isinstance(x, (int, float, str)))",
    options: ["True", "False", "TypeError", "<class 'float'>"],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "Isinstance with Type Tuple",
    explanation: "'isinstance(x, (int, float, str))' returns True if x is an instance of ANY of the types in the tuple."
  },
  {
    id: "sec4-set3-q13",
    question: "What is the output of using 'shutil.copy()' in Python?",
    code: "import shutil\n# shutil.copy('src.txt', 'dst.txt')",
    options: [
      "Copies the file data and file permission mode to the destination",
      "Moves the file to the destination",
      "Creates a symbolic link",
      "Compresses the file to a zip archive"
    ],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "Shutil File Operations",
    explanation: "'shutil.copy()' copies the file contents along with file permission bits to the target path."
  },
  {
    id: "sec4-set3-q14",
    question: "What is the output of operator overloading with '__bool__'?",
    code: "class Account:\n    def __init__(self, bal):\n        self.bal = bal\n    def __bool__(self):\n        return self.bal > 0\n\na1 = Account(100)\na2 = Account(0)\nprint(bool(a1), bool(a2))",
    options: ["True False", "True True", "False False", "TypeError"],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "Truth Value Testing with __bool__",
    explanation: "'__bool__' defines truthiness: a1 with bal=100 is True; a2 with bal=0 is False."
  },
  {
    id: "sec4-set3-q15",
    question: "What is the result of using 'tempfile.NamedTemporaryFile' with delete=True?",
    code: "import tempfile, os\nwith tempfile.NamedTemporaryFile(delete=True) as tf:\n    name = tf.name\nprint(os.path.exists(name))",
    options: ["False", "True", "PermissionError", "None"],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "Tempfile Lifecycle",
    explanation: "When exiting the 'with' block, 'NamedTemporaryFile(delete=True)' automatically deletes the temporary file from disk (os.path.exists is False)."
  },
  {
    id: "sec4-set3-q16",
    question: "What is the output of '__hash__' and '__eq__' implementation on custom keys?",
    code: "class Key:\n    def __init__(self, val):\n        self.val = val\n    def __eq__(self, other):\n        return self.val == other.val\n    def __hash__(self):\n        return hash(self.val)\n\nd = {Key('a'): 1}\nprint(d[Key('a')])",
    options: ["1", "KeyError", "None", "TypeError"],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "Custom Hashable Keys",
    explanation: "Because both '__eq__' and '__hash__' match for Key('a'), dictionary lookup succeeds and retrieves 1."
  },
  {
    id: "sec4-set3-q17",
    question: "What happens when you define '__eq__' without defining '__hash__' in Python 3?",
    code: "class Person:\n    def __init__(self, name):\n        self.name = name\n    def __eq__(self, other):\n        return self.name == other.name\n\np = Person('Eve')\ntry:\n    s = {p}\nexcept TypeError:\n    print('TypeError: unhashable type')",
    options: [
      "TypeError: unhashable type",
      "p is added to set using default id hash",
      "SyntaxError",
      "None"
    ],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "Hash Implicit Nullification",
    explanation: "Defining '__eq__' automatically sets '__hash__ = None' on the class, making instances unhashable unless '__hash__' is explicitly defined."
  },
  {
    id: "sec4-set3-q18",
    question: "What is the output of 'math.floor()' vs 'int()' on negative floats?",
    code: "import math\nprint(math.floor(-2.3), int(-2.3))",
    options: ["-3 -2", "-2 -2", "-3 -3", "-2 -3"],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "Floor vs Truncation",
    explanation: "'math.floor()' rounds down towards negative infinity (-3), while 'int()' truncates towards zero (-2)."
  },
  {
    id: "sec4-set3-q19",
    question: "What is the output of chaining comparison operators with '__lt__'?",
    code: "class Val:\n    def __init__(self, v):\n        self.v = v\n    def __lt__(self, other):\n        return self.v < other.v\n\nprint(Val(1) < Val(2) < Val(3))",
    options: ["True", "False", "TypeError", "SyntaxError"],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "Chained Comparison with Dunder Methods",
    explanation: "Chained comparison evaluates (Val(1) < Val(2)) and (Val(2) < Val(3)), invoking '__lt__' twice: 1 < 2 (True) and 2 < 3 (True) -> True."
  },
  {
    id: "sec4-set3-q20",
    question: "What does 'io.StringIO' provide in Python?",
    code: "import io\nbuffer = io.StringIO()\nbuffer.write('Hello ')\nbuffer.write('World')\nprint(buffer.getvalue())",
    options: ["Hello World", "World", "None", "TypeError"],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "In-Memory String Streams with StringIO",
    explanation: "'io.StringIO' creates an in-memory file-like text stream. 'getvalue()' returns the accumulated string buffer: 'Hello World'."
  },

  // HARD (21-30)
  {
    id: "sec4-set3-q21",
    question: "What is the output of the '__setattr__' infinite recursion trap?",
    code: "class Broken:\n    def __setattr__(self, name, value):\n        # Incorrect: self.name = value (causes infinite recursion)\n        # Correct:\n        self.__dict__[name] = value\n\nb = Broken()\nb.x = 42\nprint(b.x)",
    options: ["42", "RecursionError", "AttributeError", "None"],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "__setattr__ Recursion Pitfall & Resolution",
    explanation: "Using 'self.__dict__[name] = value' bypasses '__setattr__' to avoid infinite recursion, successfully setting and retrieving 42."
  },
  {
    id: "sec4-set3-q22",
    question: "What is the output of 'concurrent.futures.ThreadPoolExecutor' mapping a function?",
    code: "from concurrent.futures import ThreadPoolExecutor\ndef square(n): return n * n\nwith ThreadPoolExecutor(max_workers=2) as executor:\n    results = list(executor.map(square, [1, 2, 3]))\nprint(results)",
    options: ["[1, 4, 9]", "[1, 2, 3]", "[(1, 1), (2, 4), (3, 9)]", "TypeError"],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Concurrent Futures ThreadPoolExecutor",
    explanation: "'executor.map()' executes tasks concurrently across the thread pool and preserves the input ordering of results: [1, 4, 9]."
  },
  {
    id: "sec4-set3-q23",
    question: "What is the output of 'asyncio.run()' running an async coroutine function?",
    code: "import asyncio\nasync def fetch_data():\n    return 42\nprint(asyncio.run(fetch_data()))",
    options: ["42", "<coroutine object>", "None", "RuntimeError"],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Asyncio Event Loop & Coroutines",
    explanation: "'asyncio.run()' manages the event loop, runs the passed coroutine to completion, and returns its result (42)."
  },
  {
    id: "sec4-set3-q24",
    question: "What is the behavior of the Global Interpreter Lock (GIL) in CPython?",
    code: undefined,
    options: [
      "A mutex that protects access to Python objects, preventing multiple native threads from executing Python bytecodes concurrently in a single process",
      "A compiler optimizer that converts Python code to native machine instructions",
      "A memory allocator that cleans up dead references in real time",
      "A security sandbox that disables file system writes"
    ],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "CPython GIL Architecture",
    explanation: "The GIL ensures thread-safety in CPython by allowing only one native OS thread to execute Python bytecode at any given moment."
  },
  {
    id: "sec4-set3-q25",
    question: "What is the output of creating dynamic classes via the 3-argument 'type(name, bases, dict)' constructor?",
    code: "DynamicClass = type('DynamicClass', (object,), {'say_hi': lambda self: 'Hi'})\nobj = DynamicClass()\nprint(obj.say_hi(), isinstance(obj, object))",
    options: ["Hi True", "Hi False", "TypeError", "<DynamicClass> True"],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Type Metaclass Dynamic Construction",
    explanation: "'type(name, bases, namespace_dict)' constructs a brand new class at runtime with the specified methods: obj.say_hi() -> 'Hi' (True)."
  },
  {
    id: "sec4-set3-q26",
    question: "What is the output of '__getitem__' implementing custom slice handling?",
    code: "class Sliceable:\n    def __getitem__(self, item):\n        if isinstance(item, slice):\n            return (item.start, item.stop, item.step)\n        return item\n\ns = Sliceable()\nprint(s[1:5:2], s[42])",
    options: ["(1, 5, 2) 42", "42 (1, 5, 2)", "slice(1, 5, 2) 42", "TypeError"],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Slice Objects in __getitem__",
    explanation: "When indexed with slicing syntax '[1:5:2]', Python passes a 'slice(1, 5, 2)' object to '__getitem__', yielding (1, 5, 2)."
  },
  {
    id: "sec4-set3-q27",
    question: "What is the output of 'pickle.dumps()' and 'pickle.loads()' for Python object serialization?",
    code: "import pickle\ndata = {'scores': [10, 20]}\nserialized = pickle.dumps(data)\nrestored = pickle.loads(serialized)\nprint(restored == data, restored is data)",
    options: ["True False", "True True", "False False", "TypeError"],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Pickle Object Serialization",
    explanation: "'pickle' serializes and deserializes Python object graphs. The restored object has identical value ('==' is True) but distinct memory address ('is' is False)."
  },
  {
    id: "sec4-set3-q28",
    question: "What is the output of 'unittest.mock.MagicMock' automatic attribute synthesization?",
    code: "from unittest.mock import MagicMock\nm = MagicMock()\nm.calculate.return_value = 100\nprint(m.calculate(1, 2, 3), m.calculate.called)",
    options: ["100 True", "100 False", "MagicMock True", "AttributeError"],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Mocking Framework & MagicMock",
    explanation: "'MagicMock' automatically creates child mock attributes and tracks calls: m.calculate(...) returns 100 and records 'called = True'."
  },
  {
    id: "sec4-set3-q29",
    question: "What is the output of '__index__' method for custom integer coercion in slices?",
    code: "class IntLike:\n    def __init__(self, v):\n        self.v = v\n    def __index__(self):\n        return self.v\n\nidx = IntLike(2)\nnums = ['a', 'b', 'c', 'd']\nprint(nums[idx])",
    options: ["c", "b", "TypeError: list indices must be integers", "IndexError"],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "PEP 357 __index__ Protocol",
    explanation: "The '__index__' method allows custom objects to be used seamlessly as sequence indices and slice bounds: nums[2] is 'c'."
  },
  {
    id: "sec4-set3-q30",
    question: "What is the output of '__getattr__' fallback delegation (Proxy Pattern)?",
    code: "class Proxy:\n    def __init__(self, target):\n        self._target = target\n    def __getattr__(self, name):\n        return getattr(self._target, name)\n\nclass Target:\n    def greet(self): return 'Hello from Target'\n\np = Proxy(Target())\nprint(p.greet())",
    options: [
      "Hello from Target",
      "AttributeError: Proxy object has no attribute 'greet'",
      "Target",
      "None"
    ],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Proxy Pattern via Dynamic Delegation",
    explanation: "When 'p.greet' is accessed, '__getattr__' delegates the attribute lookup to '_target', invoking Target.greet() -> 'Hello from Target'."
  }
];
