window.onload = ->
	globals(['Formula', 'OperatorList', 'KeyList', 'NewVersion', 'AnswerTable')
	checkVersion()
	fillKeys()
	
	Formula.placeholder = random(Placeholders)