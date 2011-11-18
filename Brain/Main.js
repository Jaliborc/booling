window.onload = function() {
  globals(['FormulaSection', 'Formula', 'OperatorList', 'KeyList', 'AnswerSection', 'AnswerArea', 'NewVersion']);
  setPlaceholder();
  checkVersion();
  return fillKeys();
};