# Tools
isOperator = (char) ->
	for operator in Keys
		return true if char == operator[0]

isLetter = (char) ->
	return 65 <= char.charCodeAt(0) <= 122 if char
	
getText = (char) ->
	return char.getText and char.getText() or char

toBolean = (n) ->
	return (if n == 0 then T else F)
	
	
# Operator Class
class Operator
	constructor: (@text, @list, @i) ->
		
	getText: ->
		return @text


# Build
buildTable = ->
	# Interpret
	formula = Formula.value
	size = formula.length

	last = false
	brackets = 0
	letters = []
	list = []
	reg = {}
	
	for i in [0 .. size-1]
		char = formula.charAt(i)
		continue if char == ' '
		
		if isLetter(char)
			return ['DOUBLE VAR', i] if isLetter(last)
			return ['BRACKET VAR', i] if last == ')'
			if not reg[char]
				letters.push(char)
				reg[char] = true
			
		else if isOperator(char)
			return ['DOUBLE OPER', i] if char != NOT and isOperator(last)
			return ['BRACKET OPER', i] if last == '('
			char = new Operator(char, list, i)
			
		else if char == '('
			brackets += 1
			return ['VAR BRACKET', i] if isLetter(last)
			return ['EMPTY BRACKET', i] if last == ')'
			
		else if char == ')'
			brackets -= 1
			return ['OPER BRACKET', i] if isOperator(last)
			return ['DOUBLE BRACKET', i] if last == '('
			return ['BRACKETS', i] if brackets < 0
			
		else
			return ['UNKNOWN', i]
		
		last = getText(char)	
		list.push(char)
	
	size = list.length
	return ['SIZE'] if size < 3
	return ['BRACKETS'] if brackets != 0

	# Print Letters
	numLetters = letters.length
	numLines = pow(2, numLetters) - 1
	body = ''
	
	for x in [0 .. numLetters-1]
		body += '<li><h2>' + letters[x] + '</h2><ul>'
	
		for y in [0 .. numLines]
			body += '<li>' + toBolean(floor(y / pow(2, x)) % 2) + '</li>'
			
		body += '</ul></li>'

	# Print Formula	
	for i in [0 .. size-1]
		body += '<li class="no-border"><h2>' + getText(list[i]) + '</h2><ul>'
			
		for y in [0 .. numLines]
			body += '<li i="' + i + '" y="' + y + '"><input type="text"></li>'
			
		body += '</ul></li>'

	# Finish!
	Table.innerHTML = body
	return false
	
	
# Events
showError = (error) ->
	[type, index] = error
	print(type + ' at ' + index)
	
tryAnswer = ->	
	clearFocus()
	error = buildTable()
	showError(error) if error