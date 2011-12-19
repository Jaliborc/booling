var redirectOfficial;
redirectOfficial = function() {
  if ((typeof DOWNLOAD !== "undefined" && DOWNLOAD !== null) && (typeof navigator !== "undefined" && navigator !== null ? navigator.onLine : void 0)) {
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