var clearFocus, escape, floor, global, pow, print, random;
random = function(array) {
  return array[floor(Math.random() * array.length)];
};
pow = function(a, b) {
  return Math.pow(a, b);
};
floor = function(a) {
  return Math.floor(a);
};
print = function(text) {
  return console.log(text);
};
escape = function(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
};
global = function(id) {
  return window[id] = document.getElementById(id);
};
clearFocus = function() {
  var selection;
  selection = window.getSelection ? window.getSelection() : document.selection;
  if (selection) {
    if (selection.empty) {
      selection.empty();
    }
    if (selection.removeAllRanges) {
      return selection.removeAllRanges();
    }
  }
};