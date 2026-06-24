<?php

// debug:
//ini_set('display_errors', 1);
//error_reporting(E_ALL);

require __DIR__ . '/../vendor/autoload.php';

use App\PackageController;
use App\PackageRepository;
use App\Package;

$pdo = new PDO('sqlite:' . __DIR__ . '/../data/packages.db');

$method = $_SERVER['REQUEST_METHOD'];

$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

//var_dump($path);
//var_dump($method);

$repository = new PackageRepository($pdo);
try {
    $controller = new PackageController($repository);

    switch (true) {
        case $method === "GET" && $path === "/packages":
            echo json_encode($controller->listPackages());
            break;
        case $method === "GET" && (preg_match(
                '#^/packages/(\d+)$#', $path, $matches
            )):
            // $matches[0] = '/packages/11';
            //$matches[1] = '11';
            $id = $matches[1];
//            var_dump($matches);
//            die("reached get id method");
            echo json_encode($controller->getPackage($id));
            break;
        case $method === "DELETE" && (preg_match(
                '#^/packages/(\d+)$#', $path, $matches
            )):
            $id = $matches[1];
            $result = $controller->deletePackage($id);
            http_response_code(204);
            echo json_encode($controller->listPackages());
            break;
        case $method === "POST" && $path === "/packages":
            $body = file_get_contents('php://input');
            $data = json_decode($body, true);
            $package = new Package(
                null,
                $data['name'],
                $data['description'],
                $data['programmingLanguage'],
                $data['repositoryUrl'],
                $data['license']
            );
            http_response_code(201);
            echo json_encode($controller->createPackage($package));;
            break;
        case $method === "PUT"  && (preg_match(
                '#^/packages/(\d+)$#', $path, $matches
            )):
            $body = file_get_contents('php://input');
            $data = json_decode($body, true);
            $id = $matches[1]; //use PUT params as source of truth
            $package = new Package(
                $id,
                $data['name'],
                $data['description'],
                $data['programmingLanguage'],
                $data['repositoryUrl'],
                $data['license']
            );
            $id = $matches[1];
            $result = $controller->updatePackage($package);
            echo json_encode($controller->listPackages());
            break;
        default:
            http_response_code(404);
            echo json_encode(["error" => "Route not found."]);
            break;
    }


} catch (RuntimeException $e) {
    http_response_code(500);
    echo json_encode([
        "error" => $e->getMessage()
    ]);
}