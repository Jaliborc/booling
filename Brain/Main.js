var redirectOfficial, updateVersion;
redirectOfficial = function() {
  if ((typeof DOWNLOAD !== "undefined" && DOWNLOAD !== null) && (typeof navigator !== "undefined" && navigator !== null ? navigator.onLine : void 0)) {
    return window.location = 'http://www.jaliborc.com/Booling/';
  }
};
updateVersion = function() {
  if (applicationCache.status === applicationCache.UPDATEREADY) {
    applicationCache.swapCache();
    return location.reload();
  }
};
window.onload = function() {
  redirectOfficial();
  addEventListener('online', redirectOfficial);
  if (typeof applicationCache !== "undefined" && applicationCache !== null) {
    applicationCache.addEventListener('updateready', updateVersion);
  }
  window.localStorage || (window.localStorage = {
    'getItem': function() {},
    'setItem': function() {}
  });
  globals(['FormulaSection', 'Formula', 'Overlay', 'Error', 'OperatorList', 'KeyList', 'AnswerSection', 'AnswerTable', 'NewVersion']);
  fillKeys();
  initFormula();
  initAnswer();
  if (localStorage.getItem('state') === 'answer') {
    return showAnswer();
  } else {
    return showFormula();
  }
};