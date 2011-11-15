<?php
include 'bundler.php';
header('Content-type: application/html');
header('Content-Disposition: attachment; filename="Booling.html"');
readfile('Offline.html');
?>