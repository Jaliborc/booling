<?php

# API
function smallOpen($path, $size){
	$file = fopen($path, 'r');
	$content = fread($file, $size);
	fclose($file);
	return $content;
}

function easyWrite($path, $content){
	$file = fopen($path, 'w');
	fwrite($file, $content);
	fclose($file);
}


# Check if new version is available
$DIR = 'https://raw.github.com/Jaliborc/Booling/master/';
$version = smallOpen($DIR . 'version', 3);
$current = @smallOpen('version', 3);

echo 'GitHub: ' . $version;
echo ' | Server: ' . $current;

if ($version == $current)
	return;
	
	
# Copy Files
$css = file_get_contents($DIR . 'Design/Main.css');
easyWrite('Main.css', $css);

$overview = file_get_contents($DIR . 'Overview/index.html');
easyWrite('Overview/index.html', str_replace('../Design/', '../', $overview));


# Bundle Scripts
$BRAIN = $DIR . 'Brain/';
$Brain = file($BRAIN . 'Compile', FILE_IGNORE_NEW_LINES);
$scripts = '';

foreach($Brain as $file) {
	$scripts = $scripts . file_get_contents($BRAIN . $file);
}


# Inject Code
$scripts = '<script>' . $scripts . '</script>';
$css = '<style media="screen" type="text/css">' . $css . '</style>';

$html = file_get_contents($DIR . 'index.html');
$replace = array();
	
preg_match('/<BUNDLE>[\w\s<>"=\/.]+<\/BUNDLE>/', $html, $replace);
$html = str_replace('VERSION', 'Version ' . $version, $html);
$html = str_replace($replace[0], $css . $scripts, $html);


# Update Manifest
$manifest = file_get_contents($DIR . 'cache.manifest');
$manifest = str_replace('VERSION', 'Version ' . $version, $manifest);


# Save Results
easyWrite('cache.manifest', $manifest);
easyWrite('index.html', $html);
easyWrite('version', $version);
?>