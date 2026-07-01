<?php

require __DIR__ . '/../vendor/autoload.php';

header("Content-Type: application/json");

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// only for development, remove thereafter
header("Access-Control-Allow-Origin: *");

use App\PackageController;
use App\PackageRepository;
use App\Package;
use App\Router;

$pdo = new PDO('sqlite:' . __DIR__ . '/../data/packages.db');

$method = $_SERVER['REQUEST_METHOD'];

$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);



$repository = new PackageRepository($pdo);
try {
    $controller = new PackageController($repository);

//    var_dump($_SERVER['REQUEST_METHOD']);
//    var_dump(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
//    die();

    $router = new Router($controller);
    $router->handle($_SERVER['REQUEST_METHOD'], parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));

} catch (RuntimeException $e) {
    http_response_code(500);
    echo json_encode([
        "error" => $e->getMessage()
    ]);
}