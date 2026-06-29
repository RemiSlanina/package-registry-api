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
    /**
     * @throws RuntimeException
     */
    public function handle(string $method, string $path,  ?Package $package = null) {
        // later: should return a Response object
        switch (true) {
            case $method === 'GET' && $path === '/packages':
                echo json_encode($this->controller->listPackages());
                break;
            case $method === 'GET' && preg_match('#^/packages/(?<id>\d+)$#', $path, $matches):
                $id = $matches['id'];
                $package = $this->requirePackage($id);
                if ($package === null) {
                    return;
                }
                echo json_encode($package);
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
            case $method === 'PUT' && (preg_match('#^/packages/(?<id>\d+)$#', $path, $matches)):
                $data = json_decode(file_get_contents('php://input'), true);
                $id = (int)$matches['id'];
                if ($this->controller->getPackage($id) === null) {
                    http_response_code(404);
                    return;
                }
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
            case $method === 'DELETE' && preg_match('#^/packages/(?<id>\d+)$#', $path, $matches):
                $id = (int)$matches['id'];
                // later do not forget to http_response_code(204);
                //echo json_encode($this->controller->deletePackage($id));
                if ($this->controller->deletePackage($id) === null) {
                    http_response_code(204);
                    return;
                }
                http_response_code(404);
                break;
            default:
                http_response_code(404);
                echo json_encode(["error" => "Route not found"]);
        }
    }

//    *************** HELPER FUNCTIONS ***************
    private function requirePackage(int $id): ?Package {
        $package = $this->controller->getPackage($id);
        if ($package === null) {
            http_response_code(404);
        }
        return $package;
    }
}