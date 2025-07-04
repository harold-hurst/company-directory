<?php

// ini_set('display_errors', 'On');
// error_reporting(E_ALL);

$executionStartTime = microtime(true);

require_once("../../../dbconfig.php");
$conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname);

header('Content-Type: application/json; charset=UTF-8');

if (mysqli_connect_errno()) {

	$output['status']['code'] = "300";
	$output['status']['name'] = "failure";
	$output['status']['description'] = "database unavailable";
	$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
	$output['data'] = [];

	mysqli_close($conn);

	echo json_encode($output);

	exit;
}

// SQL statement accepts parameters and so is prepared to avoid SQL injection.
// $_REQUEST used for development / debugging. Remember to change to $_POST for production

// $query = $conn->prepare('SELECT id, name, locationID FROM department WHERE id =  ?');

$query = $conn->prepare('SELECT d.id, d.name, d.locationID, l.name AS location
FROM department d
LEFT JOIN location l ON l.id = d.locationID
WHERE d.id = ?');

$query->bind_param("i", $_REQUEST['id']);

$query->execute();

if (false === $query) {

	$output['status']['code'] = "400";
	$output['status']['name'] = "executed";
	$output['status']['description'] = "query failed";
	$output['data'] = [];

	echo json_encode($output);

	mysqli_close($conn);
	exit;
}

$result = $query->get_result();

$data = [];

while ($row = mysqli_fetch_assoc($result)) {

	array_push($data, $row);
}

$output['status']['code'] = "200";
$output['status']['name'] = "ok";
$output['status']['description'] = "success";
$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
$output['data'] = $data;

echo json_encode($output);

mysqli_close($conn);
