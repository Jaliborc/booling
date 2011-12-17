# Parse Events
parseSyntax = ->
	value = Formula.value
	parser = new Parser(value)
	error = parser.error

	if error
		if Error.current != error and messages = Errors[error]
			Error.getElementsByTagName('p')[0].innerHTML = random(messages)
			#Error.style.margin_left = Overlay.getElementsByTagName('span')[0].clientWidth
			Error.className = 'show alert'
			Overlay.innerHTML = value
			Error.current = error
			
		print(error)
	else
		switchFrames(FormulaSection, AnswerSection, ->
			AnswerSection.style.width = parser.width
			AnswerTable.innerHTML = parser.result
			AnswerTable.parser = parser
		)
		
parseBolean = (input) ->
	value = input.value.toUpperCase()
	color = (value == 'T' and 'green') or (value == 'F' and 'red')
	
	if color
		input.className = color
		input.value = value
	else
		input.className = ''
		input.value = ''


# Button Events
verifyAnswer = ->
	inputs = AnswerTable.getElementsByTagName('input')
	numLines = AnswerTable.parser.lines + 1
	
	for i in [0 .. inputs.length - 1]
		input = inputs[i]
		text = input.value
		
		if not text
			print('Value missing')
		else
			x = i % numLines
			value = getOper(input).getValue(x)
		
			if value != text
				print('Incorrect value')
		
showFormula = ->
	switchFrames(AnswerSection, FormulaSection, ->
		AnswerSection.style.width = '1px'
		AnswerTable.innerHTML = ''
	)

	
# Focus Events
focusRelations = (input) ->
	oper = getOper(input)
	uls = getColumns()

	clearRelations()
	focusRelation('a', oper, uls)
	focusRelation('b', oper, uls)
	
focusRelation = (rel, oper, uls) ->
	i = oper[rel]?.index()
	uls[i]?.className = 'focus'
		
clearRelations = ->
	uls = getColumns()
	
	for ul in uls
		ul.className = ''


# API
getColumns = ->
	AnswerTable.getElementsByTagName('ul')
	
getOper = (input) ->
	i = input.getAttribute('i')
	AnswerTable.parser.list[i]