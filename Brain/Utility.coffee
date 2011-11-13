# Math	
random = (array) ->
	return array[floor(Math.random() * array.length)]
	
pow = (a,b) -> return Math.pow(a,b)
floor = (a) -> return Math.floor(a)


# General
global = (id) ->
	window[id] = document.getElementById(id)
	
print = (text) ->
	console.log(text)

escape = (text) ->
	return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')

clearFocus = ->
	selection = if window.getSelection then window.getSelection() else document.selection

	if selection
		selection.empty() if selection.empty
		selection.removeAllRanges() if selection.removeAllRanges