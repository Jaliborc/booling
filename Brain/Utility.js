var escape, floor, globals, pow, print, random, switchFrames;
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
globals = function(list) {
  var id, _i, _len, _results;
  _results = [];
  for (_i = 0, _len = list.length; _i < _len; _i++) {
    id = list[_i];
    _results.push(window[id] = document.getElementById(id));
  }
  return _results;
};
switchFrames = function(hide, show, time, onFinish) {
  hide.className = 'fade';
  return setTimeout(function() {
    hide.className = 'hide';
    show.className = 'show';
    return typeof onFinish === "function" ? onFinish() : void 0;
  }, time);
};