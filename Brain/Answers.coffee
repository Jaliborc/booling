toBolean = (n) ->
	return (if n == 0 then T else F)
	
	
# Character Object
class Char
	constructor: (@text) ->
		if @text == ' '
			return @ignore = true
			
		else if @text == '('
			@openBrack = true
			
		else if @text == ')'
			@endBrack = true
			
		else if @isVariable()
			@isVar = true
			
		else if @isOperator()
			@isNot = (@text == NOT)
			@isOper = true
			
	isVariable: ->
		return 65 <= @text.charCodeAt(0) <= 122
					
	isOperator: ->
		for operator in Keys
			return true if @text == operator[0]


# Parser Object
class Parser
	constructor: (@formula) ->
		@size = @formula.length
		@brackets = 0
		@last = false
		@list = []
		@vars = {}
		
		for i in [0 .. @size - 1]
			@char = new Char(@formula.charAt(i))
			continue if @char.ignore
			
			@i = i
			@error = @parseChar()
			return if @error
			
			@list.push(char)
			@last = char
			
		if @brackets != 0
			return @error = 'NUM BRACKETS'
		
			
	parseChar: () ->
		if @char.isVar
			@vars[char] = true
			return 'DOUBLE VAR' if @last.isVar
			return 'END BRACK -> VAR' if @last.endBrack
			
		else if @char.isOper
			return 'DOUBLE OPER' if not @char.isNot and @last.isOper
			return 'OPEN BRACK -> OPER' if @last.openBrack
			
		else if @char.openBrack
			@brackets += 1
			return 'VAR -> OPEN BRACK' if @last.isVar
			return 'EMPTY BRACKET' if @last.endBrack
			
		else if @char.endBrack
			@brackets -= 1
			return 'OPER BRACKET' if @last.isOper
			return 'DOUBLE BRACKET' if @last.openBrack
			return 'NUM BRACKETS' if @brackets < 0
			
		else
			return 'UNKNOWN'
	
	
# Trigger
parseSyntax = ->
	parser = new Parser(Formula.value)
	
	if parser.error
		print(parser.error)
	else
		print(parser.result)