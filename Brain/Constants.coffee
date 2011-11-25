DEV = true
ANIMATE_TIME = 400

T = '<a class="green">T</a>'
F = '<a class="red">F</a>'
NOT = '¬'

Operators =
	'¬':
		value: (a, b) -> not a
		keys: ['no', '~', '!']
		altKeys: [78]
		priority: 8
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
		value: (a, b) -> not a or b
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
	'Are you going to enter a formula or not? Losing my patience here.'
	'Being bullied? "Just act less gay", advise teachers.'
]