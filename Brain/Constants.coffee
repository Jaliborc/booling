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

Errors =
	'SHORT' : [
		"I can't make anything with just one character. Are you too lazy to type more? ARE YOU A WEAKLING!?"
		"Do you happen to be a chicken? Only chickens can't type more than a single character."
		"Kid, type more than one character or this ain't go anywhere. And you do not want to see me bored..."
		"Are you trying to get me mad? Type more than one character! NOW!!"
	]
	'DOUBLE VAR': [
		"Are you trying to write your momma's name?! Why else would you be typing two letters in a row?"
		"Why on earth are those two next to each other? Trying to send your momma a message?"
		"Hey jackass, there must be an operator between those two. Got it?"
	]
	'DOUBLE OPER': [
		"Hey jackass, there must be a variable between those two. Got it?"
		"WHAT ARE YOU DOING!?"
	]
	'MISSING OPER':[
		"Hey jackass, there must be an operator between those two. Got it?"
	]
	'MISSING VAR':[
		"Hey jackass, there must be a variable between those two. Got it?"
	]
	'NUM BRACKETS': [
		"Kid, are you still in grade school? 'Cause the number of brackets do not match."
		'Do you know how to count, or should I "teach" you? Check the number of brackets.'
	]
	'EMPTY BRACKET': [
		"You're just one step closer of getting a broken nose. Why is there nothing between those brackets?!"
		"What are those two lonely brackets doing there? Are they your imaginary friends?"
	]