var Char, Parser, clearRelations, focusRelation, focusRelations, getColumns, parseBolean, parseSyntax, showFormula;
Char = (function() {
  function Char(parser, i) {
    this.parser = parser;
    this.text = this.parser.formula.charAt(i);
    this.type = this.getType();
    this[this.type] = true;
    this.operable = this.oper || this.no;
    if (this.operable) {
      this.priority = Keys[this.text].priority;
    }
    this.list = this.parser.list;
    this.i = this.list.length;
  }
  Char.prototype.getType = function() {
    var _ref;
    if (this.text === ' ' || this.text === '') {
      return 'ignore';
    } else if (this.text === '(') {
      return 'open';
    } else if (this.text === ')') {
      return 'close';
    } else if (this.text === NOT) {
      return 'no';
    } else if (Keys[this.text]) {
      return 'oper';
    } else if ((65 <= (_ref = this.text.charCodeAt(0)) && _ref <= 122)) {
      return 'var';
    } else {
      return 'unkown';
    }
  };
  Char.prototype.getIndex = function() {
    if (this.data) {
      return this.data.i;
    } else {
      return this.i + this.parser.numVars + 1;
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
    this.calculateSize();
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
    this.numOpers = 0;
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
      } else if (char.operable) {
        this.numOpers++;
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
  Parser.prototype.calculateSize = function() {
    this.size = this.list.length;
    this.formulaWidth = this.numOpers * 17 + this.size * 13;
    this.varsWidth = this.numVars * 43;
    this.width = Math.max(930, this.varsWidth + this.formulaWidth);
    this.spacer = (this.width - this.varsWidth) / 2 + 'px';
    return this.width += 'px';
  };
  Parser.prototype.writeFormula = function() {
    var char, i, input, y, _ref, _ref2;
    this.result += '<div class="cell">';
    this.createSpacer();
    _ref = this.list;
    for (i in _ref) {
      char = _ref[i];
      this.startCell(char.text);
      for (y = 0, _ref2 = this.lines; 0 <= _ref2 ? y <= _ref2 : y >= _ref2; 0 <= _ref2 ? y++ : y--) {
        input = char.operable ? this.createInput(i) : '';
        this.result += '<li>' + input + '</li>';
      }
      this.endCell();
    }
    this.createSpacer();
    return this.result += '</div>';
  };
  Parser.prototype.createSpacer = function() {
    this.result += '<div class="cell spacer" style="width:' + this.spacer + '"><h1>.</h1><ul>';
    this.result += '<li>.</li>'.times(this.lines + 1);
    return this.endCell();
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
  Parser.prototype.connectOpers = function() {
    var char, i, _ref, _results;
    _results = [];
    for (i = 0, _ref = this.size - 1; 0 <= _ref ? i <= _ref : i >= _ref; 0 <= _ref ? i++ : i--) {
      char = this.list[i];
      if (!char.operable) {
        continue;
      }
      char.a = this.getConnection(char, i, 1, 'open');
      _results.push(char.b = this.getConnection(char, i, -1, 'close'));
    }
    return _results;
  };
  Parser.prototype.getConnection = function(char, start, order, bracket) {
    var brackets, i, prio, target;
    start += order;
    prio = char.priority + order;
    target = this.list[start];
    brackets = 0;
    i = start;
    while (target) {
      if (target[bracket]) {
        brackets++;
      } else if (target.operable) {
        if (brackets === 1 || target.priority > prio) {
          return target;
        }
        brackets--;
      }
      i += order;
      target = this.list[i];
    }
    return this.list[start];
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
      AnswerSection.style.width = parser.width;
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
  return switchFrames(AnswerSection, FormulaSection, TIME, function() {
    AnswerSection.style.width = '1px';
    return AnswerTable.innerHTML = '';
  });
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