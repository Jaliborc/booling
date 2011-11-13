var Operator, buildTable, getText, isLetter, isOperator, showError, toBolean, tryAnswer;
isOperator = function(char) {
  var operator, _i, _len;
  for (_i = 0, _len = Keys.length; _i < _len; _i++) {
    operator = Keys[_i];
    if (char === operator[0]) {
      return true;
    }
  }
};
isLetter = function(char) {
  var _ref;
  if (char) {
    return (65 <= (_ref = char.charCodeAt(0)) && _ref <= 122);
  }
};
getText = function(char) {
  return char.getText && char.getText() || char;
};
toBolean = function(n) {
  if (n === 0) {
    return T;
  } else {
    return F;
  }
};
Operator = (function() {
  function Operator(text, list, i) {
    this.text = text;
    this.list = list;
    this.i = i;
  }
  Operator.prototype.getText = function() {
    return this.text;
  };
  return Operator;
})();
buildTable = function() {
  var body, brackets, char, formula, i, last, letters, list, numLetters, numLines, reg, size, x, y, _ref, _ref2, _ref3;
  formula = Formula.value;
  size = formula.length;
  last = false;
  brackets = 0;
  letters = [];
  list = [];
  reg = {};
  for (i = 0, _ref = size - 1; 0 <= _ref ? i <= _ref : i >= _ref; 0 <= _ref ? i++ : i--) {
    char = formula.charAt(i);
    if (char === ' ') {
      continue;
    }
    if (isLetter(char)) {
      if (isLetter(last)) {
        return ['DOUBLE VAR', i];
      }
      if (last === ')') {
        return ['BRACKET VAR', i];
      }
      if (!reg[char]) {
        letters.push(char);
        reg[char] = true;
      }
    } else if (isOperator(char)) {
      if (char !== NOT && isOperator(last)) {
        return ['DOUBLE OPER', i];
      }
      if (last === '(') {
        return ['BRACKET OPER', i];
      }
      char = new Operator(char, list, i);
    } else if (char === '(') {
      brackets += 1;
      if (isLetter(last)) {
        return ['VAR BRACKET', i];
      }
      if (last === ')') {
        return ['EMPTY BRACKET', i];
      }
    } else if (char === ')') {
      brackets -= 1;
      if (isOperator(last)) {
        return ['OPER BRACKET', i];
      }
      if (last === '(') {
        return ['DOUBLE BRACKET', i];
      }
      if (brackets < 0) {
        return ['BRACKETS', i];
      }
    } else {
      return ['UNKNOWN', i];
    }
    last = getText(char);
    list.push(char);
  }
  size = list.length;
  if (size < 3) {
    return ['SIZE'];
  }
  if (brackets !== 0) {
    return ['BRACKETS'];
  }
  numLetters = letters.length;
  numLines = pow(2, numLetters) - 1;
  body = '';
  for (x = 0, _ref2 = numLetters - 1; 0 <= _ref2 ? x <= _ref2 : x >= _ref2; 0 <= _ref2 ? x++ : x--) {
    body += '<li><h2>' + letters[x] + '</h2><ul>';
    for (y = 0; 0 <= numLines ? y <= numLines : y >= numLines; 0 <= numLines ? y++ : y--) {
      body += '<li>' + toBolean(floor(y / pow(2, x)) % 2) + '</li>';
    }
    body += '</ul></li>';
  }
  for (i = 0, _ref3 = size - 1; 0 <= _ref3 ? i <= _ref3 : i >= _ref3; 0 <= _ref3 ? i++ : i--) {
    body += '<li class="no-border"><h2>' + getText(list[i]) + '</h2><ul>';
    for (y = 0; 0 <= numLines ? y <= numLines : y >= numLines; 0 <= numLines ? y++ : y--) {
      body += '<li i="' + i + '" y="' + y + '"><input type="text"></li>';
    }
    body += '</ul></li>';
  }
  Table.innerHTML = body;
  return false;
};
showError = function(error) {
  var index, type;
  type = error[0], index = error[1];
  return print(type + ' at ' + index);
};
tryAnswer = function() {
  var error;
  clearFocus();
  error = buildTable();
  if (error) {
    return showError(error);
  }
};