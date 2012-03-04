redirectOfficial = ->
	if DOWNLOAD? and navigator?.onLine
		window.location = 'http://booling.jaliborc.com'
		
updateVersion = ->
	if applicationCache.status is applicationCache.UPDATEREADY
		applicationCache.swapCache()
		location.reload()

window.onload = ->
	redirectOfficial()
	addEventListener('online', redirectOfficial)
	applicationCache?.addEventListener('updateready', updateVersion)
	window.localStorage or=
		'getItem': ->
		'setItem': ->
	
	globals([
		'FormulaSection'
			'Formula'
			'Overlay'
			'Error'
			'OperatorList'
			'KeyList'
		'AnswerSection'
			'AnswerTable'
		'Fader'
		'SavedList'
		'NewSave'
	])
	
	fillKeys()
	initFormula()
	initAnswer()
	
	if localStorage.getItem('state') is 'answer'
		showAnswer()
	else
		showFormula()