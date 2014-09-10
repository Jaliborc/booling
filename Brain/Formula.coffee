###
	2011- 2014 João Cardoso (jaliborc.com)
###

#Startup
showFormula = ->
	localStorage.setItem('state', 'formula')
	switchFrames(AnswerSection, FormulaSection, ->
		AnswerSection.style.width = '1px'
		AnswerTable.innerHTML = ''
	)
	
initFormula = ->
	Formula.value = localStorage.getItem('formula') or ''
	Formula.placeholder = random(Placeholders)
	

# Input Box
autoSyntax = (board) ->
	value = Formula.value
	Overlay.innerHTML = ''
	Error.className = 'hide'
	
	if board.altKey
		for operator, data of Operators
			for code in data.altKeys 
				value = value.slice(0, -1) + operator if board.keyCode == code

	for operator, data of Operators
		for match in data.keys
			value = value.replace(match, operator)
			
	if value != Formula.value
		Formula.value = value 
		saveFormula()
		
saveFormula = ->
	localStorage?.setItem('formula', Formula.value)
		
			
# Keybindings List
addOperator = (operator) ->
	Formula.value += operator.getAttribute('key')
	
fillKeys = ->
	for operator, data of Operators
		li = '<li onclick="addOperator(this)" key="' + operator + '">'
		keys = data.keys
		text = li
		
		for i, key of keys
			keys[i] = new RegExp(key.escape(), 'gi')
			text += key + ' , '
			
		for code in data.altKeys 
			text += 'alt-' + String.fromCharCode(code).toLowerCase() + ' , '
		
		OperatorList.innerHTML += li + operator + '</li>'
		KeyList.innerHTML += text.slice(0, -3) + '</li>'