var Char, Parser, clearRelations, focusRelation, focusRelations, getColumns, parseBolean, parseSyntax, showFormula;
Char = (function() {
  function Char(parser, i) {
    this.parser = parser;
    this.text = this.parser.formula.charAt(i);
    this.type = this.getType();
    this[this.type] = true;
    this.i = this.parser.list.length;
    this.operate = this.oper || this.no;
  }
  Char.prototype.getType = function() {
    var operator, _i, _len, _ref;
    if (this.text === ' ' || this.text === '') {
      return 'ignore';
    } else if (this.text === '(') {
      return 'open';
    } else if (this.text === ')') {
      return 'close';
    } else if (this.text === NOT) {
      return 'no';
    } else if ((65 <= (_ref = this.text.charCodeAt(0)) && _ref <= 122)) {
      return 'var';
    } else {
      for (_i = 0, _len = Keys.length; _i < _len; _i++) {
        operator = Keys[_i];
        if (this.text === operator[0]) {
          return 'oper';
        }
      }
    }
  };
  Char.prototype.getIndex = function() {
    print([this.i, this.parser.numVars]);
    if (this.data) {
      return this.data.i;
    } else {
      return this.i + this.parser.numVars;
    }
  };
  Char.prototype.getValue = function(x) {
    var _ref;
    return (_ref = this.data) != null ? _ref.values[x] : void 0;
  };
  return Char;
})();
Parser = (function() {
  var errors;
  errors = {
    "var": {
      "var": 'DOUBLE VAR',
      close: 'MISSING OPER'
    },
    oper: {
      oper: 'DOUBLE OPER',
      open: 'MISSING VAR'
    },
    open: {
      "var": 'MISSING OPER',
      close: 'MISSING OPER'
    },
    close: {
      oper: 'MISSING VAR',
      open: 'EMPTY BRACKET'
    }
  };
  function Parser(formula) {
    this.formula = formula;
    if (this.error = this.parseFormula()) {
      return;
    }
    this.result = '';
    this.writeVars();
    this.writeFormula();
    this.connectOpers();
  }
  Parser.prototype.parseFormula = function() {
    var brackets, char, error, i, last, size, _base, _name, _ref, _ref2;
    size = this.formula.length;
    if (size === 0) {
      return 'EMPTY';
    } else if (size < 3) {
      return 'SHORT';
    }
    this.list = [];
    this.vars = {};
    last = false;
    brackets = 0;
    for (i = 0, _ref = size - 1; 0 <= _ref ? i <= _ref : i >= _ref; 0 <= _ref ? i++ : i--) {
      char = new Char(this, i);
      if (char.ignore) {
        continue;
      }
      this.i = i;
      if (error = (_ref2 = errors[char.type]) != null ? _ref2[last != null ? last.type : void 0] : void 0) {
        return error;
      }
      if (char["var"]) {
        (_base = this.vars)[_name = char.text] || (_base[_name] = {
          values: []
        });
        char.data = this.vars[char.text];
      } else if (char.open) {
        brackets++;
      } else if (char.close) {
        brackets--;
        if (brackets < 0) {
          return 'NUM BRACKETS';
        }
      }
      this.list.push(char);
      last = char;
    }
    if (brackets !== 0) {
      return 'NUM BRACKETS';
    }
  };
  Parser.prototype.writeVars = function() {
    var id, record, v, vars, x, y, _ref, _ref2, _results;
    vars = (function() {
      var _results;
      _results = [];
      for (id in this.vars) {
        _results.push(id);
      }
      return _results;
    }).call(this);
    this.numVars = vars.length;
    this.lines = pow(2, this.numVars) - 1;
    _results = [];
    for (x = 0, _ref = this.numVars - 1; 0 <= _ref ? x <= _ref : x >= _ref; 0 <= _ref ? x++ : x--) {
      id = vars[x];
      record = this.vars[id];
      record.i = x;
      this.startCell(id);
      for (y = 0, _ref2 = this.lines; 0 <= _ref2 ? y <= _ref2 : y >= _ref2; 0 <= _ref2 ? y++ : y--) {
        v = floor(y / pow(2, x)) % 2;
        this.result += '<li>' + this.createBolean(v) + '</li>';
        record.values[y] = v;
      }
      _results.push(this.endCell());
    }
    return _results;
  };
  Parser.prototype.writeFormula = function() {
    var char, i, input, y, _ref, _ref2;
    this.result += '<div class="cell">';
    _ref = this.list;
    for (i in _ref) {
      char = _ref[i];
      this.startCell(char.text);
      for (y = 0, _ref2 = this.lines; 0 <= _ref2 ? y <= _ref2 : y >= _ref2; 0 <= _ref2 ? y++ : y--) {
        input = char.operate ? this.createInput(i) : '';
        this.result += '<li>' + input + '</li>';
      }
      this.endCell();
    }
    return this.result += '</div>';
  };
  Parser.prototype.connectOpers = function() {
    var char, i, _ref, _results;
    _results = [];
    for (i = 0, _ref = this.list.length - 1; 0 <= _ref ? i <= _ref : i >= _ref; 0 <= _ref ? i++ : i--) {
      char = this.list[i];
      if (!char.operate) {
        continue;
      }
      char.b = this.getRelation(i, -1, 'close');
      _results.push(char.a = this.getRelation(i, 1, 'open'));
    }
    return _results;
  };
  Parser.prototype.getRelation = function(start, order, bracket) {
    var brackets, canVar, char, i, _ref, _results;
    canVar = true;
    brackets = 0;
    _results = [];
    for (i = _ref = start + order; _ref <= 0 ? i <= 0 : i >= 0; i += order) {
      char = this.list[i];
      if (char[bracket]) {
        canVar = false;
        brackets++;
      } else if (char["var"] && canVar) {
        return char;
      } else if (char.oper) {
        brackets--;
        if (brackets === 0) {
          return char;
        }
      }
    }
    return _results;
  };
  Parser.prototype.startCell = function(header) {
    return this.result += '<div class="cell"><h1>' + header + '</h1><ul>';
  };
  Parser.prototype.createInput = function(i) {
    return '<input oninput="parseBolean(this)" onfocus="focusRelations(this)" onblur="clearRelations()" i="' + i + '">';
  };
  Parser.prototype.createBolean = function(n) {
    if (n === 0) {
      return T;
    } else {
      return F;
    }
  };
  Parser.prototype.endCell = function() {
    return this.result += '</ul></div>';
  };
  return Parser;
})();
parseSyntax = function() {
  var parser;
  parser = new Parser(Formula.value);
  if (parser.error) {
    return print(parser.error);
  } else {
    return switchFrames(FormulaSection, AnswerSection, TIME, function() {
      AnswerTable.innerHTML = parser.result;
      return AnswerTable.parser = parser;
    });
  }
};
parseBolean = function(input) {
  var color, value;
  value = input.value.toUpperCase();
  color = (value === 'T' && 'green') || (value === 'F' && 'red');
  if (color) {
    input.className = color;
    return input.value = value;
  } else {
    input.className = '';
    return input.value = '';
  }
};
showFormula = function() {
  return switchFrames(AnswerSection, FormulaSection, TIME);
};
focusRelations = function(input) {
  var i, oper, uls;
  i = input.getAttribute('i');
  oper = AnswerTable.parser.list[i];
  uls = getColumns();
  clearRelations();
  focusRelation('a', oper, uls);
  return focusRelation('b', oper, uls);
};
focusRelation = function(rel, oper, uls) {
  var i, _ref, _ref2;
  i = (_ref = oper[rel]) != null ? _ref.getIndex() : void 0;
  return (_ref2 = uls[i]) != null ? _ref2.className = 'focus' : void 0;
};
clearRelations = function() {
  var ul, uls, _i, _len, _results;
  uls = getColumns();
  _results = [];
  for (_i = 0, _len = uls.length; _i < _len; _i++) {
    ul = uls[_i];
    _results.push(ul.className = '');
  }
  return _results;
};
getColumns = function() {
  return AnswerTable.getElementsByTagName('ul');
};