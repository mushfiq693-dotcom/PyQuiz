import { Question } from '../types';

export const section4Set1Questions: Question[] = [
  // EASY (1-10)
  {
    id: "sec4-set1-q01",
    question: "Which special method is known as the initializer/constructor in Python classes?",
    code: undefined,
    options: ["__init__", "__new__", "__construct__", "__start__"],
    correctAnswer: 0,
    difficulty: "easy",
    topic: "Class Initialization",
    explanation: "'__init__' is the standard initializer method called after a new object instance is created."
  },
  {
    id: "sec4-set1-q02",
    question: "What does the first parameter 'self' in instance methods represent?",
    code: undefined,
    options: [
      "The specific instance of the class on which the method is called",
      "The class object itself",
      "The parent superclass",
      "The global execution context"
    ],
    correctAnswer: 0,
    difficulty: "easy",
    topic: "Self Parameter",
    explanation: "'self' represents the specific instance of the class invoking the method."
  },
  {
    id: "sec4-set1-q03",
    question: "Which block is used in Python to handle exceptions gracefully?",
    code: "try:\n    x = 1 / 0\nexcept ZeroDivisionError:\n    print('Handled')",
    options: ["try-except", "try-catch", "try-finally", "catch-throw"],
    correctAnswer: 0,
    difficulty: "easy",
    topic: "Exception Handling",
    explanation: "Python uses 'try...except' blocks to intercept and handle runtime exceptions."
  },
  {
    id: "sec4-set1-q04",
    question: "What is the primary advantage of using the 'with' statement for file handling?",
    code: "with open('file.txt', 'w') as f:\n    f.write('Hello')",
    options: [
      "It automatically closes the file even if an exception occurs",
      "It writes data asynchronously in the background",
      "It encrypts the file on disk",
      "It compresses file contents automatically"
    ],
    correctAnswer: 0,
    difficulty: "easy",
    topic: "Context Managers & File I/O",
    explanation: "The 'with' statement implements context manager protocols, ensuring 'f.close()' is executed on exit."
  },
  {
    id: "sec4-set1-q05",
    question: "Which keyword is used to inherit from a parent class in Python?",
    code: "class Dog(Animal):\n    pass",
    options: [
      "Placing the parent class name inside parentheses after the class name",
      "extends Animal",
      "inherits Animal",
      "implements Animal"
    ],
    correctAnswer: 0,
    difficulty: "easy",
    topic: "Class Inheritance Syntax",
    explanation: "Inheritance in Python is specified by placing the base class in parentheses: 'class SubClass(BaseClass):'."
  },
  {
    id: "sec4-set1-q06",
    question: "Which built-in function checks whether an object is an instance of a specified class?",
    code: undefined,
    options: ["isinstance()", "typeof()", "issubclass()", "hasattr()"],
    correctAnswer: 0,
    difficulty: "easy",
    topic: "Type Introspection",
    explanation: "'isinstance(object, classinfo)' checks if an object is an instance or subclass of the given class."
  },
  {
    id: "sec4-set1-q07",
    question: "What keyword is used to explicitly trigger/raise an exception in Python?",
    code: "if balance < 0:\n    raise ValueError('Negative balance')",
    options: ["raise", "throw", "error", "panic"],
    correctAnswer: 0,
    difficulty: "easy",
    topic: "Raising Exceptions",
    explanation: "The 'raise' keyword explicitly throws an exception instance or class."
  },
  {
    id: "sec4-set1-q08",
    question: "What does the 'issubclass()' function test?",
    code: "print(issubclass(bool, int))",
    options: ["True", "False", "TypeError", "None"],
    correctAnswer: 0,
    difficulty: "easy",
    topic: "Subclass Checking",
    explanation: "'issubclass(A, B)' returns True if class A inherits from class B. 'bool' inherits from 'int' (True)."
  },
  {
    id: "sec4-set1-q09",
    question: "What is the output of 'hasattr()' when checking if an object possesses an attribute?",
    code: "class Person:\n    name = 'Sam'\nprint(hasattr(Person, 'name'), hasattr(Person, 'age'))",
    options: ["True False", "True True", "False False", "False True"],
    correctAnswer: 0,
    difficulty: "easy",
    topic: "Attribute Introspection",
    explanation: "'hasattr(obj, name)' checks if the named attribute exists on the object (True False)."
  },
  {
    id: "sec4-set1-q10",
    question: "Which file mode opens a file for appending new text to the end?",
    code: undefined,
    options: ["'a'", "'w'", "'r'", "'x'"],
    correctAnswer: 0,
    difficulty: "easy",
    topic: "File Modes",
    explanation: "'a' opens a file for appending without truncating existing content."
  },

  // MEDIUM (11-20)
  {
    id: "sec4-set1-q11",
    question: "What is the output of the 'super()' function when invoking parent class methods?",
    code: "class Base:\n    def speak(self): return 'Base'\nclass Derived(Base):\n    def speak(self):\n        return super().speak() + '->Derived'\nprint(Derived().speak())",
    options: ["Base->Derived", "Derived", "Base", "TypeError"],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "Super Built-in Method Resolution",
    explanation: "'super().speak()' delegates to Base.speak() returning 'Base', which is concatenated to '->Derived'."
  },
  {
    id: "sec4-set1-q12",
    question: "What does the '@classmethod' decorator do to a method?",
    code: "class Counter:\n    count = 0\n    @classmethod\n    def inc(cls):\n        cls.count += 1\nCounter.inc()\nprint(Counter.count)",
    options: ["1", "0", "TypeError", "AttributeError"],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "Class Methods",
    explanation: "'@classmethod' passes the class itself ('cls') as the first argument, allowing access and modification of class-level attributes."
  },
  {
    id: "sec4-set1-q13",
    question: "What is the difference between '@staticmethod' and regular instance methods?",
    code: "class MathUtil:\n    @staticmethod\n    def add(a, b):\n        return a + b\nprint(MathUtil.add(3, 4))",
    options: [
      "Static methods receive neither 'self' nor 'cls' as an implicit first argument",
      "Static methods cannot return values",
      "Static methods can only be called once",
      "Static methods require global variables"
    ],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "Static Methods",
    explanation: "'@staticmethod' defines a self-contained function inside a class namespace that receives no implicit instance or class reference."
  },
  {
    id: "sec4-set1-q14",
    question: "What is the output of implementing '__str__' vs '__repr__' on a custom class?",
    code: "class User:\n    def __init__(self, name):\n        self.name = name\n    def __str__(self):\n        return f'User:{self.name}'\n    def __repr__(self):\n        return f'<User object: {self.name}>'\n\nu = User('Ada')\nprint(str(u), repr(u))",
    options: [
      "User:Ada <User object: Ada>",
      "<User object: Ada> User:Ada",
      "User:Ada User:Ada",
      "<User object: Ada> <User object: Ada>"
    ],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "String Representation Dunder Methods",
    explanation: "'__str__' provides a user-friendly string representation, while '__repr__' provides an unambiguous/developer-oriented representation."
  },
  {
    id: "sec4-set1-q15",
    question: "What is the output of the '@property' decorator for getter methods?",
    code: "class Circle:\n    def __init__(self, r):\n        self._r = r\n    @property\n    def radius(self):\n        return self._r\n\nc = Circle(5)\nprint(c.radius)",
    options: ["5", "<bound method>", "TypeError", "None"],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "Property Decorator",
    explanation: "The '@property' decorator turns a method into a getter accessible via attribute dot-syntax ('c.radius' instead of 'c.radius()')."
  },
  {
    id: "sec4-set1-q16",
    question: "What is the output of the 'else' block in a 'try-except-else-finally' statement?",
    code: "result = []\ntry:\n    x = 10 / 2\nexcept ZeroDivisionError:\n    result.append('Error')\nelse:\n    result.append('Success')\nfinally:\n    result.append('Done')\nprint(' '.join(result))",
    options: ["Success Done", "Error Done", "Done", "Success"],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "Try Else Finally Semantics",
    explanation: "The 'else' block executes only when NO exception was raised in the 'try' block. 'finally' always executes. Result: 'Success Done'."
  },
  {
    id: "sec4-set1-q17",
    question: "What is Python's name-mangling behavior for attributes starting with double underscores '__'?",
    code: "class Secret:\n    def __init__(self):\n        self.__token = '1234'\ns = Secret()\nprint('_Secret__token' in vars(s))",
    options: ["True", "False", "AttributeError", "NameError"],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "Name Mangling",
    explanation: "Attributes with double leading underscores (and at most one trailing underscore) are mangled by prepending '_ClassName', transforming '__token' into '_Secret__token'."
  },
  {
    id: "sec4-set1-q18",
    question: "What is the output of class attribute vs instance attribute shadowing?",
    code: "class App:\n    theme = 'dark'\na1 = App()\na2 = App()\na1.theme = 'light'\nprint(a1.theme, a2.theme, App.theme)",
    options: ["light dark dark", "light light light", "light dark light", "dark dark dark"],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "Attribute Shadowing",
    explanation: "Assigning 'a1.theme = light' creates an instance attribute on 'a1' that shadows the class attribute. 'a2' and 'App' still reference 'dark'."
  },
  {
    id: "sec4-set1-q19",
    question: "What is the output of custom exception subclassing?",
    code: "class CustomError(Exception):\n    pass\n\ntry:\n    raise CustomError('Something went wrong')\nexcept Exception as e:\n    print(isinstance(e, Exception), str(e))",
    options: [
      "True Something went wrong",
      "False Something went wrong",
      "CustomError",
      "TypeError"
    ],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "Custom Exceptions",
    explanation: "Custom exceptions subclassing 'Exception' are caught by 'except Exception' handlers, and str(e) yields the error message."
  },
  {
    id: "sec4-set1-q20",
    question: "What is the output of using '__call__' to make instances callable?",
    code: "class Adder:\n    def __init__(self, n):\n        self.n = n\n    def __call__(self, x):\n        return self.n + x\n\nadd5 = Adder(5)\nprint(add5(10))",
    options: ["15", "50", "TypeError: Adder object is not callable", "5"],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "Callable Objects with __call__",
    explanation: "Defining the '__call__' dunder method allows instances of the class to be invoked directly like functions: add5(10) -> 5 + 10 = 15."
  },

  // HARD (21-30)
  {
    id: "sec4-set1-q21",
    question: "What is the Method Resolution Order (MRO) in diamond multiple inheritance in Python 3 (C3 Linearization)?",
    code: "class A: pass\nclass B(A): pass\nclass C(A): pass\nclass D(B, C): pass\nprint([cls.__name__ for cls in D.__mro__[:4]])",
    options: [
      "['D', 'B', 'C', 'A']",
      "['D', 'B', 'A', 'C']",
      "['D', 'A', 'B', 'C']",
      "['D', 'C', 'B', 'A']"
    ],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "C3 Linearization & MRO",
    explanation: "Python uses C3 linearization. For diamond inheritance D(B, C), D visits B, then C, and finally common ancestor A: ['D', 'B', 'C', 'A']."
  },
  {
    id: "sec4-set1-q22",
    question: "What is the effect of defining '__slots__' on a class?",
    code: "class Fixed:\n    __slots__ = ('x', 'y')\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n\nf = Fixed(1, 2)\ntry:\n    f.z = 3\nexcept AttributeError:\n    print('AttributeError caught')",
    options: [
      "AttributeError caught",
      "Adds 'z' successfully",
      "TypeError",
      "MemoryError"
    ],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Slots Attribute Restriction & Memory Optimization",
    explanation: "'__slots__' prevents the automatic creation of an instance '__dict__', reducing memory footprint and disallowing attributes not listed in __slots__."
  },
  {
    id: "sec4-set1-q23",
    question: "What is the output of Python Descriptor protocol with '__get__' and '__set__'?",
    code: "class Validated:\n    def __set_name__(self, owner, name):\n        self.name = name\n    def __get__(self, instance, owner):\n        if instance is None: return self\n        return instance.__dict__.get(self.name, 0)\n    def __set__(self, instance, value):\n        if value < 0: raise ValueError('Must be non-negative')\n        instance.__dict__[self.name] = value\n\nclass Item:\n    price = Validated()\n\ni = Item()\ni.price = 50\nprint(i.price)",
    options: ["50", "0", "ValueError", "<Validated object>"],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Descriptor Protocol",
    explanation: "Descriptors manage attribute access. 'i.price = 50' invokes '__set__' and stores 50 in 'i.__dict__', which '__get__' retrieves."
  },
  {
    id: "sec4-set1-q24",
    question: "What is the output of implementing custom Context Manager via '__enter__' and '__exit__'?",
    code: "class SuppressZeroDivision:\n    def __enter__(self):\n        return self\n    def __exit__(self, exc_type, exc_val, exc_tb):\n        return exc_type is ZeroDivisionError\n\nwith SuppressZeroDivision():\n    x = 10 / 0\nprint('Suppressed successfully')",
    options: [
      "Suppressed successfully",
      "ZeroDivisionError raised uncaught",
      "TypeError",
      "None"
    ],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Custom Context Manager Exception Suppression",
    explanation: "Returning a truthy value (True) from '__exit__' tells Python to suppress the exception that occurred inside the 'with' block."
  },
  {
    id: "sec4-set1-q25",
    question: "What is the difference between '__new__' and '__init__'?",
    code: undefined,
    options: [
      "'__new__' creates and returns the instance object; '__init__' initializes the newly created instance",
      "'__init__' allocates memory; '__new__' sets attributes",
      "'__new__' is only called for subclasses; '__init__' for base classes",
      "They are identical and called interchangeably"
    ],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Object Creation: __new__ vs __init__",
    explanation: "'__new__' is a static method responsible for allocating and returning a new instance. '__init__' receives that instance to configure its initial state."
  },
  {
    id: "sec4-set1-q26",
    question: "What is the output of metaclass attribute interception via '__init_subclass__'?",
    code: "class PluginBase:\n    registry = []\n    def __init_subclass__(cls, **kwargs):\n        super().__init_subclass__(**kwargs)\n        cls.registry.append(cls.__name__)\n\nclass AudioPlugin(PluginBase): pass\nclass VideoPlugin(PluginBase): pass\nprint(PluginBase.registry)",
    options: [
      "['AudioPlugin', 'VideoPlugin']",
      "[]",
      "['PluginBase']",
      "TypeError"
    ],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "PEP 487 __init_subclass__ Hook",
    explanation: "'__init_subclass__' is called automatically whenever a class is subclassed, allowing automated registration: ['AudioPlugin', 'VideoPlugin']."
  },
  {
    id: "sec4-set1-q27",
    question: "What is the output of exception chaining with the 'from' keyword in Python 3?",
    code: "try:\n    try:\n        int('abc')\n    except ValueError as err:\n        raise RuntimeError('Processing failed') from err\nexcept RuntimeError as e:\n    print(isinstance(e.__cause__, ValueError))",
    options: ["True", "False", "None", "KeyError"],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Exception Chaining & __cause__",
    explanation: "'raise NewException from orig_err' sets the '__cause__' attribute of the new exception to the original exception (isinstance is True)."
  },
  {
    id: "sec4-set1-q28",
    question: "What is the output of using 'abc.ABC' and '@abstractmethod'?",
    code: "from abc import ABC, abstractmethod\nclass Shape(ABC):\n    @abstractmethod\n    def area(self): pass\n\ntry:\n    s = Shape()\nexcept TypeError as e:\n    print('Cannot instantiate abstract class')",
    options: [
      "Cannot instantiate abstract class",
      "Instantiates Shape with area=None",
      "AttributeError",
      "ValueError"
    ],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Abstract Base Classes (ABC)",
    explanation: "Classes inheriting from 'ABC' with unimplemented '@abstractmethod' decorators cannot be instantiated directly, raising a TypeError."
  },
  {
    id: "sec4-set1-q29",
    question: "What is the output of modifying '__class__' on an instance at runtime?",
    code: "class Cat:\n    def sound(self): return 'Meow'\nclass Dog:\n    def sound(self): return 'Woof'\n\npet = Cat()\npet.__class__ = Dog\nprint(pet.sound())",
    options: ["Woof", "Meow", "TypeError", "AttributeError"],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Dynamic __class__ Rebinding",
    explanation: "Python allows dynamic rebinding of an instance's '__class__' pointer to compatible classes. Calling pet.sound() dispatches to Dog.sound() -> 'Woof'."
  },
  {
    id: "sec4-set1-q30",
    question: "What is the output of custom iterator protocol implementing '__iter__' and '__next__'?",
    code: "class Countdown:\n    def __init__(self, start):\n        self.val = start\n    def __iter__(self):\n        return self\n    def __next__(self):\n        if self.val <= 0: raise StopIteration\n        self.val -= 1\n        return self.val + 1\n\nprint(list(Countdown(3)))",
    options: ["[3, 2, 1]", "[2, 1, 0]", "[3, 2, 1, 0]", "[]"],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Iterator Protocol Implementation",
    explanation: "The iterator yields 3, 2, 1 before raising 'StopIteration' when val hits 0: [3, 2, 1]."
  }
];
