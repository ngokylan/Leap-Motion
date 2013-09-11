<?php
	if(isset($_POST['userid']))
	{
		include("db_connect.php");
		
		if(!$db) 
		{
			echo 'ERROR: Could not connect to the database.';
		} 
		else 
		{	
			$json_string = $_POST["json"]; //the same variable key we sent it in

			//$t = preg_replace('/\s+/', '', $json_string);// clear blank code
			//$t=str_replace('},]',"}]",$json_string);
			//$json_string = str_replace('&quot;', '"', $json_string);
			
			$encoding = mb_detect_encoding($json_string);
			//if($encoding == 'UTF-8') {
			//$json_string = preg_replace('/[^(\x20-\x7F)]*/','', $json_string);    
			$json_string = preg_replace('/([^0-9\.,]+)/', '', $json_string);
			$json_string = stripslashes(str_replace('\"', '"', $json_string));
			//}  
			//var_dump($json_string);

			$json_obj = json_decode(str_replace ('\"','"', $json_string), true, 9);

			$userid = $db->real_escape_string($_POST['userid']);

			$sql_test = "select * from user where id = '$userid'";
			
			$query_test = $db->query($sql_test);
						
			if($query_test) 
			{		
				$existed_id ="";
				while ($result = $query_test ->fetch_object()) {
					$existed_id = $result->id;
				}
				
				if($existed_id != ""){//check if exist user id before inserting 

					//save json object into file
					if ($json_obj != null) { /* sanity check */

						try {
    						//file location
							$file_url = "../files/".$userid."/".$created_date;

							$file = fopen($file_url,'w+');
							fwrite($file, $json_obj);
							fclose($file);

							date_default_timezone_set('Australia/Melbourne');
							$created_date = date('d/m/Y-H:i:s', time());
							$created_date .= "-". $userid;

							$sql = "insert into testing_files(id,url,created_date,userid) values(NULL,'$created_date', NULL, '$userid');";

							$query = $db->query($sql);
							var_dump(json_last_error());

							echo "success";
						} catch (Exception $e) {
							echo 'Caught exception: ',  $e->getMessage(), "\n";
						}
					} else {
   					  // handle error 
						echo "fail to store record file";
					}
						
				}else{
					echo "fail";
				}
			}
		}
		
		$db->close();
	}
	
?>


