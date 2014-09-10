###
	2011- 2014 João Cardoso (jaliborc.com)
###

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
	
showFrame = (frame) ->
	unless hasClass(frame, 'show')
		delay = -> switchClass(frame, 'fade', 'show')
		switchClass(frame, 'hide', 'fade')
		setTimeout(delay, 0)
	
hideFrame = (frame, onFinish) ->
	hidden = hasClass(frame, 'hide')
	delay = ->
		switchClass(frame, 'fade', 'hide') unless hidden
		onFinish?()
	
	switchClass(frame, 'show', 'fade') unless hidden
	setTimeout(delay, ANIMATE_TIME)
	
	
# Classes
switchClass = (frame, original, replace) ->
	frame.className = frame.className.replace(original, '') + replace
		
hasClass = (frame, target) ->
	frame.className.indexOf(target) != -1
	
	
# General	
globals = (list) ->
	window[id] = document.getElementById(id) for id in list
	
getElement = (parent, tag) ->
	parent.getElementsByTagName(tag)[0]

print = (text) ->
	console.log(text)