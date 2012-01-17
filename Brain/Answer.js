var clearRelations, focusRelation, focusRelations, getOper, initAnswer, parseInput, showAnswer, verifyAnswer;
initAnswer = function() {
  window.Inputs = AnswerTable.getElementsByTagName('input');
  return window.Columns = AnswerTable.getElementsByTagName('ul');
};
showAnswer = function() {
  var error, i, isSame, messages, offset, position, text, value;
  text = Formula.value;
  value = text.replace(/\s/g, '');
  window.Parsed = new Parser(value);
  i = Parsed.i || Parsed.size - 1;
  error = Parsed.error;
  if (error) {
    Overlay.innerHTML = text.slice(0, i) + '<span>' + text.slice(i, i + 1) + '</span>';
    if (messages = Errors[error]) {
      position = getElement(Overlay, 'span').offsetLeft - Overlay.offsetLeft - 195;
      offset = Math.max(position, 0);
      Error.getElementsByClassName('arrow')[0].style.left = 224 + position - offset + 'px';
      if (Error.current !== error) {
        getElement(Error, 'p').innerHTML = random(messages);
      }
      Error.style.marginLeft = offset + 'px';
      Error.className = 'show alert';
      return Error.current = error;
    }
  } else {
    isSame = localStorage.getItem('lastFormula') === value;
    localStorage.setItem('lastFormula', value);
    localStorage.setItem('state', 'answer');
    return switchFrames(FormulaSection, AnswerSection, function() {
      var i, input, _ref, _results;
      AnswerSection.style.width = Parsed.width;
      AnswerTable.innerHTML = Parsed.result;
      _results = [];
      for (i = 0, _ref = Inputs.length - 1; 0 <= _ref ? i <= _ref : i >= _ref; 0 <= _ref ? i++ : i--) {
        input = Inputs[i];
        input.i = i;
        _results.push(isSame ? (input.value = localStorage.getItem(i), parseInput(input)) : localStorage.setItem(i, ''));
      }
      return _results;
    });
  }
};
parseInput = function(input) {
  var color, value;
  value = input.value.toUpperCase();
  color = (value === 'T' && 'green') || (value === 'F' && 'red');
  if (!color) {
    value = '';
  }
  localStorage.setItem(input.i, value);
  input.parentNode.className = color || '';
  return input.value = value;
};
verifyAnswer = function() {
  var i, input, numLines, text, value, x, _ref, _results;
  numLines = Parsed.lines + 1;
  _results = [];
  for (i = 0, _ref = Inputs.length - 1; 0 <= _ref ? i <= _ref : i >= _ref; 0 <= _ref ? i++ : i--) {
    input = Inputs[i];
    text = input.value;
    _results.push(!text ? input.parentNode.className = 'wrong' : (x = i % numLines, value = getOper(input).getValue(x), value !== text ? input.parentNode.className = 'wrong' : input.parentNode.className = 'correct'));
  }
  return _results;
};
focusRelations = function(input) {
  var oper;
  oper = getOper(input);
  clearRelations();
  focusRelation('a', oper);
  return focusRelation('b', oper);
};
focusRelation = function(rel, oper) {
  var i, _ref, _ref2;
  i = (_ref = oper[rel]) != null ? _ref.index() : void 0;
  return (_ref2 = Columns[i]) != null ? _ref2.className = 'focus' : void 0;
};
clearRelations = function() {
  var ul, _i, _len, _results;
  _results = [];
  for (_i = 0, _len = Columns.length; _i < _len; _i++) {
    ul = Columns[_i];
    _results.push(ul.className = '');
  }
  return _results;
};
getOper = function(input) {
  return Parsed.list[input.getAttribute('oper')];
};