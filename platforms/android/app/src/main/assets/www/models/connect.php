<?php

class connect{

	private $host;
	private $user;
	private $pass;
	private $db;
	public $conn;
	
	
	function __construct(){
		$this->host="localhost";
		$this->user="root";
		$this->pass="";
		$this->db="dot";
						
		connect::connect(); // $this->connect();
	}
	
	function connect(){
		header("Access-Control-Allow-Origin: *");
		$this->conn = mysqli_connect($this->host,$this->user,$this->pass,$this->db);
		if( mysqli_connect_errno($this->conn)){ 
			echo "Error connecting to MySQL Server".mysqli_connect_error();
		}	
	}
	
	function query($sql){		
		return mysqli_query($this->conn,$sql);
	}
	
	

}

?>