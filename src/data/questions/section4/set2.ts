import { Question } from '../types';

export const section4Set2Questions: Question[] = [
  // EASY (1-10)
  {
    id: "sec4-set2-q01",
    question: "What is encapsulation in Object-Oriented Programming?",
    code: undefined,
    options: [
      "Bundling data and methods that operate on that data within a class while restricting direct external access",
      "Allowing a class to inherit from multiple parent classes",
      "Writing functions without return statements",
      "Executing code in separate threads"
    ],
    correctAnswer: 0,
    difficulty: "easy",
    topic: "OOP Concepts",
    explanation: "Encapsulation refers to wrapping data and methods into a single unit (class) and managing external access."
  },
  {
    id: "sec4-set2-q02",
    question: "Which built-in function is used to open files on disk in Python?",
    code: undefined,
    options: ["open()", "file()", "read_file()", "fs.open()"],
    correctAnswer: 0,
    difficulty: "easy",
    topic: "File I/O",
    explanation: "'open(filename, mode)' is the standard built-in function to open files."
  },
  {
    id: "sec4-set2-q03",
    question: "What exception is raised when attempting to convert an invalid string like 'hello' to an integer?",
    code: "try:\n    x = int('hello')\nexcept ValueError:\n    print('Caught')",
    options: ["ValueError", "TypeError", "ConversionError", "IndexError"],
    correctAnswer: 0,
    difficulty: "easy",
    topic: "Standard Exceptions",
    explanation: "'int('hello')' raises a ValueError because the string does not contain valid numeric digits."
  },
  {
    id: "sec4-set2-q04",
    question: "What does 'getattr(obj, name, default)' do if the attribute does not exist?",
    code: "class Config: pass\ncfg = Config()\nprint(getattr(cfg, 'port', 8080))",
    options: ["8080", "None", "AttributeError", "0"],
    correctAnswer: 0,
    difficulty: "easy",
    topic: "Dynamic Attribute Access",
    explanation: "'getattr(obj, name, default)' safely returns the fallback default value (8080) when the attribute is missing."
  },
  {
    id: "sec4-set2-q05",
    question: "What is polymorphism in Python?",
    code: undefined,
    options: [
      "The ability of different classes to respond to the same method interface in distinct ways",
      "The conversion of one data type into another automatically",
      "Creating multiple copies of an object in memory",
      "Compiling Python code to C bytecode"
    ],
    correctAnswer: 0,
    difficulty: "easy",
    topic: "OOP Polymorphism",
    explanation: "Polymorphism allows different types to be used through a common interface."
  },
  {
    id: "sec4-set2-q06",
    question: "What method is used to write a string to an opened text file?",
    code: "with open('out.txt', 'w') as f:\n    f.write('Hello\\n')",
    options: ["write()", "print_to()", "put()", "append_line()"],
    correctAnswer: 0,
    difficulty: "easy",
    topic: "File Methods",
    explanation: "'file.write(string)' writes the given string to the file stream."
  },
  {
    id: "sec4-set2-q07",
    question: "What is the output of 'setattr()' setting a new attribute dynamically?",
    code: "class Empty: pass\ne = Empty()\nsetattr(e, 'status', 'active')\nprint(e.status)",
    options: ["active", "None", "AttributeError", "Empty"],
    correctAnswer: 0,
    difficulty: "easy",
    topic: "Setattr Built-in",
    explanation: "'setattr(e, 'status', 'active')' dynamically creates or updates the attribute 'status' on instance 'e'."
  },
  {
    id: "sec4-set2-q08",
    question: "What exception is raised when trying to access a list index beyond its bounds?",
    code: "nums = [1, 2]\n# nums[5]",
    options: ["IndexError", "KeyError", "ValueError", "OutOfBoundsError"],
    correctAnswer: 0,
    difficulty: "easy",
    topic: "Exception Types",
    explanation: "Accessing an invalid sequence index raises an 'IndexError: list index out of range'."
  },
  {
    id: "sec4-set2-q09",
    question: "Which method reads the entire content of a file as a single string?",
    code: undefined,
    options: ["read()", "readline()", "readlines()", "fetch()"],
    correctAnswer: 0,
    difficulty: "easy",
    topic: "File Reading",
    explanation: "'f.read()' reads and returns the entire remainder of the file content as a single string."
  },
  {
    id: "sec4-set2-q10",
    question: "What is the base class of all standard exception classes in Python?",
    code: undefined,
    options: ["BaseException", "Exception", "Error", "StandardError"],
    correctAnswer: 0,
    difficulty: "easy",
    topic: "Exception Hierarchy",
    explanation: "'BaseException' is the root of the entire exception hierarchy in Python (with 'Exception', 'KeyboardInterrupt', and 'SystemExit' subclassing it)."
  },

  // MEDIUM (11-20)
  {
    id: "sec4-set2-q11",
    question: "What is the output of operator overloading using '__add__'?",
    code: "class Vector:\n    def __init__(self, x, y):\n        self.x, self.y = x, y\n    def __add__(self, other):\n        return Vector(self.x + other.x, self.y + other.y)\nv1 = Vector(1, 2)\nv2 = Vector(3, 4)\nv3 = v1 + v2\nprint(v3.x, v3.y)",
    options: ["4 6", "1 2", "3 4", "TypeError"],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "Dunder Methods & Operator Overloading",
    explanation: "The '__add__' dunder method overloads the '+' operator, creating a new Vector(1+3, 2+4) = Vector(4, 6)."
  },
  {
    id: "sec4-set2-q12",
    question: "What is the output of implementing '__eq__' on a class?",
    code: "class Box:\n    def __init__(self, size):\n        self.size = size\n    def __eq__(self, other):\n        return self.size == other.size\nb1 = Box(10)\nb2 = Box(10)\nprint(b1 == b2, b1 is b2)",
    options: ["True False", "True True", "False False", "False True"],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "Equality vs Identity",
    explanation: "'__eq__' defines value equality (True since sizes are equal), while 'is' checks memory identity (False since they are distinct objects)."
  },
  {
    id: "sec4-set2-q13",
    question: "What is the output of the '@property.setter' decorator?",
    code: "class Account:\n    def __init__(self, balance):\n        self._balance = balance\n    @property\n    def balance(self):\n        return self._balance\n    @balance.setter\n    def balance(self, val):\n        if val < 0: raise ValueError('Invalid')\n        self._balance = val\n\nacc = Account(100)\nacc.balance = 250\nprint(acc.balance)",
    options: ["250", "100", "ValueError", "None"],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "Property Setters",
    explanation: "The setter intercepts assignment 'acc.balance = 250' and updates '_balance' to 250."
  },
  {
    id: "sec4-set2-q14",
    question: "What does 'f.readlines()' return when reading a file?",
    code: undefined,
    options: [
      "A list of strings, where each string represents a line of the file",
      "A single concatenated string with newlines",
      "A generator yielding lines on demand",
      "A bytearray of raw bytes"
    ],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "File Readlines",
    explanation: "'f.readlines()' reads all remaining lines into a Python list of strings."
  },
  {
    id: "sec4-set2-q15",
    question: "What is the output of 'dataclasses.dataclass' generated methods?",
    code: "from dataclasses import dataclass\n@dataclass\nclass Point:\n    x: int\n    y: int\n\np1 = Point(1, 2)\np2 = Point(1, 2)\nprint(p1 == p2, p1)",
    options: [
      "True Point(x=1, y=2)",
      "False Point(1, 2)",
      "True <Point object>",
      "TypeError"
    ],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "Dataclasses Module",
    explanation: "The '@dataclass' decorator automatically generates '__init__', '__repr__', and value-based '__eq__' (p1 == p2 is True)."
  },
  {
    id: "sec4-set2-q16",
    question: "What is the output of implementing '__len__' and '__getitem__' for indexing?",
    code: "class CustomList:\n    def __init__(self, *items):\n        self.items = list(items)\n    def __len__(self):\n        return len(self.items)\n    def __getitem__(self, idx):\n        return self.items[idx] * 10\n\ncl = CustomList(1, 2, 3)\nprint(len(cl), cl[1])",
    options: ["3 20", "3 2", "3 10", "TypeError"],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "Sequence Protocol",
    explanation: "'__len__' returns 3, and '__getitem__(1)' computes self.items[1] * 10 = 2 * 10 = 20."
  },
  {
    id: "sec4-set2-q17",
    question: "What happens when you attempt to delete an attribute with 'delattr()'?",
    code: "class User:\n    def __init__(self):\n        self.temp = 'val'\nu = User()\ndelattr(u, 'temp')\nprint(hasattr(u, 'temp'))",
    options: ["False", "True", "AttributeError", "None"],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "Delattr Built-in",
    explanation: "'delattr(u, 'temp')' removes the attribute from the instance, making 'hasattr(u, 'temp')' False."
  },
  {
    id: "sec4-set2-q18",
    question: "What does 'os.remove()' do?",
    code: undefined,
    options: [
      "Deletes the specified file from the filesystem",
      "Deletes a directory and all its contents",
      "Removes an environment variable",
      "Closes all open file descriptors"
    ],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "OS File Removal",
    explanation: "'os.remove(path)' deletes a file path from disk."
  },
  {
    id: "sec4-set2-q19",
    question: "What is the output of 'json.dumps()' and 'json.loads()' in the json module?",
    code: "import json\ndata = {'key': 42}\nserialized = json.dumps(data)\nparsed = json.loads(serialized)\nprint(type(serialized), parsed['key'])",
    options: ["<class 'str'> 42", "<class 'dict'> 42", "<class 'bytes'> 42", "TypeError"],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "JSON Serialization",
    explanation: "'json.dumps()' serializes Python objects to a JSON string (<class 'str'>), and 'json.loads()' deserializes back into a Python dict."
  },
  {
    id: "sec4-set2-q20",
    question: "What is the output of checking method resolution on multiple inheritance?",
    code: "class A:\n    def tag(self): return 'A'\nclass B(A):\n    def tag(self): return 'B'\nclass C(A):\n    def tag(self): return 'C'\nclass D(B, C): pass\n\nprint(D().tag())",
    options: ["B", "C", "A", "TypeError"],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "MRO Dispatch",
    explanation: "In class D(B, C), 'B' comes before 'C' in the MRO, so calling 'D().tag()' resolves to 'B'."
  },

  // HARD (21-30)
  {
    id: "sec4-set2-q21",
    question: "What is the output of a custom Metaclass modifying class attributes during class creation?",
    code: "class UpperAttrMeta(type):\n    def __new__(mcs, name, bases, dct):\n        uppercase_attr = {}\n        for k, v in dct.items():\n            if not k.startswith('__'):\n                uppercase_attr[k.upper()] = v\n            else:\n                uppercase_attr[k] = v\n        return super().__new__(mcs, name, bases, uppercase_attr)\n\nclass Model(metaclass=UpperAttrMeta):\n    version = 1\n\nprint(hasattr(Model, 'VERSION'), hasattr(Model, 'version'))",
    options: ["True False", "True True", "False True", "False False"],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Metaclasses & Class Construction",
    explanation: "The metaclass intercepts class creation and converts non-dunder attribute names to uppercase. 'version' becomes 'VERSION', leaving hasattr(Model, 'VERSION') as True and hasattr(Model, 'version') as False."
  },
  {
    id: "sec4-set2-q22",
    question: "What is the output of '__getattr__' vs '__getattribute__' in Python?",
    code: "class Fallback:\n    val = 10\n    def __getattr__(self, name):\n        return f'missing_{name}'\n    def __getattribute__(self, name):\n        if name == 'secret': return 'hidden'\n        return super().__getattribute__(name)\n\nf = Fallback()\nprint(f.val, f.secret, f.other)",
    options: [
      "10 hidden missing_other",
      "missing_val hidden missing_other",
      "10 hidden AttributeError",
      "TypeError"
    ],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "__getattribute__ vs __getattr__ Interception",
    explanation: "'__getattribute__' is called unconditionally for every attribute lookup ('secret' -> 'hidden', 'val' -> 10). '__getattr__' is only invoked as a fallback when an attribute is not found ('other' -> 'missing_other')."
  },
  {
    id: "sec4-set2-q23",
    question: "What is the output of implementing Singleton pattern via '__new__' override?",
    code: "class Singleton:\n    _instance = None\n    def __new__(cls):\n        if cls._instance is None:\n            cls._instance = super().__new__(cls)\n        return cls._instance\n\ns1 = Singleton()\ns2 = Singleton()\nprint(s1 is s2)",
    options: ["True", "False", "RecursionError", "TypeError"],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Singleton Pattern via __new__",
    explanation: "Overriding '__new__' to cache and return '_instance' ensures every call to Singleton() returns the identical memory object (s1 is s2 is True)."
  },
  {
    id: "sec4-set2-q24",
    question: "What is the output of using '__del__' finalizer with circular references in modern Python 3?",
    code: "import gc\nclass Node:\n    def __init__(self, name):\n        self.name = name\n    def __del__(self):\n        print(f'Del:{self.name}', end=' ')\n\na = Node('A')\nb = Node('B')\na.other = b\nb.other = a\ndel a, b\n_ = gc.collect()",
    options: [
      "Del:A Del:B (or Del:B Del:A)",
      "Nothing is printed due to cycle deadlock",
      "Exception in __del__",
      "MemoryError"
    ],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Garbage Collector & Cycle Finalization",
    explanation: "Since Python 3.4 (PEP 442), circular references with '__del__' methods are safely collected and finalized by the cyclic garbage collector."
  },
  {
    id: "sec4-set2-q25",
    question: "What happens when inheriting from 'enum.Enum' with duplicate values?",
    code: "from enum import Enum\nclass Status(Enum):\n    ACTIVE = 1\n    RUNNING = 1\n\nprint(Status.RUNNING is Status.ACTIVE, Status.RUNNING.name)",
    options: [
      "True ACTIVE",
      "False RUNNING",
      "TypeError: duplicate value",
      "True RUNNING"
    ],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Enum Aliases",
    explanation: "In Python enums, duplicate values create aliases to the first defined member. Status.RUNNING is an alias for Status.ACTIVE (Status.RUNNING is Status.ACTIVE is True, and its canonical name is 'ACTIVE')."
  },
  {
    id: "sec4-set2-q26",
    question: "What is the output of 'pathlib.Path' with path division operator '/'?",
    code: "from pathlib import Path\np = Path('/usr') / 'local' / 'bin'\nprint(p.as_posix())",
    options: ["/usr/local/bin", "usr/local/bin", "TypeError", "'/usr', 'local', 'bin'"],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Pathlib Path Arithmetic",
    explanation: "'Path' overloads the division '/' operator to join path segments cross-platform into '/usr/local/bin'."
  },
  {
    id: "sec4-set2-q27",
    question: "What is the result of using 'sys.excepthook' to install a custom global exception handler?",
    code: "import sys\ndef custom_hook(exc_type, exc_value, exc_traceback):\n    print(f'Intercepted: {exc_type.__name__}')\n\n# When set: sys.excepthook = custom_hook",
    options: [
      "It intercepts all unhandled top-level exceptions before the program exits",
      "It catches syntax errors during file compilation",
      "It disables all try-except blocks",
      "It restarts the Python script automatically"
    ],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Sys Excepthook Global Handler",
    explanation: "'sys.excepthook' is the top-level callback invoked by the Python runtime for unhandled exceptions before printing a traceback."
  },
  {
    id: "sec4-set2-q28",
    question: "What is the output of 'dataclasses.field(default_factory=...)' for mutable defaults?",
    code: "from dataclasses import dataclass, field\n@dataclass\nclass Group:\n    members: list = field(default_factory=list)\n\ng1 = Group()\ng2 = Group()\ng1.members.append('Alice')\nprint(g1.members, g2.members)",
    options: [
      "['Alice'] []",
      "['Alice'] ['Alice']",
      "ValueError",
      "TypeError"
    ],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Dataclass default_factory Isolation",
    explanation: "'default_factory=list' invokes 'list()' for each new instance, ensuring g1 and g2 possess distinct, unshared list objects: ['Alice'] []."
  },
  {
    id: "sec4-set2-q29",
    question: "What is the output of using '__bytes__' and '__format__' dunder methods?",
    code: "class Packet:\n    def __bytes__(self):\n        return b'\\x01\\x02'\n    def __format__(self, format_spec):\n        return f'PACKET[{format_spec}]'\n\np = Packet()\nprint(bytes(p), f'{p:hex_mode}')",
    options: ["b'\\x01\\x02' PACKET[hex_mode]", "b'0102' PACKET[]", "TypeError", "PACKET[hex_mode] b'\\x01\\x02'"],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Bytes and Custom Format Protocols",
    explanation: "'bytes(p)' invokes '__bytes__' returning b'\\x01\\x02', and f'{p:hex_mode}' passes 'hex_mode' to '__format__'."
  },
  {
    id: "sec4-set2-q30",
    question: "What is the output of '__subclasses__()' on a base class?",
    code: "class Animal: pass\nclass Dog(Animal): pass\nclass Cat(Animal): pass\nprint([c.__name__ for c in Animal.__subclasses__()])",
    options: ["['Dog', 'Cat']", "['Animal']", "[]", "TypeError"],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Class Subclass Introspection",
    explanation: "'Animal.__subclasses__()' returns a list of all active immediate subclasses registered in memory: ['Dog', 'Cat']."
  }
];
