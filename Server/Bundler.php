<?php

# Check if new version is available
$DIR = 'https://raw.github.com/Jaliborc/Booling/master/';
$version = smallOpen($DIR . 'Version.txt', 2);

function smallOpen($path, $size){
	$file = fopen($path, 'r');
	$content = fread($file, $size);
	fclose($file);
	return $content;
}

if ($version != '0' and $version == @smallOpen('Version.txt', 2))
	return;


# Bundle Scripts
$BRAIN = $DIR . 'Brain/';
$Brain = file($BRAIN . 'Compile.txt', FILE_IGNORE_NEW_LINES);
$scripts = '';

foreach($Brain as $file) {
	$scripts = $scripts . file_get_contents($BRAIN . $file);
}


# Inject Code
$css = '<style media="screen" type="text/css">' . file_get_contents($DIR . 'Style/Main.css') . '</style>';
$scripts = '<script>var Version="' . $version . '";' . $scripts . '</script>';
	
$html = file_get_contents($DIR . 'Booling.html');
$replace = array();
	
preg_match('/<BUNDLE>[\w\s<>"=\/.]+<\/BUNDLE>/', $html, $replace);
$html = str_replace($replace[0], $css . $scripts, $html);

$online = str_replace('Online = false;', 'Online = true;', $html);
$offline = str_replace('Online = true;', 'Online = false;', $html);


# Save Result
function easyWrite($path, $content){
	$file = fopen($path, 'w');
	fwrite($file, $content);
	fclose($file);
}

easyWrite('Online.html', $online);
easyWrite('Offline.html', $offline);
easyWrite('Version.txt', $version);

?>