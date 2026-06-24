<?php

namespace App;
class Router {
    /*
     *
     * */

    /**
     * @throws RuntimeException
     */
    public function __CONSTRUCT(public PackageController $controller) {}

    public function handle(string $method, string $path,  ?Package $package = null) {
        switch (true) {
            case $method === 'GET' && $path === '/packages':
                echo json_encode($this->controller->listPackages());
                break;
            case $method === 'GET' && preg_match('#^/packages/(?<id>\d+)$#', $path, $matches):
                $id = $matches['id'];
                echo json_encode($this->controller->getPackage($id));
                break;
            case $method === 'POST' && $path === '/packages':
                $data = json_decode(file_get_contents('php://input'), true);
                $package = new Package(
                    null,
                    $data['name'],
                    $data['description'],
                    $data['programmingLanguage'],
                    $data['repositoryUrl'],
                    $data['license']
                );
                http_response_code(201);
                echo json_encode($this->controller->createPackage($package));
                break;
            case $method === 'PUT' && (preg_match('~^/packages/([^/]+)$~', $path, $matches)):
                $data = json_decode(file_get_contents('php://input'), true);
                $id = $matches[1];
                $package = new Package(
                    $id,
                    $data['name'],
                    $data['description'],
                    $data['programmingLanguage'],
                    $data['repositoryUrl'],
                    $data['license']
                );
                echo json_encode($this->controller->updatePackage($package));
                break;
            case $method === 'DELETE' && preg_match('~^/packages/([^/]+)$~', $path, $matches):
                $id = $matches[1];
                // later do not forget to http_response_code(204);
                echo json_encode($this->controller->deletePackage($id));
                break;
            default:
                http_response_code(404);
                echo json_encode(["error" => "Route not found"]);
        }
    }
}