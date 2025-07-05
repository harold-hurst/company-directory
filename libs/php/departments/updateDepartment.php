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

// Prepare update query to update department record
$query = $conn->prepare('UPDATE department SET name = ?, locationID = ? WHERE id = ?');
$query->bind_param(
    'sii',
    $_POST['name'],
    $_POST['locationID'],
    $_POST['id']
);

if (!$query->execute()) {
    $output['status']['code'] = "400";
    $output['status']['name'] = "executed";
    $output['status']['description'] = "update query failed";
    $output['data'] = [];

    mysqli_close($conn);

    echo json_encode($output);
    exit;
}

$output['status']['code'] = "200";
$output['status']['name'] = "ok";
$output['status']['description'] = "success";
$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
$output['data'] = [];

mysqli_close($conn);

echo json_encode($output);
