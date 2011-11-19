var addOperator, autoSyntax, fillKeys, setPlaceholder;
autoSyntax = function(board) {
  var code, match, operator, value, _i, _j, _k, _l, _len, _len2, _len3, _len4, _ref, _ref2;
  value = Formula.value;
  if (board.altKey) {
    for (_i = 0, _len = Keys.length; _i < _len; _i++) {
      operator = Keys[_i];
      _ref = operator[2];
      for (_j = 0, _len2 = _ref.length; _j < _len2; _j++) {
        code = _ref[_j];
        if (board.keyCode === code) {
          value = value.slice(0, -1) + operator[0];
        }
      }
    }
  }
  for (_k = 0, _len3 = Keys.length; _k < _len3; _k++) {
    operator = Keys[_k];
    _ref2 = operator[1];
    for (_l = 0, _len4 = _ref2.length; _l < _len4; _l++) {
      match = _ref2[_l];
      value = value.replace(match, operator[0]);
    }
  }
  if (value !== Formula.value) {
    return Formula.value = value;
  }
};
setPlaceholder = function() {
  return Formula.placeholder = random(Placeholders);
};
addOperator = function(operator) {
  return Formula.value += operator.getAttribute('key');
};
fillKeys = function() {
  var alts, data, i, key, li, normals, operator, text, _i, _j, _len, _len2, _results;
  _results = [];
  for (_i = 0, _len = Keys.length; _i < _len; _i++) {
    data = Keys[_i];
    operator = data[0], normals = data[1], alts = data[2];
    li = '<li onclick="addOperator(this)" key="' + operator + '">';
    text = li;
    for (i in normals) {
      key = normals[i];
      key = normals[i];
      text += key + ' , ';
      normals[i] = new RegExp(escape(key), 'gi');
    }
    for (_j = 0, _len2 = alts.length; _j < _len2; _j++) {
      key = alts[_j];
      text += 'alt-' + String.fromCharCode(key).toLowerCase() + ' , ';
    }
    OperatorList.innerHTML += li + operator + '</li>';
    _results.push(KeyList.innerHTML += text.slice(0, -3) + '</li>');
  }
  return _results;
};