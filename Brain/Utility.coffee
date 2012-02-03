# Math	
random = (array) ->
	return array[floor(Math.random() * array.length)]
	
pow = (a,b) -> return Math.pow(a,b)
floor = (a) -> return Math.floor(a)


# Strings
String.prototype.times = (n) ->
	Array.prototype.join.call({length:n+1}, this)

String.prototype.escape = ->
	this.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
	

# Animation
switchFrames = (hide, show, onFinish) ->
	hideFrame(hide, -> showFrame(show); onFinish?())
	
showFrame = (target) ->
	switchClass(target, 'hide', 'fade')
	delay = -> switchClass(target, 'fade', 'show')
	setTimeout(delay, 0)
	
hideFrame = (target, onFinish) ->
	switchClass(target, 'show', 'fade')	
	delay = -> switchClass(target, 'fade', 'hide'); onFinish?()
	setTimeout(delay, ANIMATE_TIME)
	
switchClass = (target, original, replace) ->
	console.log(target, target.className, original, replace)
	target.className = target.className.replace(original, '') + replace
	console.log(target.className)
	
	
# General	
globals = (list) ->
	window[id] = document.getElementById(id) for id in list
	
getElement = (parent, tag) ->
	parent.getElementsByTagName(tag)[0]

print = (text) ->
	console.log(text)