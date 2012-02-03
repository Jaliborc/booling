var floor, getElement, globals, hideFrame, pow, print, random, showFrame, switchClass, switchFrames;
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
  return hideFrame(hide, function() {
    showFrame(show);
    return typeof onFinish === "function" ? onFinish() : void 0;
  });
};
showFrame = function(target) {
  var delay;
  switchClass(target, 'hide', 'fade');
  delay = function() {
    return switchClass(target, 'fade', 'show');
  };
  return setTimeout(delay, 0);
};
hideFrame = function(target, onFinish) {
  var delay;
  switchClass(target, 'show', 'fade');
  delay = function() {
    switchClass(target, 'fade', 'hide');
    return typeof onFinish === "function" ? onFinish() : void 0;
  };
  return setTimeout(delay, ANIMATE_TIME);
};
switchClass = function(target, original, replace) {
  console.log(target, target.className, original, replace);
  target.className = target.className.replace(original, '') + replace;
  return console.log(target.className);
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