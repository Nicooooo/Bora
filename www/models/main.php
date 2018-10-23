
<?php


class main{

	function display(){


	}


}

include "connect.php";
include "events.php";

$main = new main();
$events = new events();

if(isset($_GET['req'])){
		switch($_GET['req']){
				case 'retrieve':
				$events -> retrieve();
				break;


				case 'signup':
				$events -> signup();
				break;


				case 'login':
				$events -> login();
				break;

				case 'retrieve2':
				$events -> retrieve2();
				break;

				case 'things':
				$events -> retrieve3();
				break;

			}


		}

?>

