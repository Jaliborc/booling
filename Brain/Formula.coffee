# Input Box
addKey = (board) ->
	if board.altKey
		for operator in Keys
			for code in operator[2] 
				Formula.value = Formula.value.slice(0, -1) + operator[0] if board.keyCode == code
				
autoSyntax = (event) ->	
	for operator in Keys
		for match in operator[1]
			Formula.value = Formula.value.replace(match, operator[0])
		
			
# Keybindings List
addOperator = (operator) ->
	Formula.value += operator.getAttribute('key')
	
fillKeys = ->
	for data in Keys
		[operator, normals, alts] = data
		li = '<li onclick="addOperator(this)" key="' + operator + '">'
		text = li
		
		for i in [0 .. normals.length - 1]
			key = normals[i]
			text += key + ' , '
			normals[i] = new RegExp(escape(key), 'gi')
			
		for key in alts
			text += 'alt-' + String.fromCharCode(key).toLowerCase() + ' , '
		
		OperatorList.innerHTML += li + operator + '</li>'
		KeyList.innerHTML += text.slice(0, -3) + '</li>'