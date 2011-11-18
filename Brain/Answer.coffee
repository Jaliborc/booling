# Character Types
class Char
	constructor: (@text) ->
		@type = @getType()
		this[@type] = true
			
	getType: ->	
		if @text == ' ' or @text == ''
			'ignore'
		else if @text == '('
			'open'
		else if @text == ')'
			'close'
		else if @text == NOT
			'not'
		else if 65 <= @text.charCodeAt(0) <= 122
			'var'
		else
			for operator in Keys
				return 'oper' if @text == operator[0]

# Parser
class Parser
	errors =
		var:
			var: 'DOUBLE VAR'
			close: 'MISSING OPER'
		oper:
			oper: 'DOUBLE OPER'
			open: 'MISSING VAR'
		open:
			var: 'MISSING OPER'
			close: 'MISSING OPER'
		close:
			oper: 'MISSING VAR'
			open: 'EMPTY BRACKET'
	
	constructor: (@formula) ->
		return if @error = @parseFormula()
		@result = ''
		@writeVars()
		@connectChars()
		@writeFormula()
		
	parseFormula: ->	
		size = @formula.length
		if size is 0
			return 'EMPTY'
		else if size < 3
			return 'SHORT'
		
		@list = []
		@vars = {}
		
		last = false
		brackets = 0
		
		for i in [0 .. size - 1]
			char = new Char(@formula.charAt(i))
			continue if char.ignore
			
			@i = i
			return error if error = errors[char.type][last?.type]
			
			if char.var
				@vars[char.text] or= []
				char.values = @vars[char.text]
			else if char.open
				brackets++
			else if char.close
				brackets--
				last.text += ')'
				return 'NUM BRACKETS' if brackets < 0
				
			char.text = '(' + char.text if last.open
			@list.push(char)
			last = char
			
		return 'NUM BRACKETS' if brackets != 0
		
	writeVars: ->
		vars = (id for id of @vars)
		numVars = vars.length
		@lines = pow(2, numVars) - 1
		
		for x in [0 .. numVars - 1]
			id = vars[x]
			@result += '<li><h1>' + id + '</h1><ul>'

			for y in [0 .. @lines]
				v = floor(y / pow(2, x)) % 2
				@result += '<li>' + toBolean(v) + '</li>'
				@vars[id][y] = v

			@result += '</ul></li>'
		
	writeFormula: ->
		for i, char of @list
			unless char.open or char.close or char.not
				@result += '<li><h1>' + char.text + '</h1></li>'
				
	connectChars: -> 't'
	
	
# Triggers
toBolean = (n) ->
	if n == 0 then T else F

parseSyntax = ->
	parser = new Parser(Formula.value)

	if parser.error
		print(parser.error)
	else
		switchFrames(FormulaSection, AnswerSection, TIME, ->
			AnswerArea.innerHTML = parser.result
		)
		
showFormula = ->
	switchFrames(AnswerSection, FormulaSection, TIME)