import { Question } from '../types';

export const section1Set1Questions: Question[] = [
  // EASY (1-10)
  {
    id: "sec1-set1-q01",
    question: "What is the output of the following Python code regarding object references?",
    code: "a = [1, 2, 3]\nb = a\na.append(4)\nprint(b)",
    options: ["[1, 2, 3]", "[1, 2, 3, 4]", "[4]", "Error"],
    correctAnswer: 1,
    difficulty: "easy",
    topic: "Object & Reference",
    explanation: "In Python, variables store references to objects. 'b = a' assigns the reference of list 'a' to 'b'. Calling 'a.append(4)' mutates the list in place, so printing 'b' displays [1, 2, 3, 4]."
  },
  {
    id: "sec1-set1-q02",
    question: "What is the data type of the result of the division operation '7 / 2' in Python 3?",
    code: "result = 7 / 2\nprint(type(result))",
    options: ["<class 'int'>", "<class 'float'>", "<class 'double'>", "<class 'number'>"],
    correctAnswer: 1,
    difficulty: "easy",
    topic: "Data Types & Operators",
    explanation: "In Python 3, the '/' operator performs true floating-point division, returning a float (3.5). For integer division, '//' is used."
  },
  {
    id: "sec1-set1-q03",
    question: "Which of the following is an invalid variable name in Python?",
    code: undefined,
    options: ["_user_count", "2nd_student", "student_name2", "userCount"],
    correctAnswer: 1,
    difficulty: "easy",
    topic: "Syntax & Identifiers",
    explanation: "Python identifiers cannot start with a digit (e.g., '2nd_student' raises a SyntaxError). They must begin with a letter or an underscore."
  },
  {
    id: "sec1-set1-q04",
    question: "What will be printed when checking Boolean equivalence?",
    code: "print(bool(0), bool(''), bool([]), bool(None))",
    options: ["True True True True", "False False False False", "False True False None", "0 '' [] None"],
    correctAnswer: 1,
    difficulty: "easy",
    topic: "Boolean Truth Values",
    explanation: "In Python, numeric zeros (0, 0.0), empty strings (''), empty containers ([], {}, set()), and 'None' all evaluate to False in a boolean context."
  },
  {
    id: "sec1-set1-q05",
    question: "What is the result of string multiplication in Python?",
    code: "word = 'Go!' * 3\nprint(word)",
    options: ["Go!Go!Go!", "Go! 3", "Error: cannot multiply string", "'Go!', 'Go!', 'Go!'"],
    correctAnswer: 0,
    difficulty: "easy",
    topic: "String Operations",
    explanation: "The multiplication operator '*' with a sequence and an integer repeats the sequence the given number of times."
  },
  {
    id: "sec1-set1-q06",
    question: "What is the output of the integer modulo operation '17 % 5'?",
    code: "print(17 % 5)",
    options: ["3", "2", "3.4", "1"],
    correctAnswer: 1,
    difficulty: "easy",
    topic: "Operators",
    explanation: "The '%' operator returns the remainder of the integer division 17 / 5 = 3 with a remainder of 2."
  },
  {
    id: "sec1-set1-q07",
    question: "Which keyword is used for conditional branch testing in Python after an 'if' statement?",
    code: undefined,
    options: ["else if", "elseif", "elif", "case"],
    correctAnswer: 2,
    difficulty: "easy",
    topic: "Control Flow",
    explanation: "Python uses the keyword 'elif' (short for 'else if') to chain multiple conditional checks."
  },
  {
    id: "sec1-set1-q08",
    question: "What does the 'range(1, 6)' function generate when converted to a list?",
    code: "print(list(range(1, 6)))",
    options: ["[1, 2, 3, 4, 5, 6]", "[1, 2, 3, 4, 5]", "[0, 1, 2, 3, 4, 5]", "[2, 3, 4, 5, 6]"],
    correctAnswer: 1,
    difficulty: "easy",
    topic: "Loops & Built-ins",
    explanation: "range(start, stop) generates numbers starting at 'start' up to, but not including, 'stop' (1, 2, 3, 4, 5)."
  },
  {
    id: "sec1-set1-q09",
    question: "What is the purpose of the 'pass' statement in Python?",
    code: "if True:\n    pass",
    options: [
      "It terminates the loop immediately",
      "It acts as a null operation / placeholder where code is syntactically required",
      "It passes control to the parent function",
      "It skips the next statement in execution"
    ],
    correctAnswer: 1,
    difficulty: "easy",
    topic: "Control Flow",
    explanation: "'pass' is a null statement. It does nothing when executed, serving as a syntactic placeholder."
  },
  {
    id: "sec1-set1-q10",
    question: "What is the output of the following comparison chain?",
    code: "print(1 < 2 < 3 > 0)",
    options: ["True", "False", "SyntaxError", "TypeError"],
    correctAnswer: 0,
    difficulty: "easy",
    topic: "Comparison Chaining",
    explanation: "Python supports chained comparisons. '1 < 2 < 3 > 0' is evaluated as '(1 < 2) and (2 < 3) and (3 > 0)', which is True."
  },

  // MEDIUM (11-20)
  {
    id: "sec1-set1-q11",
    question: "What is the output when reversing a string using step slicing?",
    code: "text = 'Python'\nprint(text[::-1])",
    options: ["nohtyP", "Python", "Error", "TnhoP"],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "Slicing",
    explanation: "The slice step '-1' traverses the string in reverse from the last character to the first, producing 'nohtyP'."
  },
  {
    id: "sec1-set1-q12",
    question: "What does the floor division operator '//' evaluate to with negative numbers?",
    code: "print(-7 // 2)",
    options: ["-3", "-4", "-3.5", "-3.0"],
    correctAnswer: 1,
    difficulty: "medium",
    topic: "Numeric Operations",
    explanation: "Python's floor division rounds towards negative infinity. -7 / 2 = -3.5, and the floor of -3.5 is -4."
  },
  {
    id: "sec1-set1-q13",
    question: "What is the output of the following 'for-else' loop block?",
    code: "for i in range(3):\n    if i == 5:\n        break\nelse:\n    print('Completed')",
    options: ["Nothing is printed", "Completed", "0 1 2 Completed", "Error"],
    correctAnswer: 1,
    difficulty: "medium",
    topic: "Loops with Else",
    explanation: "The 'else' clause of a 'for' loop executes only if the loop terminates normally without encountering a 'break' statement."
  },
  {
    id: "sec1-set1-q14",
    question: "What is the result of operator precedence with bitwise AND and logical OR?",
    code: "x = 4 | 2 & 1\nprint(x)",
    options: ["4", "6", "0", "1"],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "Operator Precedence",
    explanation: "Bitwise '&' has higher precedence than '|'. '2 & 1' is 0. Then '4 | 0' evaluates to 4."
  },
  {
    id: "sec1-set1-q15",
    question: "What is the output of the identity operator vs equality operator on integers?",
    code: "x = 256\ny = 256\nprint(x is y, x == y)",
    options: ["True True", "False True", "True False", "False False"],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "Identity vs Equality",
    explanation: "CPython caches small integer objects in the range [-5, 256]. Both x and y reference the exact same memory object for 256, so both 'is' and '==' return True."
  },
  {
    id: "sec1-set1-q16",
    question: "What will be printed by the following ternary conditional expression?",
    code: "val = 10 if 5 > 10 else 20 if 3 < 1 else 30\nprint(val)",
    options: ["10", "20", "30", "None"],
    correctAnswer: 2,
    difficulty: "medium",
    topic: "Conditional Expressions",
    explanation: "5 > 10 is False, so it evaluates the first else clause: '20 if 3 < 1 else 30'. Since 3 < 1 is False, it resolves to 30."
  },
  {
    id: "sec1-set1-q17",
    question: "What does the following short-circuit evaluation return?",
    code: "a = 0 or [] or 'Default' or 100\nprint(a)",
    options: ["0", "[]", "'Default'", "100"],
    correctAnswer: 2,
    difficulty: "medium",
    topic: "Short-Circuit Logic",
    explanation: "The 'or' operator evaluates from left to right and returns the first truthy value encountered. 0 and [] are falsy; 'Default' is truthy, so it is returned."
  },
  {
    id: "sec1-set1-q18",
    question: "What is the output of the string formatting expression?",
    code: "num = 12.3456\nprint(f'{num:.2f}')",
    options: ["12.34", "12.35", "12.3", "12"],
    correctAnswer: 1,
    difficulty: "medium",
    topic: "String Formatting",
    explanation: "The format specifier ':.2f' rounds the floating-point value to 2 decimal places using standard rounding rules, yielding '12.35'."
  },
  {
    id: "sec1-set1-q19",
    question: "What happens when 'break' is executed inside a nested loop?",
    code: "for i in range(2):\n    for j in range(2):\n        if j == 1:\n            break\n        print(i, j)",
    options: [
      "Terminates all nested loops",
      "Terminates only the innermost loop for that iteration",
      "Raises a LoopControlError",
      "Skips only the current iteration like continue"
    ],
    correctAnswer: 1,
    difficulty: "medium",
    topic: "Nested Loops",
    explanation: "In Python, 'break' only terminates the innermost enclosing loop, leaving outer loops to continue."
  },
  {
    id: "sec1-set1-q20",
    question: "What is the output of the following binary bitwise shift operation?",
    code: "print(5 << 2, 20 >> 2)",
    options: ["20 5", "10 5", "25 10", "20 10"],
    correctAnswer: 0,
    difficulty: "medium",
    topic: "Bitwise Operators",
    explanation: "5 << 2 shifts binary 101 left by 2 positions (10100 in binary = 20). 20 >> 2 shifts right by 2 positions (101 in binary = 5)."
  },

  // HARD (21-30)
  {
    id: "sec1-set1-q21",
    question: "What is the output of the following mutable default parameter trap in Python?",
    code: "def func(x=[]):\n    x.append(1)\n    return x\n\nprint(func(), func())",
    options: ["[1] [1]", "[1, 1] [1, 1]", "[1] [1, 1]", "[1, 1] [1]"],
    correctAnswer: 1,
    difficulty: "hard",
    topic: "Default Arguments & Mutability",
    explanation: "Default parameter objects are evaluated once at function definition time. Both calls mutate and reference the identical list object 'x', resulting in '[1, 1] [1, 1]'."
  },
  {
    id: "sec1-set1-q22",
    question: "What is the output of the augmented assignment operator '+=' on a tuple containing a list?",
    code: "t = (1, 2, [3, 4])\ntry:\n    t[2] += [5, 6]\nexcept TypeError:\n    pass\nprint(t)",
    options: [
      "(1, 2, [3, 4])",
      "(1, 2, [3, 4, 5, 6])",
      "TypeError is not caught",
      "(1, 2, [5, 6])"
    ],
    correctAnswer: 1,
    difficulty: "hard",
    topic: "Tuple Mutability & Augmented Assignment",
    explanation: "The '+=' operator calls '__iadd__' on the underlying list (which mutates [3, 4] to [3, 4, 5, 6] in place), then attempts to re-assign the list back to t[2], raising a TypeError because tuples are immutable. The list modification remains."
  },
  {
    id: "sec1-set1-q23",
    question: "What is the output of the following boolean arithmetic evaluation?",
    code: "print(True + True * False - True)",
    options: ["0", "1", "-1", "TypeError"],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Booleans as Integers",
    explanation: "In Python, 'bool' is a subclass of 'int' where True == 1 and False == 0. Following operator precedence: 1 + (1 * 0) - 1 = 1 + 0 - 1 = 0."
  },
  {
    id: "sec1-set1-q24",
    question: "What will the following code print regarding float representation and precision?",
    code: "print(0.1 + 0.2 == 0.3, 0.1 + 0.2)",
    options: [
      "True 0.3",
      "False 0.30000000000000004",
      "False 0.3",
      "True 0.30000000000000004"
    ],
    correctAnswer: 1,
    difficulty: "hard",
    topic: "Floating Point Precision",
    explanation: "Due to IEEE 754 floating-point representation, binary fractions cannot represent 0.1 or 0.2 exactly in finite bits, resulting in 0.30000000000000004 != 0.3."
  },
  {
    id: "sec1-set1-q25",
    question: "What is the output of the following loop modifying a list while iterating?",
    code: "nums = [1, 2, 3, 4]\nfor n in nums:\n    if n % 2 == 0:\n        nums.remove(n)\nprint(nums)",
    options: ["[1, 3]", "[1, 2, 3, 4]", "[1, 3, 4]", "[1]"],
    correctAnswer: 2,
    difficulty: "hard",
    topic: "Mutation during Iteration",
    explanation: "When nums.remove(2) removes the element at index 1, the remaining items shift left. The loop index advances to index 2, skipping 3 and examining 4 (which was shifted to index 2). Thus 4 is not removed, leaving [1, 3, 4]."
  },
  {
    id: "sec1-set1-q26",
    question: "What is printed when evaluating chained assignment with nested references?",
    code: "a = b = []\na.append(1)\nb = b + [2]\nprint(a, b)",
    options: ["[1] [1, 2]", "[1, 2] [1, 2]", "[1] [2]", "[] [1, 2]"],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "In-place vs Rebinding",
    explanation: "'a.append(1)' mutates the list shared by 'a' and 'b'. Then 'b = b + [2]' creates a new list [1, 2] and rebinds 'b' only. 'a' remains pointing to [1]."
  },
  {
    id: "sec1-set1-q27",
    question: "What is the result of string interning and identity for dynamically created strings?",
    code: "s1 = 'hello_world'\ns2 = ''.join(['hello', '_', 'world'])\nprint(s1 == s2, s1 is s2)",
    options: ["True True", "True False", "False False", "False True"],
    correctAnswer: 1,
    difficulty: "hard",
    topic: "String Interning & Identity",
    explanation: "Both strings contain identical character sequences ('hello_world'), so '==' is True. However, dynamically constructed strings via 'join' are allocated separately in memory, so 'is' is False."
  },
  {
    id: "sec1-set1-q28",
    question: "What is the result of the following complex slice assignment?",
    code: "arr = [1, 2, 3, 4, 5]\narr[1:4] = [20, 30]\nprint(arr)",
    options: ["[1, 20, 30, 5]", "[1, 20, 30, 4, 5]", "[1, 20, 30]", "[20, 30, 5]"],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Slice Assignment",
    explanation: "Slice assignment replaces the slice arr[1:4] (which corresponds to elements [2, 3, 4]) with the new sequence [20, 30], resulting in [1, 20, 30, 5]."
  },
  {
    id: "sec1-set1-q29",
    question: "What is the output of the walrus operator ':=' inside a list comprehension?",
    code: "vals = [y for x in range(4) if (y := x * 2) > 2]\nprint(vals)",
    options: ["[4, 6]", "[2, 4, 6]", "[3, 4]", "[6]"],
    correctAnswer: 0,
    difficulty: "hard",
    topic: "Walrus Operator in Comprehensions",
    explanation: "For x = 0 (y=0 <= 2), x = 1 (y=2 <= 2), x = 2 (y=4 > 2 -> captured), x = 3 (y=6 > 2 -> captured). The result is [4, 6]."
  },
  {
    id: "sec1-set1-q30",
    question: "What is the output of the following generator expression evaluated with sum and a condition?",
    code: "gen = (i**2 for i in range(5))\nprint(sum(gen), sum(gen))",
    options: ["30 30", "30 0", "0 30", "TypeError"],
    correctAnswer: 1,
    difficulty: "hard",
    topic: "Generator Exhaustion",
    explanation: "Generators are one-time iterators. The first sum(gen) consumes all elements (0 + 1 + 4 + 9 + 16 = 30). The second sum(gen) receives an exhausted iterator, returning 0."
  }
];
