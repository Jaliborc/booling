ANIMATE_TIME = 400
NO_SAVES = '<li class="error">No tables have been recorded so far.'
T = '<li class="green">T</li>'
F = '<li class="red">F</li>'
NOT = '¬'

Operators =
	'¬':
		value: (a, b) -> not a
		keys: ['no', '~', '!']
		altKeys: [78]
	'∧':
		value: (a, b) -> a and b
		keys: ['and', '^']
		altKeys: [65, 73]
		priority: 6
	'∨':
		value: (a, b) -> a or b
		keys: ['or', 'union']
		altKeys: [79, 85]
		priority: 4
	'→':
		value: (a, b) -> not b or a
		keys: ['then', '->']
		altKeys: [84]
		priority: 2
	'↔':
		value: (a, b) -> a is b
		keys: ['is', 'equal', 'same', '=']
		altKeys: [73, 69]
		priority: 0

Placeholders = [
	'Enter a formula or prepare for humiliation...'
	"Enter a formula. You don't want to see me bored..."
	'Are you going to enter a formula? Losing my patience here.'
	'Being bullied? "Just act less gay", advise teachers.'
]

ErrorTitle =
	'SHORT' : 'TOO SHORT!'
	'TWO VAR': 'TWO VARIABLES!'
	'TWO OPER': 'TWO OPERATORS!'
	'MISS OPER': 'NO OPERATOR!'
	'MISS VAR': 'NO VARIABLE!'
	'NUM BRACKETS': 'UNCLOSED BRACKETS!'
	'EMPTY BRACKET': 'EMPTY BRACKETS!'

Errors =
	'SHORT' : [
		"I can’t make anything with just one character. Are you too lazy to type more?<br><br>OR ARE YOU A WEAKLING!?"
		"Do you happen to be a chicken? Only chicken can’t type more than one tiny character.<br><br>Start typing! NOW!"
		"What are you doing? Trying to get me mad... one character won’t lead us anywhere!<br><br>Remember I know where YOU live."
	]
	'TWO VAR': [
		"Are you trying to write your mama's name?! Why else would you be typing two letters?<br><br>I DO NOT like mama's boys!"
		"Why are those two next to each other? Trying to send your mama a message?<br><br>I DO NOT like mama's boys!"
	]
	'TWO OPER': [
		"Hey, you jackass! There must be a variable between those two.<br><br>Got it? Or would you like a better explanation?"
		"What are you doing? You really are a piece of trash!<br><br>Put a variable between those two, or I'll put MY FIST into YOUR ASS!"
	]
	'MISS OPER':[
		"There must be an operator between those two!<br><br>Trying to get me mad? You are NOT worth it!"
	]
	'MISS VAR':[
		"Hey, you jackass! There must be a variable between those two.<br><br>Got it? Or would you like a better explanation?"
		"What are you doing? You truly are a piece of trash!<br><br>Put a variable between those two, or I'll put MY FIST into YOUR ASS!"
	]
	'NUM BRACKETS': [
		"Kid, are you still in grade school? The number of brackets DO NOT match.<br><br>Maybe, if I treat you like a square, you'll become one..."
		'Do you know how to count? Check the number of brackets!<br><br>Math is for squares, but pissing me of is suicidal.'
	]
	'EMPTY BRACKET': [
		"You're just one step closer of getting a broken nose.<br><br>Why is there NOTHING between those brackets?!"
		"What are those two lonely brackets doing there? Are they your imaginary friends?<br><br>You are spiking my imagination... Wanna SEE it?"
	]