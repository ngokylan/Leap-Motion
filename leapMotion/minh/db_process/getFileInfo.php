
<?php
	session_start();
	if(isset($_SESSION['userid'])&&isset($_POST['attachFiles']))
	{
		include("db_connect.php");
		
		if(!$db) 
		{
			echo 'ERROR: Could not connect to the database.';
		} 
		else 
		{
			$attachFiles = $db->real_escape_string($_POST['attachFiles']);
				
									
			$sql = "select * from socket_file where file_id IN ('$attachFiles')";
			
			$query = $db->query($sql);
				
			if($query) 
			{		
				$info ="";
				while ($result = $query ->fetch_object()) 
				{				
					$info .= $result->activity_file_id.','.$result->activity_id.','.$result->file_id.','.$result->status.";";	
				}
				
				echo $info;
			} 
			else 
			{
				// Dont do anything.
			}
			
		}
		
		
		$db->close();
	}
	else {
		echo "<script type='text/javascript' language='JavaScript'>
					window.location = '../login.php';
			  </script>";
	}
	
?>
