window.onload = ->
	global('NewVersion')
	global('OperatorList')
	global('Formula')
	global('KeyList')
	
	Formula.placeholder = random(Placeholders)
	checkVersion()
	fillKeys()