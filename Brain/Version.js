var checkVersion, closeVersion, compareVersion;
compareVersion = function(event) {
  var request, response;
  request = event.currentTarget;
  response = request.responseText;
  if (response !== '') {
    response.onreadystatechange = false;
    if (response !== Version) {
      return NewVersion.className = 'show';
    }
  }
};
checkVersion = function() {
  var client;
  if (Online) {
    return;
  }
  client = new XMLHttpRequest();
  client.onreadystatechange = compareVersion;
  client.open('GET', 'https://raw.github.com/Jaliborc/Booling/master/Version.txt');
  return client.send();
};
closeVersion = function() {
  return NewVersion.className = 'fade';
};