window.onload = ->
	global('OperatorList')
	global('KeyList')
	global('Formula')
	global('Table')
		
	Formula.placeholder = random(Placeholders)
	fillKeys()