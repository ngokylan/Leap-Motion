<?php
	if(isset($_POST['action']))
	{
		include("db_connect.php");
		if(!$db) 
		{
			echo 'ERROR: Could not connect to the database.';
		} 
		else 
		{					
			date_default_timezone_set('Australia/Melbourne');
			
			$sql = "select u.id, u.name, f.url, f.created_date from user u left join testing_files f on u.id = f.userid";
			
			$query = $db->query($sql);
			$return_array = array();
						
			if($query) 
			{		
				while ($result = $query ->fetch_object()) 
				{			
					$user_array = array();
						
					$user_array[] = $result->id;
					$user_array[] = $result->name;

					$url = "files/".$result->id."/".$result->url;
					$user_array[] = "<a href='".$url."'>".$result->url ."</a>";

					$created_date = $result->created_date;
					$created_date = strtotime($created_date);
                    $created_date = date('d/m/Y H:i:s', $created_date);

                    $user_array[] = $created_date;

                    $return_array[] = $user_array;
				}
				
				$user_object = json_encode($return_array);
				echo $user_object;
			} else 
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
