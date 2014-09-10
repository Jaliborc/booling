###
	2011- 2014 João Cardoso (jaliborc.com)
###

# List
listSaved = ->
	numSaves = localStorage.getItem('numSaves')
	ul = getElement(SavedList, 'ul')
	window.opening = false
	
	if numSaves? > 0
		list = ''
		list += '<li onclick="openSaved(' + i + ')">' + localStorage.getItem('saved' + i) for i in [1 .. numSaves]
		ul.innerHTML = list
	else
		ul.innerHTML = NO_SAVES
		
	showFrame(SavedList)
	showFrame(Fader)
	
openSaved = (i) ->
	return if window.opening
		
	data = JSON.parse(localStorage.getItem('saved' + i + 'data'))
	Formula.value = data.formula
	window.opening = true

	getElement(NewSave, 'input').value = localStorage.getItem('saved' + i)
	localStorage.setItem('lastFormula', data.formula)
	localStorage.setItem(k, v) for k, v of data 
	
	showAnswer(true)
	closeDialogs()


# Save	
saveAs = ->
	showFrame(NewSave)
	showFrame(Fader)
	
saveResult = ->
	name = getElement(NewSave, 'input').value
	return if name == ''
	
	data = {'formula': localStorage.getItem('formula')}
	data[k] = localStorage.getItem(k) for k in [0 .. Parsed.size]
	
	count = Number(localStorage.getItem('numSaves')) or 0
	index = count + 1
	
	for i in [1 .. count]
		if localStorage.getItem('saved' + i) == name
			index = i
			break
	
	localStorage.setItem('saved' + index, name)
	localStorage.setItem('saved' + index + 'data', JSON.stringify(data))
	localStorage.setItem('numSaves', Math.max(index, count))
	closeDialogs()


# Close
closeDialogs = ->
	hideFrame(SavedList)
	hideFrame(NewSave)
	hideFrame(Fader)