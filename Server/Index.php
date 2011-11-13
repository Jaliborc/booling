<?php
function smallOpen($path, $size){
	$file = fopen($path, 'r');
	$content = fread($file, $size);
	fclose($file);
	return $content;
}

# Check for New Version
$DIR = '../';
$version = smallOpen($DIR . 'Version.txt', 2);

if ($version == '0' or $version != @smallOpen('Version.txt', 2))
	include 'Bundler.php';

# Output WebApp
readfile('Bundled.html');
?>