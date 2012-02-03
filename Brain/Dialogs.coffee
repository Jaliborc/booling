listSaved = ->
	showFrame(SavedList)
	showFrame(Fader)
	
saveAs = ->
	showFrame(NewSave)
	showFrame(Fader)
	
closeDialogs = ->
	hideFrame(SavedList)
	hideFrame(NewSave)
	hideFrame(Fader)