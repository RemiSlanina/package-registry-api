<?php

// debug:
//ini_set('display_errors', 1);
//error_reporting(E_ALL);

require __DIR__ . '/../vendor/autoload.php';

use App\PackageRepository;
use PDO;

$pdo = new PDO('sqlite:' . __DIR__ . '/../data/packages.db');

$repository = new PackageRepository($pdo);

$packages = $repository->findAll();

header('Content-Type: application/json');

echo json_encode($packages);

/*$stmt = $pdo->query("SELECT * FROM packages");
$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($rows);*/

/*

echo "\n";
echo "\n";echo "\n";echo "\n";

header('Content-Type: application/json');

echo json_encode([
    'message' => 'Hello API'
]);

echo $_SERVER['REQUEST_METHOD'];

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    print "path: {$path}";
    print $path;
}


$packages = [
    [
        "id" => 1,
        "name" => "Newspaper Application",
    ],
        [
            "id" => 2,
            "name" => "symfony",
        ]
];

print json_encode($packages);
// or
echo json_encode($packages);*/