<?php

$files = array(' - bass.wav', ' - drums.wav', ' - other.wav', ' - vocals.wav');

$zipname = time().".zip"; // Zip name
$zip = new ZipArchive();
$zip->open("../downloads/".$zipname,  ZipArchive::CREATE);
foreach ($files as $file) {
  echo $path = "../uploads/".$file;
  if(file_exists($path)){
  	$zip->addFile($path);
  }
  else{
  	echo"file does not exist";
  }
}
$zip->close();

header('Content-Type: application/zip');
header('Content-disposition: attachment; filename='.$zipname);
header('Content-Length: ' . filesize("../downloads/".$zipname));
readfile("../downloads/".$zipname);
exit;