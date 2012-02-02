var floor, getElement, globals, pow, print, random, switchFrames;
random = function(array) {
  return array[floor(Math.random() * array.length)];
};
pow = function(a, b) {
  return Math.pow(a, b);
};
floor = function(a) {
  return Math.floor(a);
};
String.prototype.times = function(n) {
  return Array.prototype.join.call({
    length: n + 1
  }, this);
};
String.prototype.escape = function() {
  return this.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
};
switchFrames = function(hide, show, onFinish) {
  hide.className = 'fade';
  return setTimeout(function() {
    hide.className = 'hide';
    show.className = 'fade';
    setTimeout(function() {
      return show.className = 'show';
    });
    return typeof onFinish === "function" ? onFinish() : void 0;
  }, ANIMATE_TIME);
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
getElement = function(parent, tag) {
  return parent.getElementsByTagName(tag)[0];
};
print = function(text) {
  return console.log(text);
};