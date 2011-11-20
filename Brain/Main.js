window.onload = function() {
  globals(['FormulaSection', 'Formula', 'OperatorList', 'KeyList', 'AnswerSection', 'AnswerTable', 'NewVersion']);
  checkVersion();
  initFormula();
  return fillKeys();
};