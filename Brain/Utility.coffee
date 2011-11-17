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
	
global = (id) ->
	window[id] = document.getElementById(id)