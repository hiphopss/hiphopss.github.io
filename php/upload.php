<?php

function Redirect($url, $statusCode = 303){
   header('Location: ' . $url, true, $statusCode);
   die();
}

// $timestamp = date("ymdHis");
$timestamp = '';
$filename = '';

// A list of permitted file extensions
// $allowed = array('png', 'jpg', 'gif','zip', 'tif', 'tiff');
$allowed = array('wav','mp3','aac','ogg');

if(isset($_FILES['upl']) && $_FILES['upl']['error'] == 0){

	$extension = pathinfo($_FILES['upl']['name'], PATHINFO_EXTENSION);

	if(!in_array(strtolower($extension), $allowed)){
		echo '{"status":"error"}';
		exit;
	}
	if(move_uploaded_file($_FILES['upl']['tmp_name'], '../uploads/'.$timestamp.' - '.$_FILES['upl']['name'])){
		
		$filename .= $timestamp.' - '.$_FILES['upl']['name'];
		// shell_exec('python py/separate_dsd.py -i uploads/'.$filename.' -m py/models/model_hh_fft_1024.pkl -o uploads/');
		echo '{"status":"success", file: "'.$filename.'"}';
		// Redirect('../mixer.html',304); // REDIRECTION NOT WORKING
	}
}
echo '{"status":"error"}';
exit;
?>