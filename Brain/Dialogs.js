var closeDialogs, listSaved, openSaved, saveAs, saveResult;
listSaved = function() {
  var i, list, numSaves, ul;
  numSaves = localStorage.getItem('numSaves');
  ul = getElement(SavedList, 'ul');
  if ((numSaves != null) > 0) {
    list = '';
    for (i = 1; 1 <= numSaves ? i <= numSaves : i >= numSaves; 1 <= numSaves ? i++ : i--) {
      list += '<li onclick="openSaved(' + i + ')">' + localStorage.getItem('saved' + i);
    }
    ul.innerHTML = list;
  } else {
    ul.innerHTML = NO_SAVES;
  }
  showFrame(SavedList);
  return showFrame(Fader);
};
openSaved = function(i) {
  var data, k, v;
  data = JSON.parse(localStorage.getItem('saved' + i + 'data'));
  Formula.value = data.formula;
  getElement(NewSave, 'input').value = localStorage.getItem('saved' + i);
  localStorage.setItem('lastFormula', data.formula);
  for (k in data) {
    v = data[k];
    localStorage.setItem(k, v);
  }
  showAnswer(true);
  return closeDialogs();
};
saveAs = function() {
  showFrame(NewSave);
  return showFrame(Fader);
};
saveResult = function() {
  var count, data, i, k, name, _ref;
  name = getElement(NewSave, 'input').value;
  if (name === '') {
    return;
  }
  count = Number(localStorage.getItem('numSaves')) || 0;
  data = {
    'formula': localStorage.getItem('formula')
  };
  for (k = 0, _ref = Parsed.size; 0 <= _ref ? k <= _ref : k >= _ref; 0 <= _ref ? k++ : k--) {
    data[k] = localStorage.getItem(k);
  }
  for (i = 1; 1 <= count ? i <= count : i >= count; 1 <= count ? i++ : i--) {
    if (localStorage.getItem('saved' + i) === name) {
      break;
    }
  }
  localStorage.setItem('saved' + i, name);
  localStorage.setItem('saved' + i + 'data', JSON.stringify(data));
  localStorage.setItem('numSaves', Math.max(i, count));
  return closeDialogs();
};
closeDialogs = function() {
  hideFrame(SavedList);
  hideFrame(NewSave);
  return hideFrame(Fader);
};