var addOperator, autoSyntax, fillKeys, initFormula, saveFormula;
autoSyntax = function(board) {
  var code, data, match, operator, value, _i, _j, _len, _len2, _ref, _ref2;
  value = Formula.value;
  Overlay.innerHTML = '';
  if (board.altKey) {
    for (operator in Operators) {
      data = Operators[operator];
      _ref = data.altKeys;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        code = _ref[_i];
        if (board.keyCode === code) {
          value = value.slice(0, -1) + operator;
        }
      }
    }
  }
  for (operator in Operators) {
    data = Operators[operator];
    _ref2 = data.keys;
    for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
      match = _ref2[_j];
      value = value.replace(match, operator);
    }
  }
  if (value !== Formula.value) {
    Formula.value = value;
    return saveFormula();
  }
};
initFormula = function() {
  Formula.value = (typeof localStorage !== "undefined" && localStorage !== null ? localStorage.getItem('formula') : void 0) || '';
  return Formula.placeholder = random(Placeholders);
};
saveFormula = function() {
  return typeof localStorage !== "undefined" && localStorage !== null ? localStorage.setItem('formula', Formula.value) : void 0;
};
addOperator = function(operator) {
  return Formula.value += operator.getAttribute('key');
};
fillKeys = function() {
  var code, data, i, key, keys, li, operator, text, _i, _len, _ref, _results;
  _results = [];
  for (operator in Operators) {
    data = Operators[operator];
    li = '<li onclick="addOperator(this)" key="' + operator + '">';
    keys = data.keys;
    text = li;
    for (i in keys) {
      key = keys[i];
      keys[i] = new RegExp(key.escape(), 'gi');
      text += key + ' , ';
    }
    _ref = data.altKeys;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      code = _ref[_i];
      text += 'alt-' + String.fromCharCode(code).toLowerCase() + ' , ';
    }
    OperatorList.innerHTML += li + operator + '</li>';
    _results.push(KeyList.innerHTML += text.slice(0, -3) + '</li>');
  }
  return _results;
};