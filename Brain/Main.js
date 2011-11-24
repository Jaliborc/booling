window.onload = function() {
  globals(['FormulaSection', 'Formula', 'OperatorList', 'KeyList', 'AnswerSection', 'AnswerTable', 'NewVersion']);
  initFormula();
  return fillKeys();
};