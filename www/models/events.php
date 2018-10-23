<?php

class events extends connect{
	
	function retrieve(){
			$data=array();
			$result = $this -> query("Select * from user");
					while ($row=mysqli_fetch_object($result)){
					 $data[]=$row;
					}
			echo json_encode($data);
	}

	function signup(){
		 $user=$_POST['user'];
		 $pass=$_POST['pass'];
		 $result = $this -> query("INSERT INTO `user` (`email`,`password`) VALUES ('$user','$pass')");
	}

	function login(){
		$data = array();
		 $user=$_POST['user'];
		 $pass=$_POST['pass'];
		 // exit();
		 $result = $this -> query("Select email from user WHERE email = 'nics' and password = 'nics'");	
		 while($row = mysqli_fetch_array($result)){

		 		$data['email'] = $row['email'];
		 		// window.localStorage.setItem('session', 'nicooooo');
		 		// echo '<script> console.log($row);</script>';
			}
			echo json_encode($data);
	}

	function retrieve2(){
			$loc = $_GET["locations"];
			$data=array();
			$result = $this -> query("Select * from location where name = '$loc' ");
					while ($row=mysqli_fetch_object($result)){
					$data[] = $row;
					
					}
			echo json_encode($data);
	}

	function retrieve3(){
			$type = $_GET['type'];
			$data=array();
			$result = $this -> query("Select * from location where loc_type = '$type' ");
					while ($row=mysqli_fetch_object($result)){
					$data[] = $row;
					
					}
			echo json_encode($data);
	}

}






?>