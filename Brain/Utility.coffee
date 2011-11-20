# Math	
random = (array) ->
	return array[floor(Math.random() * array.length)]
	
pow = (a,b) -> return Math.pow(a,b)
floor = (a) -> return Math.floor(a)


# General
print = (text) ->
	console.log(text)

escape = (text) ->
	return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
	
globals = (list) ->
	window[id] = document.getElementById(id) for id in list
	

# Animation
switchFrames = (hide, show, time, onFinish) ->
	hide.className = 'fade'
	
	setTimeout(->
		hide.className = 'hide'
		show.className = 'show'
		onFinish?()
	, time)