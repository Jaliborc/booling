window.onload = ->
	globals([
		'FormulaSection'
			'Formula'
			'OperatorList'
			'KeyList'
		'AnswerSection'
			'AnswerArea'
		'NewVersion'
	])
	
	setPlaceholder()
	checkVersion()
	fillKeys()