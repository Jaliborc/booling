<?php

# Read/Write Functions
function easyOpen($path){
	return smallOpen($path, filesize($path));
}

function easyWrite($path, $content){
	$file = fopen($path, 'w');
	fwrite($file, $content);
	fclose($file);
}


# Bundle Files
$Brain = array('Constants', 'Utility', 'Answers', 'Formula', 'Main');
$BrainDir = $DIR . 'Brain/';
$scripts = '';
	
foreach ($Brain as &$file)
	$scripts = $scripts . easyOpen($BrainDir . $file . '.js');


$css = '<style media="screen" type="text/css">' . easyOpen($DIR . 'Style/Main.css') . '</style>';
$scripts = '<script>' . $scripts . 'var Online = true;</script>';
	
$html = easyOpen($DIR . 'Booling.html');
$replace = array();
	
preg_match('/<BUNDLE>[\w\s<>"=\/.]+<\/BUNDLE>/', $html, $replace);
$html = str_replace($replace[0], $css . $scripts, $html);


# Save Stuff
easyWrite('Bundled.html', $html);
easyWrite('Version.txt', $version);
?>