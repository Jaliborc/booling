window.onload = ->
	globals([
		'FormulaSection'
			'Formula'
			'OperatorList'
			'KeyList'
		'AnswerSection'
			'AnswerTable'
		'NewVersion'
	])
	
	checkVersion()
	initFormula()
	fillKeys()