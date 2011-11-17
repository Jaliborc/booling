# Character Types
class Char
	constructor: (@text) ->
		@type = @getType()
		this[@type] = true
			
	getType: ->	
		if @text == ' '
			'ignore'
		else if @text == '('
			'open'
		else if @text == ')'
			'close'
		else if 65 <= @text.charCodeAt(0) <= 122
			'char'
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
			close: 'EMPTY BRACKET'
		close:
			oper: 'MISSING VAR'
			open: 'MISSING OPER'
	
	constructor: (@formula) ->
		size = @formula.length
		last = false
		brackets = 0
		
		@list = []
		@vars = {}
		
		for i in [0 .. size - 1]
			char = new Char(@formula.charAt(i))
			continue if char.ignore
			
			@error = @parseChar()
			return if @error
			
			@list.push(char)
			@last = char
			
		if @brackets != 0
			return @error = 'NUM BRACKETS'
	
	
# Trigger
toBolean = (n) ->
	if n == 0 then T else F

parseSyntax = ->
	parser = new Parser(Formula.value)
	
	if parser.error
		print(parser.error)
	else
		print(parser.result)