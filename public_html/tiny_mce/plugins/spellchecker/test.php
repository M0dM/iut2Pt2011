<?php




/* TEST FILE. QUICK SYSTEM CHECK */
ini_set("max_execution_time", "36000");
ini_set("memory_limit", "128M");
session_start();
?>

<h1>Welcome to quick system test.</h1>
<ul>
	<li><a href="test.php?type=info">PHP Info</a></li>
	<li><a href="test.php?type=copy">Copy test file</a></li>
	<li><a href="test.php?type=curl">Open Yahoo.com - CURL()</a></li>
	<li><a href="test.php?type=fopen">Open Yahoo.com - FOPEN()</a></li>
	<li><a href="test.php?type=list">List all files in main folder</a></li>
	<li><a href="test.php?type=session">Session check</a></li>
</ul>
<hr />
<?php
$type=$_GET['type'];

switch ($type) { 
	
    case 'info':
		echo phpinfo();
	break;
	
	case 'copy':
	
		if(copy('test.php','test-copied.php'))
			echo 'SUCCESS. File "test.php" copied to "test-copied.php"';
		else 
			echo 'ERROR. File "test.php" not copied to "test-copied.php"';
			
	break;
	
	case 'curl':
	
		$ch = curl_init();
		curl_setopt ($ch, CURLOPT_URL, "http://www.yahoo.com");
		curl_setopt ($ch, CURLOPT_HEADER, 0);
		$buffer = curl_exec($ch);
		curl_close($ch);
		
		echo $buffer;
		
	break;
	
	case 'fopen':
	
		$link = fopen('http://www.yahoo.com', 'r');
			
		if($link){
		$buffer= "";
		while(!@feof($link)) { 
			$buffer .= @fgets($link, 4096);
		}
		echo $buffer;
		}

	break;
	
	case 'list':
	
		$tplDir='./';
		if ($p_menu = opendir($tplDir)) {
			
			while (false !== ($files = readdir($p_menu))){
				if ($files != "." && $files != "..") {
					echo $files.'<br />';
				} 
			}
		closedir($p_menu); 
		}
		
	break;
	
	case 'session':
	
		if(!isset($_SESSION['test123'])) $_SESSION['test123']=0;
		$_SESSION['test123']++;
		
		echo 'Session counter: '.$_SESSION['test123'].'<br />Refresh screen now, number shold increase.';
	
	break;
}

?>