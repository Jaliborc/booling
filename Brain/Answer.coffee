# Character Object
class Char
	constructor: (@parser, i) ->
		@text = @parser.formula.charAt(i)
		@type = @getType()
		this[@type] = true
		
		@operable = @oper or @no
		@priority = Operators[@text].priority if @operable
		@list = @parser.list
		@i = @list.length
			
	getType: ->	
		if @text == ' ' or @text == ''
			'ignore'
		else if @text == '('
			'open'
		else if @text == ')'
			'close'
		else if @text == NOT
			'no'
		else if Operators[@text]
			'oper'
		else if 65 <= @text.charCodeAt(0) <= 122
			'var'
		else
			'unkown'
		
	getValue: (x) ->
		if @value(x) then 'T' else 'F'
		
	value: (x) ->
		if @data then @data.values[x] else Operators[@text].value(@a.value(x), @b.value(x))
		
	index: ->
		if @data then @data.i else @i + @parser.numVars + 1


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
		@calculateSize()
		@writeFormula()
		@connectOpers()
		
	parseFormula: ->	
		size = @formula.length
		if size is 0
			return 'EMPTY'
		else if size < 3
			return 'SHORT'
		
		@numOpers = 0
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
			else if char.operable
				@numOpers++
			else if char.open
				brackets++
			else if char.close
				brackets--
				return 'NUM BRACKETS' if brackets < 0
				
			@list.push(char)
			last = char
			
		return 'NUM BRACKETS' if brackets != 0
	
	
	# Writting	
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
				v = 1 - floor(y / pow(2, x)) % 2
				@result += '<li>' + @createBolean(v) + '</li>'
				record.values[y] = v

			@endCell()
			
	calculateSize: ->
		@size = @list.length
		@formulaWidth = @numOpers * 17 + @size * 13
		@varsWidth = @numVars * 43
		
		@width = Math.max(930, @varsWidth + @formulaWidth)
		@spacer = (@width - @varsWidth) / 2 + 'px'
		@width += 'px'
		
	writeFormula: ->
		@result += '<div class="cell">'
		@createSpacer()
		
		for i, char of @list
				@startCell(char.text)
				
				for y in [0 .. @lines]
					input =if char.operable then @createInput(i) else ''
					@result += '<li>' +  input + '</li>'
				
				@endCell()
		
		@createSpacer()
		@result += '</div>'
		
	createSpacer: ->
		@result += '<div class="cell spacer" style="width:' + @spacer + '"><h1>.</h1><ul>'
		@result += '<li>.</li>'.times(@lines + 1)
		@endCell()
		
	startCell: (header) ->
		@result += '<div class="cell"><h1>' + header + '</h1><ul>'

	createInput: (i) ->
		'<input oninput="parseBolean(this)" onfocus="focusRelations(this)" onblur="clearRelations()" i="' + i + '">'

	createBolean: (n) ->
		if n == 1 then T else F

	endCell: ->
		@result += '</ul></div>'
	
	
	# Connections		
	connectOpers: ->
		for i in [0 .. @size - 1]
			char = @list[i]
			continue unless char.operable
			
			char.a = @getConnection(char, i, 1, 'open')
			char.b = @getConnection(char, i, -1, 'close')
			
	getConnection: (char, start, order, bracket) ->
		start += order
		prio = char.priority + order
		target = @list[start]
		brackets = 0
		i = start

		while target
			if target[bracket]
				brackets++
			else if target.operable
				return target if brackets == 1 or target.priority > prio
				brackets--
				
			i += order
			target = @list[i]

		return @list[start]
		

# Parse Events
parseSyntax = ->
	parser = new Parser(Formula.value)

	if parser.error
		print(parser.error)
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


# Events API
getColumns = ->
	AnswerTable.getElementsByTagName('ul')
	
getOper = (input) ->
	i = input.getAttribute('i')
	AnswerTable.parser.list[i]