redirectOfficial = ->
	if USER and navigator?.onLine and window.location?.host != 'www.jaliborc.com'
		window.location = 'http://www.jaliborc.com/Booling/'

window.onload = ->
	redirectOfficial()
	window.addEventListener('online', redirectOfficial)
	
	globals([
		'FormulaSection'
			'Formula'
			'Overlay'
			'Error'
			'OperatorList'
			'KeyList'
		'AnswerSection'
			'AnswerTable'
		'NewVersion'
	])
	
	
	initFormula()
	fillKeys()