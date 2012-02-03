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
	func = ->
		hide.className = 'hide'
		show.className = 'fade'
		func = -> show.className = 'show'
			
		setTimeout(func, 0)
		onFinish?()
	
	setTimeout(func, ANIMATE_TIME)
	
	
# General	
globals = (list) ->
	window[id] = document.getElementById(id) for id in list
	
getElement = (parent, tag) ->
	parent.getElementsByTagName(tag)[0]

print = (text) ->
	console.log(text)