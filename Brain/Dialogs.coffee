# List
listSaved = ->
	numSaves = localStorage.getItem('numSaves')
	ul = getElement(SavedList, 'ul')
	
	if numSaves? > 0
		list = ''
		list += '<li onclick="openSaved(' + i + ')">' + localStorage.getItem('saved' + i) for i in [1 .. numSaves]
		ul.innerHTML = list
		
	else
		ul.innerHTML = NO_SAVES
		
	showFrame(SavedList)
	showFrame(Fader)
	
openSaved = (i) ->
	data = JSON.parse(localStorage.getItem('saved' + i + 'data'))
	Formula.value = data.formula

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
	
	count = Number(localStorage.getItem('numSaves')) or 0
	data = {'formula': localStorage.getItem('formula')}
	data[k] = localStorage.getItem(k) for k in [0 .. Parsed.size]
	
	for i in [1 .. count]
		if localStorage.getItem('saved' + i) == name
			break
	
	localStorage.setItem('saved' + i, name)
	localStorage.setItem('saved' + i + 'data', JSON.stringify(data))
	localStorage.setItem('numSaves', Math.max(i, count))
	closeDialogs()

# Close
closeDialogs = ->
	hideFrame(SavedList)
	hideFrame(NewSave)
	hideFrame(Fader)