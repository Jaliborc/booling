var addKey, addOperator, autoSyntax, fillKeys;
addKey = function(board) {
  var code, operator, _i, _len, _results;
  if (board.altKey) {
    _results = [];
    for (_i = 0, _len = Keys.length; _i < _len; _i++) {
      operator = Keys[_i];
      _results.push((function() {
        var _j, _len2, _ref, _results2;
        _ref = operator[2];
        _results2 = [];
        for (_j = 0, _len2 = _ref.length; _j < _len2; _j++) {
          code = _ref[_j];
          _results2.push(board.keyCode === code ? Formula.value = Formula.value.slice(0, -1) + operator[0] : void 0);
        }
        return _results2;
      })());
    }
    return _results;
  }
};
autoSyntax = function(event) {
  var match, operator, _i, _len, _results;
  _results = [];
  for (_i = 0, _len = Keys.length; _i < _len; _i++) {
    operator = Keys[_i];
    _results.push((function() {
      var _j, _len2, _ref, _results2;
      _ref = operator[1];
      _results2 = [];
      for (_j = 0, _len2 = _ref.length; _j < _len2; _j++) {
        match = _ref[_j];
        _results2.push(Formula.value = Formula.value.replace(match, operator[0]));
      }
      return _results2;
    })());
  }
  return _results;
};
addOperator = function(operator) {
  return Formula.value += operator.getAttribute('key');
};
fillKeys = function() {
  var alts, data, i, key, li, normals, operator, text, _i, _j, _len, _len2, _ref, _results;
  _results = [];
  for (_i = 0, _len = Keys.length; _i < _len; _i++) {
    data = Keys[_i];
    operator = data[0], normals = data[1], alts = data[2];
    li = '<li onclick="addOperator(this)" key="' + operator + '">';
    text = li;
    for (i = 0, _ref = normals.length - 1; 0 <= _ref ? i <= _ref : i >= _ref; 0 <= _ref ? i++ : i--) {
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