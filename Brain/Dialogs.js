var closeDialogs, listSaved, saveAs;
listSaved = function() {
  showFrame(SavedList);
  return showFrame(Fader);
};
saveAs = function() {
  showFrame(NewSave);
  return showFrame(Fader);
};
closeDialogs = function() {
  hideFrame(SavedList);
  hideFrame(NewSave);
  return hideFrame(Fader);
};