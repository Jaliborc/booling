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


# Copy Pages
function copyPage($path){
	global $DIR;
	$page = file_get_contents($DIR . $path);
	easyWrite($path, str_replace('../Design/', '../', $page));
}

copyPage('overview.html');
copyPage('about.html');
	
	
# Copy Files
function copyFile($origin, $target){
	global $DIR;
	$file = file_get_contents($DIR . $origin);
	easyWrite($target, $file);
	return $file;
}

$css = copyFile('Design/Main.css', 'Main.css');
copyFile('Server/Downloader.php', 'downloader.php');
copyFile('Server/Bundler.php', 'bundler.php');


# Bundle Scripts
$BRAIN = $DIR . 'Brain/';
$Brain = file($BRAIN . 'Compile', FILE_IGNORE_NEW_LINES);
$scripts = '';

foreach($Brain as $file) {
	$scripts = $scripts . file_get_contents($BRAIN . $file);
}

easyWrite('tempScript.js', $scripts);
$scripts = file_get_contents("http://www.marijnhaverbeke.nl/uglifyjs?code_url=http://www.jaliborc.com/Booling/tempScript.js");


# Inject Code
$css = '<style media="screen" type="text/css">' . $css . '</style><script>';
$scripts = $scripts . '</script>';

$html = file_get_contents($DIR . 'index.html');
$replace = array();
	
preg_match('/<BUNDLE>[\w\s<>"=\/.]+<\/BUNDLE>/', $html, $replace);
$html = str_replace('VERSION', 'Version ' . $version, $html);
$online = str_replace($replace[0], $css . $scripts, $html);
$offline = str_replace($replace[0], $css . 'DOWNLOAD=true;' . $scripts, $html);


# Update Manifest
$manifest = file_get_contents($DIR . 'cache.manifest');
$manifest = str_replace('VERSION', 'Version ' . $version, $manifest);


# Save Results
easyWrite('cache.manifest', $manifest);
easyWrite('offline.html', $offline);
easyWrite('index.html', $online);
easyWrite('version', $version);
?>