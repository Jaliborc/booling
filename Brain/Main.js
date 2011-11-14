window.onload = function() {
  Formula.placeholder = random(Placeholders);
  fillKeys();
  if (!Online) {
    return NewVersion.className = 'alert display';
  }
};