<?php
#include 'Bundler.php';

header('Content-type: application/html');
header('Content-Disposition: attachment; filename="Booling"');
readfile('Offline.html');
?>