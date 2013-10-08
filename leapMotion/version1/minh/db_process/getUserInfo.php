
<?php
	session_start();		
	if(isset($_SESSION['userid'])&&isset($_POST['friendChannel']))
	{
		include("db_connect.php");
		if(!$db) 
		{
			echo 'ERROR: Could not connect to the database.';
		} 
		else 
		{
			$currentUserid = $_SESSION['userid']; 						
			$friendChannel = $db->real_escape_string($_POST['friendChannel']);
			
			
			
			$sql = "select u.user_id, u.username, c.channel_name from socket_user u, socket_user_channels uc, socket_channels c
							 where u.user_id = uc.user_id
							 and c.channel_id = uc.channel_id
							 and uc.channel_id = '$friendChannel'";
			
			$query = $db->query($sql);
						
			if($query) 
			{		
				$candidateName ="";
				while ($result = $query ->fetch_object()) 
				{
					//*********************important***************************8
					// we will change it in future to store the entire current login user friend list in local javascript variable rather check at server which cost bandwidth
					///check if user login user is friend
					$sqlcheck = "SELECT f.user_id, u.username, f.status
						FROM socket_friendlist f, socket_user u
						where f.friendship_id IN (select f2.friendship_id 
												  from socket_friendlist f2 
												  where f2.user_id = '$currentUserid') 
					    AND f.user_id != '$currentUserid' 
					    AND f.status <> 'pending' 
					    AND u.user_id = f.user_id;";
					$queryCheck = $db -> query($sqlcheck);
		
					if ($queryCheck -> num_rows > 0)
					{
						$isFriend = false;
						while ($resultCheck = $queryCheck ->fetch_object()) 
						{
							if($resultCheck -> user_id == $result->user_id)	//display if other recent online user is in a friend
							{
								if($resultCheck->status == "friend") //display if status if friend
									echo $result->user_id.",".$result->username.",".$result->channel_name;	
							}
						}
					}
				}
				
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
