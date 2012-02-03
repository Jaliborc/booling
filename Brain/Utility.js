var floor, getElement, globals, hasClass, hideFrame, pow, print, random, showFrame, switchClass, switchFrames;
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
showFrame = function(frame) {
  var delay;
  if (!hasClass(frame, 'show')) {
    delay = function() {
      return switchClass(frame, 'fade', 'show');
    };
    switchClass(frame, 'hide', 'fade');
    return setTimeout(delay, 0);
  }
};
hideFrame = function(frame, onFinish) {
  var delay, hidden;
  hidden = hasClass(frame, 'hide');
  delay = function() {
    if (!hidden) {
      switchClass(frame, 'fade', 'hide');
    }
    return typeof onFinish === "function" ? onFinish() : void 0;
  };
  if (!hidden) {
    switchClass(frame, 'show', 'fade');
  }
  return setTimeout(delay, ANIMATE_TIME);
};
switchClass = function(frame, original, replace) {
  return frame.className = frame.className.replace(original, '') + replace;
};
hasClass = function(frame, target) {
  return frame.className.indexOf(target) !== -1;
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