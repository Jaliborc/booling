redirectOfficial = ->
	if navigator?.onLine and window.location?.host != 'jaliborc.com'
		#window.location = 'http://www.jaliborc.com/Booling/'
		print('')

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