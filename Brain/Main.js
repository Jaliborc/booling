var redirectOfficial;
redirectOfficial = function() {
  var _ref;
  if ((typeof USER !== "undefined" && USER !== null) && (typeof navigator !== "undefined" && navigator !== null ? navigator.onLine : void 0) && ((_ref = window.location) != null ? _ref.href : void 0) !== 'http://www.jaliborc.com/Booling/') {
    return window.location = 'http://www.jaliborc.com/Booling/';
  }
};
window.onload = function() {
  redirectOfficial();
  window.addEventListener('online', redirectOfficial);
  globals(['FormulaSection', 'Formula', 'Overlay', 'Error', 'OperatorList', 'KeyList', 'AnswerSection', 'AnswerTable', 'NewVersion']);
  initFormula();
  return fillKeys();
};