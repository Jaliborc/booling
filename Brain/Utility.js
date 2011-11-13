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
global = function(id) {
  return window[id] = document.getElementById(id);
};
print = function(text) {
  return console.log(text);
};
escape = function(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
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