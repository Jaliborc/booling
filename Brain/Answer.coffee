# Startup
initAnswer = ->
	window.Inputs = AnswerTable.getElementsByTagName('input')
	window.Columns = AnswerTable.getElementsByTagName('ul')

showAnswer = ->
	value = Formula.value
	window.Parsed = new Parser(value)
	
	i = Parsed.i or Parsed.size - 1
	error = Parsed.error

	if error
		Overlay.innerHTML = value.slice(0, i) + '<span>' + value.slice(i, i + 1) + '</span>'

		if messages = Errors[error]
			position = getElement(Overlay, 'span').offsetLeft - Overlay.offsetLeft - 195
			offset = Math.max(position, 0)

			Error.getElementsByClassName('arrow')[0].style.left = 224 + position - offset + 'px'
			getElement(Error, 'p').innerHTML = random(messages) if Error.current != error

			Error.style.marginLeft = offset + 'px'
			Error.className = 'show alert'
			Error.current = error
			
	else
		isSame = localStorage.getItem('lastFormula') is value
		localStorage.setItem('lastFormula', value)
		localStorage.setItem('state', 'answer')
		
		switchFrames(FormulaSection, AnswerSection, ->
			AnswerSection.style.width = Parsed.width
			AnswerTable.innerHTML = Parsed.result
		
			for i in [0 .. Inputs.length - 1]
				input = Inputs[i]
				input.i = i
				
				if isSame
					input.value = localStorage.getItem(i)
					parseInput(input)
				else
					localStorage.setItem(i, '')
		)


# Answer Events
parseInput = (input) ->
	value = input.value.toUpperCase()
	color = (value == 'T' and 'green') or (value == 'F' and 'red')
	
	if not color
		value = ''

	localStorage.setItem(input.i, value)
	input.parentNode.className = color or ''
	input.value = value

verifyAnswer = ->
	numLines = Parsed.lines + 1
	
	for i in [0 .. Inputs.length - 1]
		input = Inputs[i]
		text = input.value
		
		if not text
			input.parentNode.className = 'wrong'
		else
			x = i % numLines
			value = getOper(input).getValue(x)
		
			if value != text
				input.parentNode.className = 'wrong'
			else
				input.parentNode.className = 'correct'

	
# Focus Events
focusRelations = (input) ->
	oper = getOper(input)

	clearRelations()
	focusRelation('a', oper)
	focusRelation('b', oper)
	
focusRelation = (rel, oper) ->
	i = oper[rel]?.index()
	Columns[i]?.className = 'focus'
		
clearRelations = ->
	for ul in Columns
		ul.className = ''
	
getOper = (input) ->
	Parsed.list[input.getAttribute('oper')]