# Input Box
autoSyntax = (board) ->
	value = Formula.value
	
	if board.altKey
		for operator in Keys
			for code in operator[2] 
				value = value.slice(0, -1) + operator[0] if board.keyCode == code

	for operator in Keys
		for match in operator[1]
			value = value.replace(match, operator[0])
			
	Formula.value = value if value != Formula.value
			
initFormula = ->
	Formula.value = localStorage?.getItem('formula') or ''
	Formula.placeholder = random(Placeholders)
		
saveFormula = ->
	localStorage?.setItem('formula', Formula.value)
		
			
# Keybindings List
addOperator = (operator) ->
	Formula.value += operator.getAttribute('key')
	
fillKeys = ->
	for data in Keys
		[operator, normals, alts] = data
		li = '<li onclick="addOperator(this)" key="' + operator + '">'
		text = li
		
		for i, key of normals
			key = normals[i]
			text += key + ' , '
			normals[i] = new RegExp(escape(key), 'gi')
			
		for key in alts
			text += 'alt-' + String.fromCharCode(key).toLowerCase() + ' , '
		
		OperatorList.innerHTML += li + operator + '</li>'
		KeyList.innerHTML += text.slice(0, -3) + '</li>'