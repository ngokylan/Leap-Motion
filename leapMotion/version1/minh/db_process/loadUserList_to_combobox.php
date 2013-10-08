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
			
			$sql = "select * from user";
			
			$query = $db->query($sql);
			$return_array = array();
						
			if($query) 
			{		
				while ($result = $query ->fetch_object()) 
				{			
					$user_array = array();
					$id = $result->id;
					$name = $result->name;
					$user_array[] = "<option value='$result->id'>$name</option>";

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
?>
