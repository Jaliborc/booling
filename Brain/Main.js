window.onload = function() {
  global('NewVersion');
  global('OperatorList');
  global('Formula');
  global('KeyList');
  Formula.placeholder = random(Placeholders);
  checkVersion();
  return fillKeys();
};