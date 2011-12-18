var ANIMATE_TIME, Errors, F, NOT, Operators, Placeholders, T;
ANIMATE_TIME = 400;
T = '<li class="green">T</li>';
F = '<li class="red">F</li>';
NOT = '¬';
Operators = {
  '¬': {
    value: function(a, b) {
      return !a;
    },
    keys: ['no', '~', '!'],
    altKeys: [78],
    priority: 8
  },
  '∧': {
    value: function(a, b) {
      return a && b;
    },
    keys: ['and', '^'],
    altKeys: [65, 73],
    priority: 6
  },
  '∨': {
    value: function(a, b) {
      return a || b;
    },
    keys: ['or', 'union'],
    altKeys: [79, 85],
    priority: 4
  },
  '→': {
    value: function(a, b) {
      return !b || a;
    },
    keys: ['then', '->'],
    altKeys: [84],
    priority: 2
  },
  '↔': {
    value: function(a, b) {
      return a === b;
    },
    keys: ['is', 'equal', 'same', '='],
    altKeys: [73, 69],
    priority: 0
  }
};
Placeholders = ['Enter a formula or prepare for humiliation...', "Enter a formula. You don't want to see me bored...", 'Are you going to enter a formula or not? Losing my patience here.', 'Being bullied? "Just act less gay", advise teachers.'];
Errors = {
  'SHORT': ["Sorry pal, I can't make anything with just two characters. Are you too lazy to type more?", "Do you happen to be an eagle who struggles to type with its tallons? Because two characters do not make a formula.", "Kid, type more than two characters or this won't lead us anywhere. And you will not want to see me bored."],
  'DOUBLE VAR': ["Are you trying to write your momma's name?! Why else would you be typing two letters in a row?", "Why on earth are those two next to each other? Trying to send me a message?", "Hey jackass, there must be an operator between those two. Got it?"],
  'NUM BRACKETS': ["Kid, are you still in grade school? 'Cause the number of brackets do not match.", "Do you know how to count? Then check the number of brackets."]
};