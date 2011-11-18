compareVersion = (event) ->
	request = event.currentTarget
	response = request.responseText
	
	if response != ''
		response.onreadystatechange = false
		NewVersion.className = 'display' if response != Version

checkVersion = ->
	return if Online
	client = new XMLHttpRequest()
	client.onreadystatechange = compareVersion
	client.open('GET', 'https://raw.github.com/Jaliborc/Booling/master/Version.txt')
	client.send()

closeVersion = ->
	NewVersion.className = 'fade'