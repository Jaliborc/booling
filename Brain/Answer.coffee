# Character Types
class Char
	constructor: (@parser, i) ->
		@text = @parser.formula.charAt(i)
		@type = @getType()
		this[@type] = true
		
		@i = @parser.list.length
		@operate = @oper or @no
			
	getType: ->	
		if @text == ' ' or @text == ''
			'ignore'
		else if @text == '('
			'open'
		else if @text == ')'
			'close'
		else if @text == NOT
			'no'
		else if 65 <= @text.charCodeAt(0) <= 122
			'var'
		else
			for operator in Keys
				return 'oper' if @text == operator[0]
				
	getIndex: ->
		print([@i, @parser.numVars])
		if @data then @data.i else @i + @parser.numVars
		
	getValue: (x) ->
		@data?.values[x]


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
		@writeFormula()
		@connectOpers()
		
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
			char = new Char(this, i)
			continue if char.ignore
			
			@i = i
			return error if error = errors[char.type]?[last?.type]
			
			if char.var
				@vars[char.text] or= {values: []}
				char.data = @vars[char.text]
			else if char.open
				brackets++
			else if char.close
				brackets--
				return 'NUM BRACKETS' if brackets < 0
				
			@list.push(char)
			last = char
			
		return 'NUM BRACKETS' if brackets != 0
		
	writeVars: ->
		vars = (id for id of @vars)
		@numVars = vars.length
		@lines = pow(2, @numVars) - 1
		
		for x in [0 .. @numVars - 1]
			id = vars[x]
			record = @vars[id]
			record.i = x
			@startCell(id)

			for y in [0 .. @lines]
				v = floor(y / pow(2, x)) % 2
				@result += '<li>' + @createBolean(v) + '</li>'
				record.values[y] = v

			@endCell()
		
	writeFormula: ->
		@result += '<div class="cell">'
		
		for i, char of @list
				@startCell(char.text)
				
				for y in [0 .. @lines]
					input =if char.operate then @createInput(i) else ''
					@result += '<li>' +  input + '</li>'
				
				@endCell()
				
		@result += '</div>'
				
	connectOpers: ->
		for i in [0 .. @list.length - 1]
			char = @list[i]
			continue unless char.operate
			
			char.b = @getRelation(i, -1, 'close')
			char.a = @getRelation(i, 1, 'open')
			
	getRelation: (start, order, bracket) ->
		canVar = true
		brackets = 0

		for i in [start + order .. 0] by order
			char = @list[i]

			if char[bracket]
				canVar = false
				brackets++
			else if char.var and canVar
				return char
			else if char.oper
				brackets--
				return char if brackets == 0
		
	startCell: (header) ->
		@result += '<div class="cell"><h1>' + header + '</h1><ul>'
			
	createInput: (i) ->
		'<input oninput="parseBolean(this)" onfocus="focusRelations(this)" onblur="clearRelations()" i="' + i + '">'
		
	createBolean: (n) ->
		if n == 0 then T else F
			
	endCell: ->
		@result += '</ul></div>'
		

# Events
parseSyntax = ->
	parser = new Parser(Formula.value)

	if parser.error
		print(parser.error)
	else
		switchFrames(FormulaSection, AnswerSection, TIME, ->
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
		
showFormula = ->
	switchFrames(AnswerSection, FormulaSection, TIME)
	
	
# Focus Events
focusRelations = (input) ->
	i = input.getAttribute('i')
	oper = AnswerTable.parser.list[i]
	uls = getColumns()

	clearRelations()
	focusRelation('a', oper, uls)
	focusRelation('b', oper, uls)
	
focusRelation = (rel, oper, uls) ->
	i = oper[rel]?.getIndex()
	uls[i]?.className = 'focus'
		
clearRelations = ->
	uls = getColumns()
	
	for ul in uls
		ul.className = ''

getColumns = ->
	AnswerTable.getElementsByTagName('ul')