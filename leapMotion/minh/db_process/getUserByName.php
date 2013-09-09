
<?php
	session_start();		
	if(isset($_SESSION['userid'])&&isset($_POST['username']))
	{
		include("db_connect.php");
		if(!$db) 
		{
			echo 'ERROR: Could not connect to the database.';
		} 
		else 
		{
			$channel_id = $_SESSION['channel_id'];	
			$currentUser = 	$_SESSION['userid'];		
			$searchForName = $_POST['username'];	
			$sql = "select u1.user_id, u1.username, u1.status from socket_user u1
					where u1.user_id <> '$currentUser'
					and u1.username like '%$searchForName%'
					UNION
					select  u2.user_id, u2.username, u2.status from socket_user u2
					where u2.user_id = '$currentUser'";
			
			$query = $db->query($sql);
									
			if($query) 
			{
				$html_return = "";		
				$sender_name = "";
				$firstname = "";
				$lastname = "";
				$status = "";
				$statusDescription = "";
				$friendName = "";
				$html_return = "";
				while ($result = $query ->fetch_object()) 
				{					
						
					if($result->user_id == $currentUser)
					{
						$sender_name = $result->username;
					}
					
					if($result->username == $searchForName)		
					{
						
						if(strpos($result->username, " "))
						{
							$name = explode(" ", $result->username);
							$firstname = $name[0];
							$lastname = $name[1];
						}
						else
						{
							$firstname = $result->username;
						}
						
						
						//****************************************
						//get user friendship status
						
						$sqlstatus = "select f1.friendship_id, f1.user_id,f1.status from socket_friendlist f1
								 where f1.user_id = '$currentUser'
								 and f1.friendship_id = (select f2.friendship_id 
								 					  from socket_friendlist f2 
								 					  where f2.user_id = '$result->user_id');";
								 					  
						if($queryCheck = $db->query($sqlstatus)) 
						{
							if($queryCheck->num_rows > 0)	//indicates that the relationship has been set
							{
								while ($resultCheck = $queryCheck ->fetch_object()) 
								{
									if($resultCheck->status == "friend")
									{
										$statusDescription = "friend";
										$status = "<span class='label label-success'>Online</span>";	//indicates that the relationship has already connected
									}
									if($resultCheck->status == "send")
									{
										$statusDescription = "send";
										$status = "<span class='label label-warning'>Sent</span>";	//indicates that the friend request already sent
									}
									
									if($resultCheck->status == "pending")
									{
										$statusDescription = "pending";
										$status = "<span class='label label-warning'>Pending</span>";	//indicates that friend request is waiting for response
									}
								}
							} 
						}
						
						//****************************************
																		
						$friendName = $result->username;						
					}	

					
				}
				
				
				if($statusDescription == "" && $firstname != "" && $lastname != "")	// there is no relationship
					{
						$html_return .= "<tr>
									<td>$firstname</td>
									<td>$lastname</td>
									<td>None</td>
									<td>
										<span class='actionButton'>
											<a onclick=\"sendFriendRequest('$friendName','$channel_id','$sender_name');\" class='btn icon-plus-sign' alt='Add to your circle' title='Add to your circle'></a>
										</span>
									</td>
								</tr>";
					}	
				elseif($statusDescription != "" && $firstname != "" && $lastname != "")
					{
						$html_return .= "<tr>
									<td>$firstname</td>
									<td>$lastname</td>
									<td>$status</td>
									<td>										
									</td>
								</tr>";
					}	
				
							
				echo $html_return;
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
