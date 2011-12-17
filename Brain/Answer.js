var clearRelations, focusRelation, focusRelations, getColumns, getOper, parseBolean, parseSyntax, showFormula, verifyAnswer;
parseSyntax = function() {
  var error, messages, parser, value;
  value = Formula.value;
  parser = new Parser(value);
  error = parser.error;
  if (error) {
    if (Error.current !== error && (messages = Errors[error])) {
      Error.getElementsByTagName('p')[0].innerHTML = random(messages);
      Error.className = 'show alert';
      Overlay.innerHTML = value;
      Error.current = error;
    }
    return print(error);
  } else {
    return switchFrames(FormulaSection, AnswerSection, function() {
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
verifyAnswer = function() {
  var i, input, inputs, numLines, text, value, x, _ref, _results;
  inputs = AnswerTable.getElementsByTagName('input');
  numLines = AnswerTable.parser.lines + 1;
  _results = [];
  for (i = 0, _ref = inputs.length - 1; 0 <= _ref ? i <= _ref : i >= _ref; 0 <= _ref ? i++ : i--) {
    input = inputs[i];
    text = input.value;
    _results.push(!text ? print('Value missing') : (x = i % numLines, value = getOper(input).getValue(x), value !== text ? print('Incorrect value') : void 0));
  }
  return _results;
};
showFormula = function() {
  return switchFrames(AnswerSection, FormulaSection, function() {
    AnswerSection.style.width = '1px';
    return AnswerTable.innerHTML = '';
  });
};
focusRelations = function(input) {
  var oper, uls;
  oper = getOper(input);
  uls = getColumns();
  clearRelations();
  focusRelation('a', oper, uls);
  return focusRelation('b', oper, uls);
};
focusRelation = function(rel, oper, uls) {
  var i, _ref, _ref2;
  i = (_ref = oper[rel]) != null ? _ref.index() : void 0;
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
getOper = function(input) {
  var i;
  i = input.getAttribute('i');
  return AnswerTable.parser.list[i];
};