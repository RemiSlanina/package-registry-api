<?php

// debug:
//ini_set('display_errors', 1);
//error_reporting(E_ALL);

require __DIR__ . '/../vendor/autoload.php';

use App\PackageController;
use App\PackageRepository;
use App\Package;

$pdo = new PDO('sqlite:' . __DIR__ . '/../data/packages.db');

$package = new Package(
    null,
    name:	"Composer",
    description:	"Dependency manager",
    programmingLanguage:	"PHP",
    repositoryUrl:	"https://github.com/composer/composer",
    license:	"MIT"
);
$package2 = new Package(
    null,
    name: "Symfony",
    description: "PHP framework",
    programmingLanguage:	"PHP",
    repositoryUrl:	"https://github.com/symfony/symfony",
    license: "MIT"
);
$package3 = new Package(
    null,
    name: "Test Package",
    description: "PHP Test",
    programmingLanguage:	"PHP",
    repositoryUrl:	"https://test.com",
    license: "MIT"
);
#$package_controller = new PackageController(new PackageRepository($pdo));
$repository = new PackageRepository($pdo);
try {
    $controller = new PackageController($repository);
    //$controller->deletePackage(3);
    //$controller->createPackage($package2);
    $allPackages = $controller->listPackages();
    $onePackage = $controller->getPackage(2);

    header('Content-Type: application/json');

    echo json_encode($allPackages);

} catch (RuntimeException $e) {
    http_response_code(500);
    echo json_encode([
        "error" => $e->getMessage()
    ]);
}
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