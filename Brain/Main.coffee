window.onload = ->
	Formula.placeholder = random(Placeholders)
	fillKeys()
	
	if not Online
		NewVersion.className = 'alert display'