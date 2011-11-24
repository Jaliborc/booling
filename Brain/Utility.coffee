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
	hide.className = 'fade'
	
	setTimeout(->
		hide.className = 'hide'
		show.className = 'show'
		onFinish?()
	, ANIMATE_TIME)
	
	
# General	
globals = (list) ->
	window[id] = document.getElementById(id) for id in list

print = (text) ->
	console.log(text)