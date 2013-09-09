<?php
	if(isset($_POST['name']))
	{
		include("db_connect.php");
		
		if(!$db) 
		{
			echo 'ERROR: Could not connect to the database.';
		} 
		else 
		{	
			$name = $db->real_escape_string($_POST['name']);

			$sql_test = "select * from user where name = '$name'";
			
			$query_test = $db->query($sql_test);
						
			if($query_test) 
			{		
				$existed_name ="";
				while ($result = $query_test ->fetch_object()) {
					$existed_name = $result->id;
				}
				
				if($existed_name == ""){
					$sql = "insert into user(id,name) values(NULL,'$name');";

					$query = $db->query($sql);

					//get recent added id
					$sql_test = "select * from user where name = '$name'";

					$query_test = $db->query($sql_test);

					$userid ="";
					if($query_test) 
					{		
						while ($result = $query_test ->fetch_object()) {
							$userid = $result->id;
						}
					}

					umask(0007);
					$dirName = $userid;
					$pathname = "../files/$dirName";

					if(!is_dir($pathname))
					{	
						mkdir($pathname,0777);
					}

					echo "success";
				}else{
					echo "fail";
				}
			}
		}
		
		$db->close();
	}
	
?>


