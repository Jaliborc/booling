window.onload = function() {
  global('OperatorList');
  global('KeyList');
  global('Formula');
  global('Table');
  Formula.placeholder = random(Placeholders);
  return fillKeys();
};